'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type CaseItem = {
  img: string;
  alt: string;
  tag: string;
  title: string;
  client: string;
};

export default function Cases() {
  const t = useTranslations('cases');
  const items = t.raw('items') as CaseItem[];

  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(3);

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
              <a href="#" className="btn-link">
                {t('allLink')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="cases-track-wrap">
          <div className="cases-track reveal" ref={trackRef}>
            {items.map((c, i) => (
              <article className="case-card" key={i}>
                <div className="case-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.alt} loading="lazy" />
                </div>
                <div className="case-overlay">
                  <div className="tag">{c.tag}</div>
                  <h3>{c.title}</h3>
                  <div className="client">{c.client}</div>
                </div>
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
    </section>
  );
}
