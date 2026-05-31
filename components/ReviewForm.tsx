'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ReviewForm() {
  const t = useTranslations('testimonials.form');
  // Reuse the exact same consent copy + privacy/cookies links as the contact form.
  const tc = useTranslations('contact.form');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!consent) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      role: String(fd.get('role') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      text: String(fd.get('text') || '').trim(),
      rating,
      consent: true,
      locale,
    };

    if (rating < 1 || rating > 5) {
      setErrorMsg(t('errors.rating'));
      setStatus('error');
      return;
    }
    if (payload.text.length < 5) {
      setErrorMsg(t('errors.text'));
      setStatus('error');
      (form.elements.namedItem('text') as HTMLElement | null)?.focus();
      return;
    }

    setErrorMsg(null);
    setStatus('sending');
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        const map: Record<string, string> = {
          missing_fields: t('errors.text'),
          invalid_rating: t('errors.rating'),
          invalid_email: t('errors.email'),
          consent_required: t('errors.consent'),
        };
        setErrorMsg((data?.error && map[data.error]) || t('error'));
        setStatus('error');
        return;
      }
      setStatus('ok');
      form.reset();
      setConsent(false);
      setRating(5);
      setHover(0);
    } catch {
      setErrorMsg(t('error'));
      setStatus('error');
    }
  };

  const shown = hover || rating;

  return (
    <form className="contact-form review-form reveal" onSubmit={onSubmit} noValidate id="review-form">
      <div className="form-title">{t('title')}</div>
      <div className="form-sub">{t('sub')}</div>

      <div className="review-rating-input">
        <span className="review-rating-label">{t('ratingLabel')}</span>
        <div className="review-stars-input" role="radiogroup" aria-label={t('ratingLabel')} onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`review-star-btn${n <= shown ? ' is-on' : ''}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(0)}
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} / 5`}
            >
              ★
            </button>
          ))}
          <span className="review-rating-value tabular">{shown}/5</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="r-name">{t('name')}</label>
        <input id="r-name" name="name" type="text" placeholder={t('namePh')} autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="r-role">
          {t('role')} <span className="field-hint">{t('roleOptional')}</span>
        </label>
        <input id="r-role" name="role" type="text" placeholder={t('rolePh')} />
      </div>

      <div className="field">
        <label htmlFor="r-text">
          {t('text')} <span className="req-mark" aria-hidden="true">*</span>
        </label>
        <textarea id="r-text" name="text" placeholder={t('textPh')} required />
      </div>

      <div className="field">
        <label htmlFor="r-email">
          {t('email')} <span className="field-hint">{t('emailOptional')}</span>
        </label>
        <input
          id="r-email"
          name="email"
          type="email"
          placeholder={t('emailPh')}
          autoComplete="email"
          inputMode="email"
        />
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
          {tc('consent.before')}{' '}
          <Link href="/polityka-prywatnosci" className="consent-link">
            {tc('consent.privacy')}
          </Link>
          {tc('consent.middle')}
          <Link href="/polityka-cookies" className="consent-link">
            {tc('consent.cookies')}
          </Link>
          {tc('consent.after')}
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
          {errorMsg ?? t('error')}
        </div>
      )}
    </form>
  );
}
