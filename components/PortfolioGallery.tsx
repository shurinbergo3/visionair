'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { BrandMarkSvg } from './BrandLogo';

export type PortfolioItem = {
  src: string;
  alt: string;
  loc: string;
  tag: string;
};

type Props = {
  items: PortfolioItem[];
};

// Portrait orientation slot indices (matches the file mapping in messages JSON)
const PORTRAIT_SLOTS = new Set([2, 3, 7, 9, 14, 15, 19, 21]);

// On mobile (≤640px) collapse the bento to this many items by default
const MOBILE_PREVIEW_COUNT = 8;

export default function PortfolioGallery({ items }: Props) {
  const t = useTranslations('portfolio.lightbox');
  const tp = useTranslations('portfolio');
  const labels = {
    close: t('close'),
    prev: t('prev'),
    next: t('next'),
    counter: (i: number, total: number) =>
      t('counter', { i: String(i).padStart(2, '0'), total: String(total).padStart(2, '0') }),
  };

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const isOpen = openIdx !== null;
  const total = items.length;
  const hiddenCount = Math.max(0, total - MOBILE_PREVIEW_COUNT);
  const showMoreBtn = hiddenCount > 0;
  const bentoRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  const toggleExpanded = () => {
    if (expanded) {
      // Collapsing — scroll back to the gallery top so the user keeps their place
      const top = bentoRef.current?.getBoundingClientRect().top ?? 0;
      const offset = window.scrollY + top - 80;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: offset, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
    setExpanded((v) => !v);
  };

  const open = useCallback((i: number) => setOpenIdx(i), []);
  const close = useCallback(() => setOpenIdx(null), []);
  const goPrev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + total) % total)),
    [total]
  );
  const goNext = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % total)),
    [total]
  );

  // Esc / arrow keys — only registers when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, goPrev, goNext]);

  // iOS-safe scroll lock + restore focus. Runs ONLY on open/close transitions,
  // not on internal navigation, so scroll position is preserved exactly.
  useEffect(() => {
    if (!isOpen) return;

    prevFocusRef.current = document.activeElement as HTMLElement | null;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    requestAnimationFrame(() => dialogRef.current?.focus({ preventScroll: true }));

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      html.style.overflow = prev.htmlOverflow;
      // Restore exact scroll position (no jump)
      window.scrollTo(0, scrollY);
      // Return focus to the card that opened the lightbox
      const el = prevFocusRef.current;
      if (el && typeof el.focus === 'function') {
        try { el.focus({ preventScroll: true }); } catch { el.focus(); }
      }
    };
  }, [isOpen]);

  // Swipe gesture for mobile (horizontal only — vertical reserved for closing)
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t0 = e.touches[0];
    touchStart.current = { x: t0.clientX, y: t0.clientY, t: Date.now() };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t1 = e.changedTouches[0];
    const dx = t1.clientX - start.x;
    const dy = t1.clientY - start.y;
    const dt = Date.now() - start.t;
    // Quick horizontal swipe → nav. Slow / mostly vertical → ignore.
    if (dt < 600 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  // Prevent background scrolling via touchmove on iOS even when scroll is locked
  const onBackdropTouchMove = (e: React.TouchEvent) => {
    // Only block when the touch is on the backdrop itself, not on caption / buttons
    if (e.target === e.currentTarget) e.preventDefault();
  };

  const current = openIdx !== null ? items[openIdx] : null;

  return (
    <>
      <div
        id="portfolio-bento"
        className={`bento${showMoreBtn && !expanded ? ' bento-collapsed' : ''}`}
        role="list"
        ref={bentoRef}
      >
        {items.map((p, i) => {
          const slot = i + 1;
          const orient = PORTRAIT_SLOTS.has(slot) ? 'portrait' : 'landscape';
          const hiddenOnMobile = !expanded && i >= MOBILE_PREVIEW_COUNT;
          // First-fold cards load eagerly. Hidden cards on mobile use lazy until
          // expanded — iOS Safari otherwise leaves `display:none` lazy images
          // unfetched even after the rule is lifted, which shows up as a dark
          // empty grid below "Показать ещё".
          const eager = i < MOBILE_PREVIEW_COUNT || expanded;
          // Items past the mobile preview count get a key that flips with
          // `expanded`, forcing React to mount a fresh <img> when the user
          // toggles the gallery. Without this, iOS Safari sometimes keeps
          // the original `loading="lazy"` decision even after we switch the
          // attribute, leaving the expanded cards blank.
          const key =
            i < MOBILE_PREVIEW_COUNT ? p.src : `${p.src}::${expanded ? 'open' : 'closed'}`;
          return (
            <button
              key={key}
              type="button"
              className={`b b-${slot}${hiddenOnMobile ? ' b-hidden-mobile' : ''}`}
              role="listitem"
              data-orient={orient}
              onClick={() => open(i)}
              aria-label={`${p.loc} — ${p.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="b-overlay" aria-hidden="true" />
              <div className="b-corner" aria-hidden="true">
                <span className="b-num">{String(slot).padStart(2, '0')}</span>
                <span className="b-zoom">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                  </svg>
                </span>
              </div>
              <div className="meta">
                <span className="meta-loc">{p.loc}</span>
                <span className="meta-tag">{p.tag}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showMoreBtn && (
        <div className="bento-more">
          <button
            type="button"
            className="bento-more-btn"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-controls="portfolio-bento"
          >
            <span className="bento-more-line" aria-hidden="true" />
            <span className="bento-more-label">
              {expanded ? tp('showLess') : tp('showMore', { count: hiddenCount })}
            </span>
            <svg
              className={`bento-more-icon${expanded ? ' is-expanded' : ''}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span className="bento-more-line" aria-hidden="true" />
          </button>
        </div>
      )}

      {current && openIdx !== null && (
        <div
          className="lbx"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          ref={dialogRef}
          tabIndex={-1}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onBackdropTouchMove}
        >
          <button
            type="button"
            className="lbx-close"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label={labels.close}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            className="lbx-nav lbx-prev"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label={labels.prev}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>

          <button
            type="button"
            className="lbx-nav lbx-next"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label={labels.next}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          <figure className="lbx-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="lbx-img"
            />
            <div className="lbx-watermark" aria-hidden="true">
              <BrandMarkSvg size={16} />
              <span>VISIONAIR</span>
            </div>
            <figcaption className="lbx-caption">
              <div className="lbx-meta-row">
                <span className="lbx-counter">{labels.counter(openIdx + 1, total)}</span>
                <span className="lbx-tag">{current.tag}</span>
              </div>
              <div className="lbx-loc">{current.loc}</div>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
