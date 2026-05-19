'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const ArrowRight = () => (
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
);

export default function IdeaForm() {
  const t = useTranslations('idea');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    <section className="idea-section" id="idea">
      <div className="container">
        <div className="idea-inner">
          <header className="idea-head reveal">
            <div className="idea-head-left">
              <div className="section-label idea-eyebrow">{t('sectionLabel')}</div>
              <h2 className="idea-title">
                {t('title')} <span className="serif-it">{t('titleItalic')}</span>
              </h2>
            </div>
            <p className="idea-lead">{t('lead')}</p>
          </header>

          <form className="idea-form reveal" onSubmit={onSubmit} noValidate>
            <div className="idea-row">
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

              <div className="field idea-field-msg">
                <label htmlFor="idea-msg">{t('idea')}</label>
                <input
                  id="idea-msg"
                  name="idea"
                  type="text"
                  placeholder={t('ideaPh')}
                  maxLength={500}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary idea-submit"
                disabled={status === 'sending'}
                aria-disabled={status === 'sending'}
              >
                {status === 'sending' ? t('submitting') : t('submit')}
                <ArrowRight />
              </button>
            </div>

            <div className="idea-foot">
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
                <div role="status" className="idea-status idea-status--ok">
                  {t('success')}
                </div>
              )}
              {status === 'error' && (
                <div role="alert" className="idea-status idea-status--error">
                  {errorMsg ?? t('error')}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
