import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BrandLogo from '@/components/BrandLogo';
import BlogCard from '@/components/BlogCard';
import MobileMenu from '@/components/MobileMenu';
import { getAllArticles, getArticleLocale } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/siteUrl';

const OG_LOCALE_MAP: Record<string, string> = {
  ru: 'ru_RU',
  pl: 'pl_PL',
  en: 'en_US',
  uk: 'uk_UA',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.meta' });
  const localePath = (l: string) => (l === routing.defaultLocale ? '/blog' : `/${l}/blog`);

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'VisionAir Warsaw' }],
    creator: 'VisionAir Warsaw',
    publisher: 'VisionAir Warsaw',
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      canonical: localePath(locale),
      languages: {
        ru: localePath('ru'),
        pl: localePath('pl'),
        en: localePath('en'),
        uk: localePath('uk'),
        'x-default': localePath(routing.defaultLocale),
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'VisionAir Warsaw',
      url: SITE_URL + localePath(locale),
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: OG_LOCALE_MAP[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE_MAP[l] ?? l),
      images: [
        {
          url: '/og.jpg',
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/og.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const meta = await getTranslations({ locale, namespace: 'blog.meta' });
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  const blogPath = locale === routing.defaultLocale ? '/blog' : `/${locale}/blog`;
  const homePath = locale === routing.defaultLocale ? '/' : `/${locale}/`;
  const blogUrl = SITE_URL + blogPath;
  const articleSlugPath = (slug: string) =>
    locale === routing.defaultLocale ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': blogUrl + '#blog',
    url: blogUrl,
    name: meta('title'),
    description: meta('description'),
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    blogPost: articles.map((article) => {
      const a = getArticleLocale(article, locale);
      return {
        '@type': 'BlogPosting',
        '@id': SITE_URL + articleSlugPath(article.slug) + '#article',
        headline: a.title,
        description: a.description,
        url: SITE_URL + articleSlugPath(article.slug),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: locale,
        author: { '@id': `${SITE_URL}/#organization` },
        image: article.cover ? SITE_URL + article.cover : `${SITE_URL}/og.jpg`,
      };
    }),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': blogUrl + '#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: SITE_URL + homePath },
      { '@type': 'ListItem', position: 2, name: t('nav.blog'), item: blogUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <header className="nav nav--solid">
        <div className="container nav-inner">
          <BrandLogo variant="header" tagline={t('nav.tagline')} />
          <nav>
            <ul className="nav-links">
              <li><Link href="/">{t('nav.home')}</Link></li>
              <li><Link href="/blog" aria-current="page">{t('nav.blog')}</Link></li>
              <li><Link href="/#contact">{t('nav.contact')}</Link></li>
            </ul>
          </nav>
          <div className="nav-actions">
            <div className="nav-actions-desktop">
              <Link href="/#contact" className="btn btn-primary">
                {t('nav.cta')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <MobileMenu
              items={[
                { label: t('nav.home'), href: '/', internal: true },
                { label: t('nav.blog'), href: '/blog', internal: true, current: true },
                { label: t('nav.contact'), href: '/#contact', internal: true },
              ]}
              cta={{ label: t('nav.cta'), href: '/#contact' }}
            />
          </div>
        </div>
      </header>

      <main className="blog-index">
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-eyebrow">
              <span className="dot" />
              <span>{t('index.eyebrow')}</span>
            </div>
            <h1 className="blog-hero-h1">
              {t('index.h1')}{' '}
              <span className="serif-it">{t('index.h1Italic')}</span>
            </h1>
            <p className="blog-hero-lead">{t('index.lead')}</p>
          </div>
        </section>

        <section className="blog-strip" aria-hidden="true">
          <div className="blog-strip-row">
            {[3, 11, 7, 18, 5, 21, 14, 9, 23, 1, 16, 12].map((n, i) => (
              <div className="blog-strip-item" key={`${n}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/portfolio/portfolio-${String(n).padStart(2, '0')}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </section>

        {articles.length === 0 ? (
          <section className="container blog-empty">
            <p>{t('index.empty')}</p>
          </section>
        ) : (
          <>
            {featured && (
              <section className="container blog-featured">
                <BlogCard article={featured} locale={locale} featured />
              </section>
            )}
            {rest.length > 0 && (
              <section className="container blog-grid">
                {rest.map((a) => (
                  <BlogCard key={a.slug} article={a} locale={locale} />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} VisionAir Warsaw</div>
          <div className="footer-links">
            <Link href="/">{t('nav.home')}</Link>
            <Link href="/polityka-prywatnosci">{t('footer.privacy')}</Link>
            <Link href="/polityka-cookies">{t('footer.cookies')}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
