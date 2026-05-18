import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BrandLogo from '@/components/BrandLogo';
import BlogArticle from '@/components/BlogArticle';
import BlogCard from '@/components/BlogCard';
import BlogCTA from '@/components/BlogCTA';
import ClientEffects from '@/components/ClientEffects';
import MobileMenu from '@/components/MobileMenu';
import { getAllArticles, getArticleBySlug, getArticleLocale } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/siteUrl';

const OG_LOCALE_MAP: Record<string, string> = {
  ru: 'ru_RU',
  pl: 'pl_PL',
  en: 'en_US',
  uk: 'uk_UA',
};

export function generateStaticParams() {
  const slugs = getAllArticles().map((a) => a.slug);
  return slugs.flatMap((slug) =>
    routing.locales.map((locale) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const a = getArticleLocale(article, locale);
  const localePath = (l: string) =>
    l === routing.defaultLocale ? `/blog/${slug}` : `/${l}/blog/${slug}`;

  const ogImage = article.cover ?? '/og.jpg';
  const ogTitle = a.ogTitle ?? a.title;
  const ogDescription = a.ogDescription ?? a.description;

  return {
    metadataBase: new URL(SITE_URL),
    title: a.title,
    description: a.description,
    keywords: a.keywords,
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
      type: 'article',
      siteName: 'VisionAir Warsaw',
      url: SITE_URL + localePath(locale),
      title: ogTitle,
      description: ogDescription,
      locale: OG_LOCALE_MAP[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE_MAP[l] ?? l),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const a = getArticleLocale(article, locale);
  const t = await getTranslations('blog');

  const related = getAllArticles()
    .filter((x) => x.slug !== slug && x.category === article.category)
    .slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: 'VisionAir Warsaw',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VisionAir Warsaw',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${locale === routing.defaultLocale ? '' : '/' + locale}/blog/${slug}`,
    },
    keywords: a.keywords,
  };

  const faqSchema = a.faqQ && a.faqQ.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faqQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: t('nav.blog'), item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: a.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <ClientEffects />

      <header className="nav nav--solid">
        <div className="container nav-inner">
          <BrandLogo variant="header" tagline={t('nav.tagline')} />
          <nav>
            <ul className="nav-links">
              <li><Link href="/">{t('nav.home')}</Link></li>
              <li><Link href="/blog">{t('nav.blog')}</Link></li>
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
                { label: t('nav.blog'), href: '/blog', internal: true },
                { label: t('nav.contact'), href: '#contact' },
              ]}
              cta={{ label: t('nav.cta'), href: '#contact' }}
            />
          </div>
        </div>
      </header>

      <main className="blog-article">
        <nav className="blog-breadcrumb container" aria-label="Breadcrumb">
          <Link href="/">{t('nav.home')}</Link>
          <span aria-hidden>/</span>
          <Link href="/blog">{t('nav.blog')}</Link>
          <span aria-hidden>/</span>
          <span className="blog-breadcrumb-current">{a.h1 || a.title}</span>
        </nav>

        <section className="blog-article-hero container">
          <div className="blog-article-eyebrow">{a.eyebrow}</div>
          <h1 className="blog-article-h1">{a.h1 || a.title}</h1>
          <p className="blog-article-lead">{a.lead}</p>
          <div className="blog-article-meta">
            <span>VisionAir Editorial</span>
            <span aria-hidden>•</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span aria-hidden>•</span>
            <span>{article.readingMinutes} min</span>
          </div>
        </section>

        <article className="blog-body container">
          <BlogArticle sections={a.sections} />

          {a.faqQ && a.faqQ.length > 0 && (
            <section className="blog-inline-faq">
              <h2 className="blog-h2">{t('article.faqTitle')}</h2>
              <dl className="blog-faq-list">
                {a.faqQ.map((f, i) => (
                  <div key={i} className="blog-faq-item">
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </article>

        <BlogCTA cta={a.cta} />

        {related.length > 0 && (
          <section className="container blog-related">
            <h2 className="blog-related-title">{t('article.relatedTitle')}</h2>
            <div className="blog-grid">
              {related.map((r) => (
                <BlogCard key={r.slug} article={r} locale={locale} />
              ))}
            </div>
          </section>
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
