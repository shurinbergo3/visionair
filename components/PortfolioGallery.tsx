'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export type PortfolioItem = {
  src: string;
  alt: string;
  loc: string;
  tag: string;
};

type Props = {
  items: PortfolioItem[];
};

export default function PortfolioGallery({ items }: Props) {
  const t = useTranslations('portfolio.lightbox');
  const labels = {
    close: t('close'),
    prev: t('prev'),
    next: t('next'),
    counter: (i: number, total: number) =>
      t('counter', { i: String(i).padStart(2, '0'), total: String(total).padStart(2, '0') }),
  };
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const total = items.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

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

  // Esc / arrow key navigation
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx, close, goPrev, goNext]);

  // Lock body scroll + restore focus
  useEffect(() => {
    if (openIdx === null) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the dialog for keyboard users
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocusRef.current?.focus?.();
    };
  }, [openIdx]);

  // Swipe gesture (mobile)
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const current = openIdx !== null ? items[openIdx] : null;

  return (
    <>
      <div className="bento reveal" role="list">
        {items.map((p, i) => (
          <button
            key={p.src}
            type="button"
            className={`b b-${i + 1}`}
            role="listitem"
            onClick={() => open(i)}
            aria-label={`${p.loc} — ${p.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
            <div className="b-overlay" aria-hidden="true" />
            <div className="b-corner" aria-hidden="true">
              <span className="b-num">{String(i + 1).padStart(2, '0')}</span>
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
              <span>{p.loc}</span>
              <span>{p.tag}</span>
            </div>
          </button>
        ))}
      </div>

      {current && openIdx !== null && (
        <div
          className="lbx"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          ref={dialogRef}
          tabIndex={-1}
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
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

          <figure className="lbx-frame" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="lbx-img"
            />
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
