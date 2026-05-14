'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const types = t.raw('types') as string[];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      type: String(fd.get('type') || ''),
      msg: String(fd.get('msg') || ''),
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
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form reveal" onSubmit={onSubmit}>
      <div className="form-title">{t('title')}</div>
      <div className="form-sub">{t('sub')}</div>

      <div className="field">
        <label htmlFor="f-name">{t('name')}</label>
        <input id="f-name" name="name" type="text" placeholder={t('namePh')} required />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-email">{t('email')}</label>
          <input id="f-email" name="email" type="email" placeholder={t('emailPh')} required />
        </div>
        <div className="field">
          <label htmlFor="f-phone">
            {t('phone')} <span style={{ textTransform: 'none', letterSpacing: 0 }}>{t('phoneOpt')}</span>
          </label>
          <input id="f-phone" name="phone" type="tel" placeholder={t('phonePh')} />
        </div>
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

      <button
        className="btn btn-primary submit-btn"
        type="submit"
        disabled={status === 'sending'}
      >
        {t('submit')}
        <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>

      {status === 'ok' && (
        <div role="status" style={{ marginTop: 16, color: 'var(--gold)' }}>
          {t('success')}
        </div>
      )}
      {status === 'error' && (
        <div role="alert" style={{ marginTop: 16, color: 'tomato' }}>
          {t('error')}
        </div>
      )}
    </form>
  );
}
