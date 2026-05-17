'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type CaseItem = {
  slug: string;
  poster: string;
  src: string;
  srcLow?: string;
  alt: string;
  tag: string;
  title: string;
  desc: string;
  duration: string;
};

const PlayIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

const AUTOPLAY_MS = 4500;

export default function Cases() {
  const t = useTranslations('cases');
  const items = t.raw('items') as CaseItem[];

  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(3);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(1);
      else if (w < 980) setVisible(2);
      else setVisible(3);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const max = Math.max(0, items.length - visible);
  const clamped = Math.min(idx, max);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    const cardW = card ? card.getBoundingClientRect().width : 0;
    const gap = 18;
    track.style.transform = `translateX(-${clamped * (cardW + gap)}px)`;
  }, [clamped, visible]);

  // Autoplay — wraps around, pauses on hover / when lightbox is open /
  // when user has reduced-motion preference / when tab is hidden.
  useEffect(() => {
    if (paused) return;
    if (openIndex !== null) return;
    if (max <= 0) return;
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIdx((i) => (i >= max ? 0 : i + 1));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, openIndex, max]);

  const openCase = useCallback((i: number) => {
    setOpenIndex(i);
  }, []);

  const closeCase = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setOpenIndex(null);
  }, []);

  // Lock scroll + ESC handler + autofocus while modal is open
  useEffect(() => {
    if (openIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCase();
    };
    window.addEventListener('keydown', onKey);

    // Focus close button for keyboard a11y
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    // Try to autoplay (may be blocked without user gesture, but click counts)
    const playTimer = window.setTimeout(() => {
      videoRef.current?.play().catch(() => {
        /* swallow — user can press play in controls */
      });
    }, 80);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
      window.clearTimeout(playTimer);
    };
  }, [openIndex, closeCase]);

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <section className="cases-section section-pad" id="cases">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>
              {t('sectionLabel')}
            </div>
            <h2 className="display-2">
              {t('title')}
              <br />
              <span className="serif-it">{t('titleItalic')}</span>
            </h2>
          </div>
          <div>
            <p className="lead">{t('lead')}</p>
            <div className="sec-meta">
              <a href="#contact" className="btn-link">
                {t('allLink')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="cases-track-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="cases-track reveal" ref={trackRef}>
            {items.map((c, i) => (
              <article className="case-card" key={c.slug}>
                <button
                  type="button"
                  className="case-trigger"
                  aria-label={`${t('playLabel')} — ${c.title}`}
                  onClick={() => openCase(i)}
                >
                  <span className="case-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.poster} alt={c.alt} loading="lazy" />
                    <span className="case-grad" aria-hidden="true" />
                    <span className="case-scan" aria-hidden="true" />
                  </span>

                  <span className="case-top">
                    <span className="case-tag">{c.tag}</span>
                    <span className="case-duration tabular">
                      <span className="rec-dot" aria-hidden="true" />
                      {c.duration}
                    </span>
                  </span>

                  <span className="case-play" aria-hidden="true">
                    <span className="cp-ring" />
                    <span className="cp-core">
                      <PlayIcon size={20} />
                    </span>
                  </span>

                  <span className="case-overlay">
                    <h3>{c.title}</h3>
                    <span className="desc">{c.desc}</span>
                    <span className="case-cta">
                      {t('playLabel')}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="cases-nav">
          <div className="section-label tabular">
            {String(Math.min(clamped + 1, items.length)).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
          <div className="arrows">
            <button
              className="case-arrow"
              aria-label={t('prev')}
              disabled={clamped <= 0}
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="case-arrow"
              aria-label={t('next')}
              disabled={clamped >= max}
              onClick={() => setIdx((i) => Math.min(max, i + 1))}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {active && (
        <div
          className="case-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={closeCase}
        >
          <div
            className="case-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="case-lightbox-head">
              <div>
                <div className="case-tag case-tag-lb">{active.tag}</div>
                <h3 className="case-lightbox-title">{active.title}</h3>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="case-close"
                aria-label={t('close')}
                onClick={closeCase}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </header>

            <div className="case-video-wrap">
              <video
                ref={videoRef}
                key={active.slug}
                className="case-video"
                poster={active.poster}
                controls
                playsInline
                preload="metadata"
              >
                {active.srcLow && (
                  <source src={active.srcLow} type="video/mp4" media="(max-width: 640px)" />
                )}
                <source src={active.src} type="video/mp4" />
              </video>
            </div>

            <p className="case-lightbox-desc">{active.desc}</p>
          </div>
        </div>
      )}
    </section>
  );
}
