import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getArticleSlugs } from '@/lib/blog';

const SITE_URL = 'https://visionair.site';

// Slugs without leading slash — order matters only for human-readability.
const SERVICE_SLUGS = [
  'real-estate',
  'promo',
  'wesela',
  'eventy',
  'fpv-teledyski',
  'budownictwo',
  'inspekcje-techniczne',
];

const LEGAL_SLUGS = [
  'polityka-prywatnosci',
  'polityka-cookies',
];

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

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}${localeRoot(locale)}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: locale === routing.defaultLocale ? 1 : 0.8,
      alternates: { languages: rootLangs },
    });

    for (const slug of SERVICE_SLUGS) {
      const slugLangs = buildLanguages((l) => localeSub(l, slug));
      entries.push({
        url: `${SITE_URL}${localeSub(locale, slug)}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: locale === routing.defaultLocale ? 0.9 : 0.7,
        alternates: { languages: slugLangs },
      });
    }

    for (const slug of LEGAL_SLUGS) {
      const slugLangs = buildLanguages((l) => localeSub(l, slug));
      entries.push({
        url: `${SITE_URL}${localeSub(locale, slug)}`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.2,
        alternates: { languages: slugLangs },
      });
    }

    const blogLangs = buildLanguages((l) => localeSub(l, 'blog'));
    entries.push({
      url: `${SITE_URL}${localeSub(locale, 'blog')}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: locale === routing.defaultLocale ? 0.8 : 0.6,
      alternates: { languages: blogLangs },
    });

    for (const articleSlug of getArticleSlugs()) {
      const path = `blog/${articleSlug}`;
      const langs = buildLanguages((l) => localeSub(l, path));
      entries.push({
        url: `${SITE_URL}${localeSub(locale, path)}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: locale === routing.defaultLocale ? 0.7 : 0.5,
        alternates: { languages: langs },
      });
    }
  }

  return entries;
}
