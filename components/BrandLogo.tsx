import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type Variant = 'header' | 'footer' | 'nav';

type Props = {
  tagline?: ReactNode;
  href?: string;
  ariaLabel?: string;
  variant?: Variant;
  className?: string;
};

export function BrandMarkSvg({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="6" cy="6" r="2.1" />
      <circle cx="26" cy="6" r="2.1" />
      <circle cx="6" cy="26" r="2.1" />
      <circle cx="26" cy="26" r="2.1" />

      <line x1="13.4" y1="13.4" x2="7.5" y2="7.5" />
      <line x1="18.6" y1="13.4" x2="24.5" y2="7.5" />
      <line x1="13.4" y1="18.6" x2="7.5" y2="24.5" />
      <line x1="18.6" y1="18.6" x2="24.5" y2="24.5" />

      <circle cx="16" cy="16" r="3.4" />
      <circle cx="16" cy="16" r="1.25" fill="currentColor" stroke="none" />

      <path d="M3.6 6.4 A2.4 2.4 0 0 1 5.6 3.6" opacity="0.55" />
      <path d="M28.4 25.6 A2.4 2.4 0 0 1 26.4 28.4" opacity="0.55" />
    </svg>
  );
}

export default function BrandLogo({
  tagline,
  href = '/',
  ariaLabel = 'VisionAir Warsaw',
  variant = 'header',
  className,
}: Props) {
  const rootClass = ['brand', variant ? `brand--${variant}` : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={rootClass} aria-label={ariaLabel}>
      <span className="brand-mark" aria-hidden="true">
        <BrandMarkSvg />
      </span>
      <span className="brand-text">
        <span className="brand-name">VISIONAIR</span>
        {tagline ? <span className="brand-tagline">{tagline}</span> : null}
      </span>
    </Link>
  );
}
