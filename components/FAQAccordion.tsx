'use client';

import { useState } from 'react';

export type FAQItem = { q: string; a: string };

type Props = {
  items: FAQItem[];
  idPrefix?: string;
};

export default function FAQAccordion({ items, idPrefix = 'faq' }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];

  const renderItem = (it: FAQItem, globalIndex: number) => {
    const isOpen = open === globalIndex;
    return (
      <li
        key={globalIndex}
        className={`re-faq-item ${isOpen ? 'is-open' : ''}`}
      >
        <button
          type="button"
          className="re-faq-q"
          aria-expanded={isOpen}
          aria-controls={`${idPrefix}-${globalIndex}`}
          onClick={() => setOpen(isOpen ? null : globalIndex)}
        >
          <span className="re-faq-num">
            {String(globalIndex + 1).padStart(2, '0')}
          </span>
          <span className="re-faq-text">{it.q}</span>
          <span className="re-faq-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <div
          id={`${idPrefix}-${globalIndex}`}
          className="re-faq-a"
          role="region"
        >
          <div className="re-faq-a-inner">
            <p>{it.a}</p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="re-faq-grid">
      {columns.map((col, colIdx) => (
        <ul className="re-faq-list" key={colIdx}>
          {col.map((it, i) =>
            renderItem(it, colIdx === 0 ? i : mid + i),
          )}
        </ul>
      ))}
    </div>
  );
}
