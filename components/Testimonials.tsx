'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Item = {
  quote: string;
  initials: string;
  name: string;
  role: string;
};

const VISIBLE_COUNT = 3;

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Item[];
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? items : items.slice(0, VISIBLE_COUNT);
  const hiddenCount = Math.max(0, items.length - VISIBLE_COUNT);
  const showButton = hiddenCount > 0;

  return (
    <section className="test-section section-pad" id="testimonials">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>{t('sectionLabel')}</div>
            <h2 className="display-2">
              {t('title')}
              <br />
              <span className="serif-it">{t('titleItalic')}</span>
            </h2>
          </div>
          <div>
            <p className="lead">{t('lead')}</p>
          </div>
        </div>

        <div className="test-summary reveal" aria-label={`${t('rating')} / ${t('ratingMax')}`}>
          <div className="test-summary-score">
            <span className="test-summary-num">{t('rating')}</span>
            <span className="test-summary-max">/ {t('ratingMax')}</span>
          </div>
          <div className="test-summary-stars" aria-hidden="true">★★★★★</div>
          <div className="test-summary-meta">{t('basedOn', { count: items.length })}</div>
        </div>

        <div className="test-grid">
          {visible.map((tm, i) => (
            // `.reveal` is only attached to the initially-rendered cards so the
            // IntersectionObserver in ClientEffects (which runs once at mount)
            // actually observes them. New cards added when the user expands
            // don't need an entry animation — they render fully opaque.
            <article className={`testimonial${i < VISIBLE_COUNT ? ' reveal' : ''}`} key={i}>
              <div className="stars">★★★★★</div>
              <div className="quote">{tm.quote}</div>
              <div className="author">
                <div className="avatar">{tm.initials}</div>
                <div className="meta">
                  <b>{tm.name}</b>
                  <span>{tm.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showButton && (
          <div className="test-more">
            <button
              type="button"
              className="test-more-btn"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              <span className="test-more-line" aria-hidden="true" />
              <span className="test-more-label">
                {expanded ? t('showLess') : t('showMore', { count: hiddenCount })}
              </span>
              <svg
                className={`test-more-icon${expanded ? ' is-expanded' : ''}`}
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
              <span className="test-more-line" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
