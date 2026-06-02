type Props = {
  /** Localized lead-in label, e.g. "Realizacja" / "Built by". */
  label: string;
  className?: string;
};

/**
 * "Developed by" footer signature using the real BuildByAlex wordmark
 * (build = light, by = muted, alex = orange, dot = orange). Colors are
 * fixed to stay on-brand; only the lead-in label reacts to hover.
 */
export default function SiteCredit({ label, className }: Props) {
  const rootClass = ['site-credit', className].filter(Boolean).join(' ');

  return (
    <a
      className={rootClass}
      href="https://buildbyalex.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: BuildByAlex — buildbyalex.com`}
    >
      <span className="site-credit-label">{label}</span>
      <span className="site-credit-logo" aria-hidden="true">
        <span className="bba-build">build</span>
        <span className="bba-by">by</span>
        <span className="bba-alex">alex</span>
        <span className="bba-dot">.</span>
      </span>
    </a>
  );
}
