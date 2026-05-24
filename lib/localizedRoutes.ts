// Per-locale URL slugs for service pages. The internal route (the key) stays
// Polish so the file-system routing under app/[locale]/<polish-slug>/page.tsx
// keeps working; the *public* URL is rewritten via next.config.ts rewrites().
//
// Default locale ('ru') is served from root with no /ru prefix.
// RU and UK get transliterated Latin slugs containing the target keyword so
// SERP results carry the keyword in the URL. PL/EN keep the Polish slug.
//
// NOTE: This file is imported from next.config.ts which runs before path
// aliases are resolved, so it must not import from '@/i18n/routing'.
// DEFAULT_LOCALE is duplicated here intentionally — keep in sync with
// i18n/routing.ts if it ever changes.
const DEFAULT_LOCALE = 'ru';

type LocaleMap = Partial<Record<string, string>>;

// Map: internal Polish slug → per-locale localized slug.
// If a locale is missing from the inner map, it falls back to the key.
export const SERVICE_SLUG_MAP: Record<string, LocaleMap> = {
  '/real-estate': {
    ru: '/aerosemka-nedvizhimosti-warszawa',
    uk: '/aerozyomka-nerukhomosti-warszawa',
  },
  '/promo': {
    ru: '/promo-rolik-dronom-warszawa',
    uk: '/promo-rolyk-dronom-warszawa',
  },
  '/wesela': {
    ru: '/svadebnaya-semka-dronom-warszawa',
    uk: '/vesilna-zyomka-dronom-warszawa',
  },
  '/eventy': {
    ru: '/semka-meropriyatiy-dronom-warszawa',
    uk: '/zyomka-zakhodiv-dronom-warszawa',
  },
  '/fpv-teledyski': {
    ru: '/fpv-dron-klip-warszawa',
    uk: '/fpv-dron-klip-warszawa',
  },
  '/budownictwo': {
    ru: '/monitoring-stroyki-dronom-warszawa',
    uk: '/monitoryng-budivnytstva-dronom-warszawa',
  },
  '/inspekcje-techniczne': {
    ru: '/inspekciya-dronom-warszawa',
    uk: '/inspektsiya-dronom-warszawa',
  },
};

// Resolve the public slug for a given internal path and locale, e.g.
//   resolveSlug('/wesela', 'ru') → '/svadebnaya-semka-dronom-warszawa'
//   resolveSlug('/wesela', 'pl') → '/wesela'
export function resolveSlug(internalPath: string, locale: string): string {
  return SERVICE_SLUG_MAP[internalPath]?.[locale] ?? internalPath;
}

// Build the full public URL path including locale prefix when applicable.
//   localizedPath('/wesela', 'ru') → '/svadebnaya-semka-dronom-warszawa'
//   localizedPath('/wesela', 'uk') → '/uk/vesilna-zyomka-dronom-warszawa'
//   localizedPath('/wesela', 'pl') → '/pl/wesela'
export function localizedPath(internalPath: string, locale: string): string {
  const slug = resolveSlug(internalPath, locale);
  return locale === DEFAULT_LOCALE ? slug : `/${locale}${slug}`;
}

// All internal paths that have localized variants. Useful for sitemap loops.
export const LOCALIZED_INTERNAL_PATHS = Object.keys(SERVICE_SLUG_MAP);
