import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllArticles } from '@/lib/blog';
import { SITE_URL } from '@/lib/siteUrl';

// Bump only when static pages actually change. A volatile lastmod (e.g.
// `new Date()`) makes Bing/Google distrust the sitemap and stalls processing.
const STATIC_LASTMOD = new Date('2026-05-23');

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
  // x-default points to Polish: target market is Poland (service area, business
  // registration, page slugs). Internal defaultLocale stays 'ru' so social
  // bots and Accept-Language-less crawlers get a stable RU served at '/'.
  languages['x-default'] = `${SITE_URL}${path('pl')}`;
  return languages;
};

// RU (default, served at '/') and UK both target Slavic diaspora in Warsaw —
// the two locales where we want crawl priority above PL/EN.
const PRIMARY_LOCALES = new Set(['ru', 'uk']);

const priorityFor = (locale: string, base: number, primaryBonus = 0.1): number =>
  PRIMARY_LOCALES.has(locale) ? base + primaryBonus : base;

export default function sitemap(): MetadataRoute.Sitemap {
  const rootLangs = buildLanguages(localeRoot);
  const articles = getAllArticles();
  const blogLastmod = articles.reduce<Date>((acc, a) => {
    const d = new Date(a.updatedAt || a.publishedAt);
    return d > acc ? d : acc;
  }, STATIC_LASTMOD);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}${localeRoot(locale)}`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: 'monthly',
      priority: priorityFor(locale, 0.9),
      alternates: { languages: rootLangs },
    });

    for (const slug of SERVICE_SLUGS) {
      const slugLangs = buildLanguages((l) => localeSub(l, slug));
      entries.push({
        url: `${SITE_URL}${localeSub(locale, slug)}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: 'monthly',
        priority: priorityFor(locale, 0.8),
        alternates: { languages: slugLangs },
      });
    }

    for (const slug of LEGAL_SLUGS) {
      const slugLangs = buildLanguages((l) => localeSub(l, slug));
      entries.push({
        url: `${SITE_URL}${localeSub(locale, slug)}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: 'yearly',
        priority: 0.2,
        alternates: { languages: slugLangs },
      });
    }

    const blogLangs = buildLanguages((l) => localeSub(l, 'blog'));
    entries.push({
      url: `${SITE_URL}${localeSub(locale, 'blog')}`,
      lastModified: blogLastmod,
      changeFrequency: 'weekly',
      priority: priorityFor(locale, 0.7),
      alternates: { languages: blogLangs },
    });

    for (const article of articles) {
      const path = `blog/${article.slug}`;
      const langs = buildLanguages((l) => localeSub(l, path));
      entries.push({
        url: `${SITE_URL}${localeSub(locale, path)}`,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: 'monthly',
        priority: priorityFor(locale, 0.6),
        alternates: { languages: langs },
      });
    }
  }

  return entries;
}
