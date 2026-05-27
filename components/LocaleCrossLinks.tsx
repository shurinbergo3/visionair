import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { localizedPath } from '@/lib/localizedRoutes';

// SEO-only crawl-discovery block: surfaces every other locale's home, top
// services and blog as real <a> tags right above the footer. Gives Googlebot
// direct entry points into the EN/UK/PL/RU sections from any page — without
// these, internal linking into non-current locales went through the JS-only
// LangSwitcher and a handful of footer items, which left most translated
// pages stuck in GSC as "Discovered, not indexed".

const HEADINGS: Record<string, string> = {
  ru: 'Русский',
  pl: 'Polski',
  en: 'English',
  uk: 'Українська',
};

// Top commercial services (internal Polish slug + matching services.items num
// in messages/*.json, used to pull the locale-specific title).
const TOP_SERVICES = [
  { internal: '/real-estate', num: '001' },
  { internal: '/promo', num: '002' },
  { internal: '/wesela', num: '003' },
] as const;

const blogPath = (locale: string) =>
  locale === routing.defaultLocale ? '/blog' : `/${locale}/blog`;

const localeRoot = (locale: string) =>
  locale === routing.defaultLocale ? '/' : `/${locale}`;

export default async function LocaleCrossLinks({ locale }: { locale: string }) {
  const others = routing.locales.filter((l) => l !== locale);

  const blocks = await Promise.all(
    others.map(async (l) => {
      const t = await getTranslations({ locale: l });
      const services = t.raw('services.items') as Array<{ num: string; title: string }>;
      const titleByNum = new Map(services.map((s) => [s.num, s.title]));

      return {
        locale: l,
        heading: HEADINGS[l] ?? l.toUpperCase(),
        homeHref: localeRoot(l),
        homeLabel: t('nav.tagline'),
        blogHref: blogPath(l),
        blogLabel: t('blogTeaser.latest.title'),
        services: TOP_SERVICES.map((s) => ({
          href: localizedPath(s.internal, l),
          label: titleByNum.get(s.num) ?? s.internal,
        })),
      };
    }),
  );

  return (
    <section className="locale-cross-links" aria-labelledby="locale-cross-links-h">
      <div className="container">
        <h2 id="locale-cross-links-h" className="locale-cross-links-h">
          VisionAir · 4 languages
        </h2>
        <div className="locale-cross-grid">
          {blocks.map((b) => (
            <div key={b.locale} className="locale-cross-col">
              <div className="locale-cross-col-h">
                <span className="locale-cross-flag">{b.locale.toUpperCase()}</span>
                <span>{b.heading}</span>
              </div>
              <ul>
                <li>
                  <a href={b.homeHref} hrefLang={b.locale}>
                    {b.homeLabel}
                  </a>
                </li>
                {b.services.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} hrefLang={b.locale}>
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={b.blogHref} hrefLang={b.locale}>
                    {b.blogLabel}
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
