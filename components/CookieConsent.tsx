'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'visionair_cookie_consent';

type Choice = 'accept' | 'reject';

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const id = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(id);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (c: Choice) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice: c, at: new Date().toISOString() })
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t('ariaLabel')}>
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <div className="cookie-banner-title">{t('title')}</div>
          <p className="cookie-banner-body">
            {t('body')}{' '}
            <Link href="/polityka-cookies" className="cookie-banner-link">
              {t('more')}
            </Link>
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="btn btn-ghost cookie-btn-ghost"
            onClick={() => choose('reject')}
          >
            {t('reject')}
          </button>
          <button
            type="button"
            className="btn btn-primary cookie-btn-primary"
            onClick={() => choose('accept')}
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
