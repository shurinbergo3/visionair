'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function IdeaForm() {
  const t = useTranslations('idea');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const bullets = (t.raw('bullets') as string[]) ?? [];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const idea = String(fd.get('idea') || '').trim();

    if (!phone) {
      setErrorMsg(t('errors.phone'));
      setStatus('error');
      (form.elements.namedItem('phone') as HTMLElement | null)?.focus();
      return;
    }

    setErrorMsg(null);
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: '',
          type: t('leadType'),
          msg: idea,
          locale,
          consent: true,
        }),
      });
      if (!res.ok) {
        setErrorMsg(t('error'));
        setStatus('error');
        return;
      }
      setStatus('ok');
      form.reset();
    } catch {
      setErrorMsg(t('error'));
      setStatus('error');
    }
  };

  return (
    <section className="idea-section section-pad" id="idea">
      <div className="container">
        <div className="idea-grid">
          <div className="idea-intro reveal">
            <div className="section-label idea-eyebrow">{t('sectionLabel')}</div>
            <h2 className="display-2 idea-title">
              {t('title')}
              <br />
              <span className="serif-it">{t('titleItalic')}</span>
            </h2>
            <p className="lead idea-lead">{t('lead')}</p>

            {bullets.length > 0 && (
              <ul className="idea-bullets" aria-label={t('bulletsLabel')}>
                {bullets.map((b) => (
                  <li key={b}>
                    <svg
                      className="idea-bullet-icon"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form className="idea-form reveal" onSubmit={onSubmit} noValidate>
            <div className="idea-form-head">
              <span className="idea-card-tag">{t('cardTag')}</span>
              <div className="idea-form-title">{t('formTitle')}</div>
              <div className="idea-form-sub">{t('formSub')}</div>
            </div>

            <div className="field">
              <label htmlFor="idea-name">{t('name')}</label>
              <input
                id="idea-name"
                name="name"
                type="text"
                placeholder={t('namePh')}
                autoComplete="name"
                maxLength={120}
              />
            </div>

            <div className="field">
              <label htmlFor="idea-phone">
                {t('phone')}
                <span className="req-mark" aria-hidden="true">*</span>
              </label>
              <input
                id="idea-phone"
                name="phone"
                type="tel"
                placeholder={t('phonePh')}
                autoComplete="tel"
                inputMode="tel"
                required
                aria-required="true"
                maxLength={40}
              />
            </div>

            <div className="field">
              <label htmlFor="idea-msg">{t('idea')}</label>
              <textarea
                id="idea-msg"
                name="idea"
                placeholder={t('ideaPh')}
                rows={4}
                maxLength={1000}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn idea-submit"
              disabled={status === 'sending'}
              aria-disabled={status === 'sending'}
            >
              {status === 'sending' ? t('submitting') : t('submit')}
              <svg
                className="arr"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>

            <p className="idea-consent">
              {t.rich('consent', {
                privacy: (chunks) => (
                  <Link href="/polityka-prywatnosci" className="idea-consent-link">
                    {chunks}
                  </Link>
                ),
              })}
            </p>

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
        </div>
      </div>
    </section>
  );
}
