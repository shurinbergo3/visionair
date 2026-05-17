'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ScrollTopButton() {
  const t = useTranslations('nav');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setVisible(window.scrollY > 600);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onClick = () => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-top${visible ? ' scroll-top-visible' : ''}`}
      onClick={onClick}
      aria-label={t('scrollTopAria')}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span className="scroll-top-ring scroll-top-ring-1" aria-hidden="true" />
      <span className="scroll-top-ring scroll-top-ring-2" aria-hidden="true" />
      <span className="scroll-top-tick" aria-hidden="true" />
      <span className="scroll-top-label" aria-hidden="true">TOP</span>
      <svg
        className="scroll-top-arrow"
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
        <polyline points="6 14 12 8 18 14" />
      </svg>
    </button>
  );
}
