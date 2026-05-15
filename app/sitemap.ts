import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://visionair.site';

const localeRoot = (locale: string) =>
  locale === routing.defaultLocale ? '/' : `/${locale}/`;

const localeSub = (locale: string, sub: string) =>
  locale === routing.defaultLocale ? `/${sub}` : `/${locale}/${sub}`;

const buildLanguages = (path: (l: string) => string) => {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}${path(l)}`;
  }
  languages['x-default'] = `${SITE_URL}${path(routing.defaultLocale)}`;
  return languages;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const rootLangs = buildLanguages(localeRoot);
  const realEstateLangs = buildLanguages((l) => localeSub(l, 'real-estate'));
  const promoLangs = buildLanguages((l) => localeSub(l, 'promo'));

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}${localeRoot(locale)}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: locale === routing.defaultLocale ? 1 : 0.8,
      alternates: { languages: rootLangs },
    });
    entries.push({
      url: `${SITE_URL}${localeSub(locale, 'real-estate')}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: locale === routing.defaultLocale ? 0.95 : 0.75,
      alternates: { languages: realEstateLangs },
    });
    entries.push({
      url: `${SITE_URL}${localeSub(locale, 'promo')}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: locale === routing.defaultLocale ? 0.95 : 0.75,
      alternates: { languages: promoLangs },
    });
  }

  return entries;
}
