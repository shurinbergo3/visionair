import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://visionair.site';

const localePath = (locale: string) =>
  locale === routing.defaultLocale ? '/' : `/${locale}/`;

const buildLanguages = () => {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}${localePath(l)}`;
  }
  languages['x-default'] = `${SITE_URL}${localePath(routing.defaultLocale)}`;
  return languages;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = buildLanguages();

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
