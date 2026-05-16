'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Suggestion = { label: string; href: string };

export default function NotFound() {
  const t = useTranslations('notFound');
  const suggestions = t.raw('suggestions') as Suggestion[];

  return (
    <main className="nf-page" role="main">
      {/* Top telemetry strip */}
      <div className="nf-strip nf-strip-top" aria-hidden="true">
        <div className="nf-strip-inner">
          <span className="nf-strip-group">
            <span className="nf-dot" />
            <span className="nf-strip-label">{t('statusTop')}</span>
          </span>
          <span className="nf-strip-sep">·</span>
          <span className="nf-strip-mid">{t('statusLocation')}</span>
          <span className="nf-strip-sep">·</span>
          <span className="nf-strip-err">{t('statusCode')}</span>
        </div>
      </div>

      {/* Background visuals */}
      <div className="nf-bg" aria-hidden="true">
        <div className="nf-grid" />
        <div className="nf-glow" />
        <div className="nf-scanline" />

        <svg className="nf-flightpath" viewBox="0 0 1400 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="nfPathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(201,169,97,0)" />
              <stop offset="30%" stopColor="rgba(201,169,97,0.55)" />
              <stop offset="80%" stopColor="rgba(201,169,97,0.35)" />
              <stop offset="100%" stopColor="rgba(201,169,97,0)" />
            </linearGradient>
          </defs>
          <path
            d="M 0 480 C 250 360, 420 280, 660 220 S 980 160, 1100 280"
            stroke="url(#nfPathGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            fill="none"
          />
          {/* break point — drone disappears */}
          <g transform="translate(1100 280)" className="nf-break">
            <circle r="22" fill="none" stroke="rgba(201,169,97,0.4)" strokeWidth="1" />
            <circle r="36" fill="none" stroke="rgba(201,169,97,0.18)" strokeWidth="1" />
            <line x1="-10" y1="-10" x2="10" y2="10" stroke="var(--gold)" strokeWidth="1.5" />
            <line x1="-10" y1="10" x2="10" y2="-10" stroke="var(--gold)" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Radar in corner */}
        <div className="nf-radar" aria-hidden="true">
          <div className="nf-radar-rings">
            <span className="nf-ring nf-ring-1" />
            <span className="nf-ring nf-ring-2" />
            <span className="nf-ring nf-ring-3" />
            <span className="nf-ring-cross-h" />
            <span className="nf-ring-cross-v" />
          </div>
          <div className="nf-radar-sweep" />
          <div className="nf-radar-label">
            <span>RADAR</span>
            <span>NO TARGET</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="nf-hero">
        <div className="container nf-hero-inner">
          <Link href="/" className="nf-brand" aria-label="VisionAir — home">
            <span className="nf-brand-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="5" cy="5" r="2" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <line x1="6.5" y1="6.5" x2="10.2" y2="10.2" />
                <line x1="17.5" y1="6.5" x2="13.8" y2="10.2" />
                <line x1="6.5" y1="17.5" x2="10.2" y2="13.8" />
                <line x1="17.5" y1="17.5" x2="13.8" y2="13.8" />
              </svg>
            </span>
            <span className="nf-brand-name">VISIONAIR</span>
          </Link>

          <div
            className="nf-code"
            role="img"
            aria-label={t('code')}
          >
            <span className="nf-d">4</span>
            <span className="nf-d nf-d-zero serif-it">0</span>
            <span className="nf-d">4</span>
          </div>

          <h1 className="display-2 nf-title">
            {t('title')} <span className="serif-it">{t('titleItalic')}</span>
          </h1>

          <p className="lead nf-lead">{t('lead')}</p>
          <p className="nf-subtle">{t('subtle')}</p>

          <div className="nf-cta-row">
            <Link href="/" className="btn btn-primary nf-cta-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t('ctaHome')}
            </Link>
            <a
              href="https://wa.me/48453474944"
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.05-.3-.15-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.15-.65.15-.15.3-.4.45-.6.15-.2.2-.3.3-.5.1-.2.05-.4-.025-.55-.075-.15-.7-1.7-1-2.3-.25-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.075-.8.4-.3.3-1.05 1-1.05 2.5s1.075 2.95 1.225 3.15c.15.2 2.1 3.2 5.075 4.5.7.3 1.25.5 1.7.6.7.2 1.35.2 1.85.1.55-.1 1.7-.7 1.95-1.4.25-.7.25-1.3.175-1.4-.075-.1-.275-.175-.575-.325M12 2C6.5 2 2 6.5 2 12c0 1.95.55 3.75 1.5 5.25L2 22l4.85-1.5c1.45.8 3.15 1.25 4.95 1.25 5.5 0 10-4.5 10-10S17.5 2 12 2" />
              </svg>
              {t('ctaWhatsapp')}
            </a>
          </div>

          <div className="nf-suggestions">
            <div className="nf-suggestions-label">
              <span className="nf-suggestions-tick" aria-hidden="true" />
              {t('suggestionsLabel')}
            </div>
            <ul className="nf-suggestions-list">
              {suggestions.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="nf-suggestion">
                    <span>{s.label}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom telemetry strip */}
      <div className="nf-strip nf-strip-bottom" aria-hidden="true">
        <div className="nf-strip-inner">
          <span className="nf-strip-mono">{t('telemetryLat')}</span>
          <span className="nf-strip-sep">·</span>
          <span className="nf-strip-mono">{t('telemetryLon')}</span>
          <span className="nf-strip-sep">·</span>
          <span className="nf-strip-mono">{t('telemetryAlt')}</span>
          <span className="nf-strip-sep">·</span>
          <span className="nf-strip-mono nf-strip-link">{t('telemetryLink')}</span>
        </div>
      </div>
    </main>
  );
}
