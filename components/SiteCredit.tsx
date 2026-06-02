type Props = {
  /** Localized lead-in label, e.g. "Realizacja" / "Built by". */
  label: string;
  /** Current site locale — used to deep-link the matching BuildByAlex locale. */
  locale: string;
  className?: string;
};

// BuildByAlex serves its own localized site. Map our locales to theirs
// (their Ukrainian path is /ua, not /uk) and fall back to English.
const BBA_LOCALE: Record<string, string> = { ru: 'ru', pl: 'pl', en: 'en', uk: 'ua' };

/**
 * "Developed by" footer signature using the official BuildByAlex wordmark
 * (build = light, by = dimmed, alex = accent, trailing accent dot). The link
 * opens BuildByAlex in the same language the visitor is browsing in.
 */
export default function SiteCredit({ label, locale, className }: Props) {
  const rootClass = ['site-credit', className].filter(Boolean).join(' ');
  const href = `https://buildbyalex.com/${BBA_LOCALE[locale] ?? 'en'}`;

  return (
    <a
      className={rootClass}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: buildbyalex`}
    >
      <span className="site-credit-label">{label}</span>
      <span className="site-credit-logo" aria-hidden="true">
        <span className="bba-build">build</span>
        <span className="bba-by">by</span>
        <span className="bba-alex">alex</span>
        <span className="bba-dot" />
      </span>
    </a>
  );
}
