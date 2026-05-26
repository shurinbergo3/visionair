import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllArticles } from '@/lib/blog';
import { localizedPath } from '@/lib/localizedRoutes';
import { SITE_URL } from '@/lib/siteUrl';

// Bump only when static pages actually change. A volatile lastmod (e.g.
// `new Date()`) makes Bing/Google distrust the sitemap and stalls processing.
const STATIC_LASTMOD = new Date('2026-05-23');

// Internal (Polish) slugs. The sitemap emits the *localized* URL per locale
// — see lib/localizedRoutes.ts. Public URLs are served via next.config.ts
// rewrites, which point each localized slug at its internal page file.
const SERVICE_INTERNAL_PATHS = [
  '/real-estate',
  '/promo',
  '/wesela',
  '/eventy',
  '/fpv-teledyski',
  '/budownictwo',
  '/inspekcje-techniczne',
];

const LEGAL_INTERNAL_PATHS = [
  '/polityka-prywatnosci',
  '/polityka-cookies',
];

// Non-default locale roots are served at `/<locale>` without a trailing
// slash; adding one causes a 308 redirect that Bing/Google flag as a
// sitemap issue. Default locale stays at '/' (the canonical homepage URL).
const localeRoot = (locale: string) =>
  locale === routing.defaultLocale ? '/' : `/${locale}`;

const buildLanguages = (path: (l: string) => string): Record<string, string> => {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}${path(l)}`;
  }
  // x-default points to Polish: target market is Poland (service area,
  // business registration). Internal defaultLocale stays 'ru' so social bots
  // and Accept-Language-less crawlers get a stable RU served at '/'.
  languages['x-default'] = `${SITE_URL}${path('pl')}`;
  return languages;
};

// RU (default, served at '/') and UK both target Slavic diaspora in Warsaw —
// the two locales where we want crawl priority above PL/EN.
const PRIMARY_LOCALES = new Set(['ru', 'uk']);

const priorityFor = (locale: string, base: number, primaryBonus = 0.1): number =>
  PRIMARY_LOCALES.has(locale) ? base + primaryBonus : base;

const blogPath = (locale: string, slug: string) =>
  locale === routing.defaultLocale ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

const blogIndexPath = (locale: string) =>
  locale === routing.defaultLocale ? '/blog' : `/${locale}/blog`;

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

    for (const internal of SERVICE_INTERNAL_PATHS) {
      const slugLangs = buildLanguages((l) => localizedPath(internal, l));
      entries.push({
        url: `${SITE_URL}${localizedPath(internal, locale)}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: 'monthly',
        priority: priorityFor(locale, 0.8),
        alternates: { languages: slugLangs },
      });
    }

    for (const internal of LEGAL_INTERNAL_PATHS) {
      const slugLangs = buildLanguages((l) => localizedPath(internal, l));
      entries.push({
        url: `${SITE_URL}${localizedPath(internal, locale)}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: 'yearly',
        priority: 0.2,
        alternates: { languages: slugLangs },
      });
    }

    const blogLangs = buildLanguages(blogIndexPath);
    entries.push({
      url: `${SITE_URL}${blogIndexPath(locale)}`,
      lastModified: blogLastmod,
      changeFrequency: 'weekly',
      priority: priorityFor(locale, 0.7),
      alternates: { languages: blogLangs },
    });

    for (const article of articles) {
      const langs = buildLanguages((l) => blogPath(l, article.slug));
      entries.push({
        url: `${SITE_URL}${blogPath(locale, article.slug)}`,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: 'monthly',
        priority: priorityFor(locale, 0.6),
        alternates: { languages: langs },
      });
    }
  }

  return entries;
}
