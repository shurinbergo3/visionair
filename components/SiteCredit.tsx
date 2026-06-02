type Props = {
  /** Localized lead-in label, e.g. "Built by" / "Разработка". */
  label: string;
  className?: string;
};

/**
 * Vector mark for BuildByAlex — two code brackets framing an upward peak.
 * Reads as `< ^ >`: build/code on the sides, an "A" apex (Alex) rising in the
 * middle. Line-based and monochrome (currentColor) to sit beside VisionAir's
 * own rotor mark without competing with it.
 */
function BuildByAlexMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path className="bba-bracket bba-bracket--l" d="M13 9.5 7 16l6 6.5" />
      <path className="bba-peak" d="M12.4 18.6 16 13.4l3.6 5.2" />
      <path className="bba-bracket bba-bracket--r" d="M19 9.5 25 16l-6 6.5" />
    </svg>
  );
}

export default function SiteCredit({ label, className }: Props) {
  const rootClass = ['site-credit', className].filter(Boolean).join(' ');

  return (
    <a
      className={rootClass}
      href="https://buildbyalex.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} BuildByAlex — buildbyalex.com`}
    >
      <span className="site-credit-label">{label}</span>
      <span className="site-credit-brand">
        <span className="site-credit-mark" aria-hidden="true">
          <BuildByAlexMark />
        </span>
        <span className="site-credit-name">
          BuildByAlex<span className="site-credit-tld">.com</span>
        </span>
      </span>
    </a>
  );
}
