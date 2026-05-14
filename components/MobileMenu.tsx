'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import LangSwitcher from './LangSwitcher';

export default function MobileMenu() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={`nav-toggle ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="mobile-drawer"
        className={`mobile-drawer ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="mobile-drawer-scrim" onClick={close} />
        <div className="mobile-drawer-panel">
          <nav>
            <ul className="mobile-nav-links">
              <li><a href="#services" onClick={close}>{t('links.services')}</a></li>
              <li><a href="#portfolio" onClick={close}>{t('links.portfolio')}</a></li>
              <li><a href="#cases" onClick={close}>{t('links.cases')}</a></li>
              <li><a href="#trust" onClick={close}>{t('links.trust')}</a></li>
              <li><a href="#about" onClick={close}>{t('links.about')}</a></li>
              <li><a href="#contact" onClick={close}>{t('links.contact')}</a></li>
            </ul>
          </nav>

          <div className="mobile-drawer-actions">
            <LangSwitcher />
            <a href="#contact" className="btn btn-primary" onClick={close}>
              {t('cta')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
