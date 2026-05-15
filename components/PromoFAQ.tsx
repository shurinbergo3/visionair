'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Q = { q: string; a: string };

export default function PromoFAQ() {
  const t = useTranslations('promo.faq');
  const items = t.raw('items') as Q[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="re-faq-list">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li
            key={i}
            className={`re-faq-item ${isOpen ? 'is-open' : ''}`}
          >
            <button
              type="button"
              className="re-faq-q"
              aria-expanded={isOpen}
              aria-controls={`promo-faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="re-faq-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="re-faq-text">{it.q}</span>
              <span className="re-faq-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
            <div
              id={`promo-faq-${i}`}
              className="re-faq-a"
              role="region"
              hidden={!isOpen}
            >
              <p>{it.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
