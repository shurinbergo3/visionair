'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type PackageKey = 'real' | 'wedding' | 'commercial' | 'film' | 'construction' | 'hotel' | 'events';

type PkgItem = {
  name: string;
  tagline: string;
  price: string;
  sub: string;
  list: string[];
  featured: boolean;
};

const KEYS: PackageKey[] = ['real', 'wedding', 'commercial', 'film', 'construction', 'hotel', 'events'];

export default function Packages() {
  const t = useTranslations('packages');
  const [active, setActive] = useState<PackageKey>('real');

  const tabs = t.raw('tabs') as Record<PackageKey, string>;
  const categoryNames = t.raw('categoryNames') as Record<PackageKey, string>;
  const groups = t.raw('groups') as Record<PackageKey, PkgItem[]>;
  const items = groups[active];
  const categoryTitle = categoryNames[active];

  return (
    <section className="pkg-section section-pad" id="pricing">
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
          </div>
        </div>

        <div className="pkg-tabs" role="tablist">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              className={k === active ? 'active' : ''}
              onClick={() => setActive(k)}
            >
              {tabs[k]}
            </button>
          ))}
        </div>

        <div className="pkg-grid">
          {items.map((p, i) => (
            <div key={i} className={`pkg ${p.featured ? 'featured' : ''}`}>
              <div className="p-name">{p.name}</div>
              <div className="p-title">{categoryTitle}</div>
              <div className="p-tagline">{p.tagline}</div>
              <div className="p-price tabular">
                {p.price}
                <small>{p.sub}</small>
              </div>
              <ul>
                {p.list.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {t('selectCta')}
                <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
