'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LangSwitcher from './LangSwitcher';

export type MobileMenuItem = {
  label: string;
  href: string;
  /** Use next-intl Link (locale-aware) instead of plain <a> */
  internal?: boolean;
  /** Mark as current page */
  current?: boolean;
};

type Props = {
  items?: MobileMenuItem[];
  cta?: { label: string; href: string };
  /** Show LangSwitcher in actions area (default true) */
  showLangSwitcher?: boolean;
};

export default function MobileMenu({ items, cta, showLangSwitcher = true }: Props) {
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

  const defaultItems: MobileMenuItem[] = [
    { label: t('links.services'), href: '#services' },
    { label: t('links.portfolio'), href: '#portfolio' },
    { label: t('links.cases'), href: '#cases' },
    { label: t('links.trust'), href: '#trust' },
    { label: t('links.about'), href: '#about' },
    { label: t('links.blog'), href: '/blog', internal: true },
    { label: t('links.contact'), href: '#contact' },
  ];

  const resolvedItems = items ?? defaultItems;
  const resolvedCta = cta ?? { label: t('cta'), href: '#contact' };

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
              {resolvedItems.map((it) => (
                <li key={`${it.href}-${it.label}`}>
                  {it.internal ? (
                    <Link
                      href={it.href}
                      onClick={close}
                      aria-current={it.current ? 'page' : undefined}
                    >
                      {it.label}
                    </Link>
                  ) : (
                    <a
                      href={it.href}
                      onClick={close}
                      aria-current={it.current ? 'page' : undefined}
                    >
                      {it.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-actions">
            {showLangSwitcher && <LangSwitcher />}
            {resolvedCta.href.startsWith('/') ? (
              <Link href={resolvedCta.href} className="btn btn-primary" onClick={close}>
                {resolvedCta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <a href={resolvedCta.href} className="btn btn-primary" onClick={close}>
                {resolvedCta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
