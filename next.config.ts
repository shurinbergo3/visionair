import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { SERVICE_SLUG_MAP } from './lib/localizedRoutes';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const ONE_YEAR = 60 * 60 * 24 * 365;
const LONG_CACHE = `public, max-age=${ONE_YEAR}, immutable`;

// RU is the default locale and is served at root with no prefix. Other locales
// (uk, pl, en) sit under /<locale>/ — see i18n/routing.ts.
const DEFAULT_LOCALE = 'ru';
const PREFIXED_LOCALES = ['uk', 'pl', 'en'] as const;

// Build the rewrite list: every localized public slug must resolve to its
// internal Polish file-system route so the existing app/[locale]/<polish>
// pages keep rendering.
function buildRewrites() {
  const rules: Array<{ source: string; destination: string }> = [];

  for (const [internal, localeMap] of Object.entries(SERVICE_SLUG_MAP)) {
    // RU (default, root) — localized slug at root → /ru/<polish>
    const ruSlug = localeMap[DEFAULT_LOCALE];
    if (ruSlug && ruSlug !== internal) {
      rules.push({ source: ruSlug, destination: `/${DEFAULT_LOCALE}${internal}` });
    }

    // Prefixed locales — /<locale>/<localized> → /<locale>/<polish>
    for (const locale of PREFIXED_LOCALES) {
      const slug = localeMap[locale];
      if (slug && slug !== internal) {
        rules.push({
          source: `/${locale}${slug}`,
          destination: `/${locale}${internal}`,
        });
      }
    }
  }

  return rules;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/portfolio/:path*',
        headers: [{ key: 'Cache-Control', value: LONG_CACHE }],
      },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: LONG_CACHE }],
      },
      {
        source: '/video/:path*',
        headers: [{ key: 'Cache-Control', value: LONG_CACHE }],
      },
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: LONG_CACHE }],
      },
    ];
  },
  async rewrites() {
    return buildRewrites();
  },
};

export default withNextIntl(nextConfig);
