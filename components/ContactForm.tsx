'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [consent, setConsent] = useState(false);
  const types = t.raw('types') as string[];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!consent) return;
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      type: String(fd.get('type') || ''),
      msg: String(fd.get('msg') || ''),
      consent: true,
      locale,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('ok');
      (e.target as HTMLFormElement).reset();
      setConsent(false);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
      <div className="form-title">{t('title')}</div>
      <div className="form-sub">{t('sub')}</div>

      <div className="field">
        <label htmlFor="f-name">{t('name')}</label>
        <input id="f-name" name="name" type="text" placeholder={t('namePh')} autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor="f-phone">
          {t('phone')} <span className="req-mark" aria-hidden="true">*</span>
        </label>
        <input
          id="f-phone"
          name="phone"
          type="tel"
          placeholder={t('phonePh')}
          autoComplete="tel"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="f-email">
          {t('email')} <span className="field-hint">{t('emailOptional')}</span>
        </label>
        <input
          id="f-email"
          name="email"
          type="email"
          placeholder={t('emailPh')}
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div className="field">
        <label htmlFor="f-type">{t('type')}</label>
        <select id="f-type" name="type" required defaultValue="">
          <option value="" disabled>
            {t('typePh')}
          </option>
          {types.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-msg">{t('msg')}</label>
        <textarea id="f-msg" name="msg" placeholder={t('msgPh')} />
      </div>

      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          aria-required="true"
        />
        <span className="consent-box" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="consent-text">
          {t('consent.before')}{' '}
          <Link href="/polityka-prywatnosci" className="consent-link">
            {t('consent.privacy')}
          </Link>
          {t('consent.middle')}
          <Link href="/polityka-cookies" className="consent-link">
            {t('consent.cookies')}
          </Link>
          {t('consent.after')}
        </span>
      </label>

      <button
        className="btn btn-primary submit-btn"
        type="submit"
        disabled={status === 'sending' || !consent}
        aria-disabled={status === 'sending' || !consent}
      >
        {t('submit')}
        <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>

      {status === 'ok' && (
        <div role="status" className="form-status form-status--ok">
          {t('success')}
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="form-status form-status--error">
          {t('error')}
        </div>
      )}
    </form>
  );
}
