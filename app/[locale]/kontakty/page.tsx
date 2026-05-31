import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import ClientEffects from '@/components/ClientEffects';
import LangSwitcher from '@/components/LangSwitcher';
import ContactForm from '@/components/ContactForm';
import MobileMenu from '@/components/MobileMenu';
import BrandLogo from '@/components/BrandLogo';
import ServicesDropdown from '@/components/ServicesDropdown';
import { getServicePath } from '@/lib/serviceRoutes';
import { localizedPath } from '@/lib/localizedRoutes';
import { SITE_URL } from '@/lib/siteUrl';

const PAGE_PATH = '/kontakty';
const HERO_IMAGE = '/assets/fleet-bg-skyline.webp';

const OG_LOCALE_MAP: Record<string, string> = {
  ru: 'ru_RU',
  pl: 'pl_PL',
  en: 'en_US',
  uk: 'uk_UA',
};

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg className="arr" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const localePath = (l: string) => localizedPath(PAGE_PATH, l);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contacts.meta' });

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
        'x-default': localePath('pl'),
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
          url: HERO_IMAGE,
          width: 1600,
          height: 900,
          alt: t('ogImageAlt'),
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [HERO_IMAGE],
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

type ServiceItem = { num: string; title: string };
type Guarantee = { k: string; v: string };

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const c = await getTranslations('contacts');

  const services = t.raw('services.items') as ServiceItem[];
  const guarantees = c.raw('guarantees') as Guarantee[];
  const pageUrl = SITE_URL + localePath(locale);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: c('breadcrumbs.home'),
        item: SITE_URL + (locale === routing.defaultLocale ? '/' : `/${locale}/`),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: c('breadcrumbs.current'),
        item: pageUrl,
      },
    ],
  };

  const contactPageLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': pageUrl + '#contactpage',
    url: pageUrl,
    name: c('meta.title'),
    description: c('meta.description'),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: SITE_URL + HERO_IMAGE,
  };

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={HERO_IMAGE}
        type="image/webp"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }}
      />

      <ClientEffects />

      {/* NAV */}
      <header className="nav" id="nav">
        <div className="container nav-inner">
          <BrandLogo variant="header" tagline={t('nav.tagline')} />

          <nav>
            <ul className="nav-links">
              <ServicesDropdown />
              <li><Link href="/#portfolio">{t('nav.links.portfolio')}</Link></li>
              <li><Link href="/#about">{t('nav.links.about')}</Link></li>
              <li><Link href="/blog">{t('nav.links.blog')}</Link></li>
              <li><Link href="/kontakty" aria-current="page">{t('nav.links.contact')}</Link></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <div className="nav-actions-desktop">
              <LangSwitcher />
              <a href="#contact" className="btn btn-primary">
                {t('nav.cta')}
                <ArrowRight />
              </a>
            </div>
            <MobileMenu
              items={[
                { label: t('nav.links.portfolio'), href: '/#portfolio', internal: true },
                { label: t('nav.links.about'), href: '/#about', internal: true },
                { label: t('nav.links.blog'), href: '/blog', internal: true },
                { label: t('nav.links.contact'), href: '/kontakty', internal: true, current: true },
              ]}
              cta={{ label: t('nav.cta'), href: '#contact' }}
            />
          </div>
        </div>
      </header>

      {/* HERO — darkened aerial frame from the archive */}
      <section className="kontakt-hero" id="kontakt-hero">
        <div className="kontakt-hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGE} alt="" decoding="async" />
        </div>

        <div className="hero-frame">
          <span className="br" />
          <span className="bl" />
        </div>

        <div className="container kontakt-hero-content">
          <nav className="re-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" locale={locale}>{c('breadcrumbs.home')}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c('breadcrumbs.current')}</span>
          </nav>

          <div className="hero-eyebrow">
            <span className="dot" />
            <span>{c('hero.eyebrow')}</span>
          </div>

          <h1 className="kontakt-h1">
            {c('hero.h1')}
            <br />
            <span className="serif-it">{c('hero.h1Italic')}</span>
          </h1>

          <p className="kontakt-hero-lead">{c('hero.lead')}</p>

          <div className="kontakt-coords" aria-hidden="true">
            <div><span className="l">LAT</span> {c('coords.lat')}</div>
            <div><span className="l">LON</span> {c('coords.lon')}</div>
            <div><span className="l">LOC</span> {c('coords.place')}</div>
          </div>
        </div>
      </section>

      {/* CONTACT — channels + studio + form */}
      <section className="kontakt-section section-pad" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="kontakt-info reveal">
              <div className="section-label" style={{ marginBottom: 22 }}>{c('channelsLabel')}</div>

              <div className="kontakt-channels">
                <a
                  className="kontakt-channel"
                  href="https://wa.me/48453474944"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="kontakt-channel-ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.05-.3-.15-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.15-.65.15-.15.3-.4.45-.6.15-.2.2-.3.3-.5.1-.2.05-.4-.025-.55-.075-.15-.7-1.7-1-2.3-.25-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.075-.8.4-.3.3-1.05 1-1.05 2.5s1.075 2.95 1.225 3.15c.15.2 2.1 3.2 5.075 4.5.7.3 1.25.5 1.7.6.7.2 1.35.2 1.85.1.55-.1 1.7-.7 1.95-1.4.25-.7.25-1.3.175-1.4-.075-.1-.275-.175-.575-.325M12 2C6.5 2 2 6.5 2 12c0 1.95.55 3.75 1.5 5.25L2 22l4.85-1.5c1.45.8 3.15 1.25 4.95 1.25 5.5 0 10-4.5 10-10S17.5 2 12 2" />
                    </svg>
                  </span>
                  <span className="kontakt-channel-body">
                    <span className="k">{c('channels.whatsappLabel')}</span>
                    <span className="v">{c('channels.whatsappValue')}</span>
                    <span className="hint">{c('channels.whatsappHint')}</span>
                  </span>
                  <span className="kontakt-channel-arr" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </a>

                <a
                  className="kontakt-channel"
                  href="https://t.me/sumotry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="kontakt-channel-ic">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M21.94 4.39 18.5 19.99c-.26 1.15-.94 1.43-1.91.89l-5.27-3.88-2.54 2.45c-.28.28-.52.52-1.06.52l.38-5.36 9.74-8.8c.42-.38-.09-.59-.66-.21L5.16 12.83.93 11.51c-.92-.29-.94-.92.19-1.37L20.77 3.1c.77-.29 1.44.18 1.17 1.29z" />
                    </svg>
                  </span>
                  <span className="kontakt-channel-body">
                    <span className="k">{c('channels.telegramLabel')}</span>
                    <span className="v">{c('channels.telegramValue')}</span>
                    <span className="hint">{c('channels.telegramHint')}</span>
                  </span>
                  <span className="kontakt-channel-arr" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </a>

                <a className="kontakt-channel" href="tel:+48453474944">
                  <span className="kontakt-channel-ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className="kontakt-channel-body">
                    <span className="k">{c('channels.phoneLabel')}</span>
                    <span className="v tabular">{c('channels.phoneValue')}</span>
                    <span className="hint">{c('channels.phoneHint')}</span>
                  </span>
                  <span className="kontakt-channel-arr" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </a>

                <a className="kontakt-channel" href="mailto:shurinbergo@gmail.com">
                  <span className="kontakt-channel-ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span className="kontakt-channel-body">
                    <span className="k">{c('channels.emailLabel')}</span>
                    <span className="v">{c('channels.emailValue')}</span>
                    <span className="hint">{c('channels.emailHint')}</span>
                  </span>
                  <span className="kontakt-channel-arr" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </a>
              </div>

              <div className="kontakt-studio">
                <div className="section-label">{c('studio.label')}</div>
                <ul className="kontakt-studio-list">
                  <li>
                    <span className="k">{c('studio.placeLabel')}</span>
                    <span className="v">{c('studio.placeValue')}</span>
                  </li>
                  <li>
                    <span className="k">{c('studio.areaLabel')}</span>
                    <span className="v">{c('studio.areaValue')}</span>
                  </li>
                  <li>
                    <span className="k">{c('studio.hoursLabel')}</span>
                    <span className="v">{c('studio.hoursValue')}</span>
                  </li>
                  <li>
                    <span className="k">{c('studio.responseLabel')}</span>
                    <span className="v">{c('studio.responseValue')}</span>
                  </li>
                  <li>
                    <span className="k">{c('studio.languagesLabel')}</span>
                    <span className="v">{c('studio.languagesValue')}</span>
                  </li>
                </ul>
              </div>

              <div className="kontakt-guarantees" aria-label={c('guaranteesLabel')}>
                {guarantees.map((g, i) => (
                  <div className="kontakt-guarantee" key={i}>
                    <div className="v tabular">{g.v}</div>
                    <div className="k">{g.k}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="kontakt-form-col reveal">
              <p className="kontakt-form-aside">{c('formAside')}</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="foot-grid">
            <div className="foot-brand">
              <BrandLogo variant="footer" tagline={t('nav.tagline')} />
              <p>{t('footer.tagline')}</p>
              <div className="brand-contacts">
                <a href="https://wa.me/48453474944" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.05-.3-.15-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.15-.65.15-.15.3-.4.45-.6.15-.2.2-.3.3-.5.1-.2.05-.4-.025-.55-.075-.15-.7-1.7-1-2.3-.25-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.075-.8.4-.3.3-1.05 1-1.05 2.5s1.075 2.95 1.225 3.15c.15.2 2.1 3.2 5.075 4.5.7.3 1.25.5 1.7.6.7.2 1.35.2 1.85.1.55-.1 1.7-.7 1.95-1.4.25-.7.25-1.3.175-1.4-.075-.1-.275-.175-.575-.325M12 2C6.5 2 2 6.5 2 12c0 1.95.55 3.75 1.5 5.25L2 22l4.85-1.5c1.45.8 3.15 1.25 4.95 1.25 5.5 0 10-4.5 10-10S17.5 2 12 2" />
                  </svg>
                </a>
                <a href="https://t.me/sumotry" aria-label="Telegram @sumotry" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M21.94 4.39 18.5 19.99c-.26 1.15-.94 1.43-1.91.89l-5.27-3.88-2.54 2.45c-.28.28-.52.52-1.06.52l.38-5.36 9.74-8.8c.42-.38-.09-.59-.66-.21L5.16 12.83.93 11.51c-.92-.29-.94-.92.19-1.37L20.77 3.1c.77-.29 1.44.18 1.17 1.29z" />
                  </svg>
                </a>
                <a href="mailto:shurinbergo@gmail.com" aria-label="Email shurinbergo@gmail.com">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </a>
                <a href="tel:+48453474944" aria-label="Call +48 453 474 944">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="foot-col">
              <h5>{t('footer.servicesTitle')}</h5>
              <ul>
                {services.map((s) => {
                  const href = getServicePath(s.num);
                  return (
                    <li key={s.num}>
                      {href ? (
                        <Link href={href} locale={locale}>{s.title}</Link>
                      ) : (
                        <Link href="/" locale={locale}>{s.title}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="foot-col">
              <h5>{t('footer.studioTitle')}</h5>
              <ul>
                <li><Link href="/#about" locale={locale}>{t('footer.studioLinks.about')}</Link></li>
                <li><Link href="/#trust" locale={locale}>{t('footer.studioLinks.trust')}</Link></li>
                <li><Link href="/#portfolio" locale={locale}>{t('footer.studioLinks.portfolio')}</Link></li>
                <li><Link href="/kontakty" locale={locale} aria-current="page">{t('footer.studioLinks.contact')}</Link></li>
              </ul>
            </div>

            <div className="foot-col">
              <h5>{t('footer.languagesTitle')}</h5>
              <ul>
                <li><Link href="/kontakty" locale="pl" hrefLang="pl">Polski</Link></li>
                <li><Link href="/kontakty" locale="en" hrefLang="en">English</Link></li>
                <li><Link href="/kontakty" locale="uk" hrefLang="uk">Українська</Link></li>
                <li><Link href="/kontakty" locale="ru" hrefLang="ru">Русский</Link></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <div className="legal-row">
              <div className="legal">{t('footer.legal')}</div>
              <ul className="foot-legal-links">
                <li><Link href="/polityka-prywatnosci" locale={locale}>{t('footer.legalLinks.privacy')}</Link></li>
                <li><Link href="/polityka-cookies" locale={locale}>{t('footer.legalLinks.cookies')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a className="whatsapp" href="https://wa.me/48453474944" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.05-.3-.15-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.15-.65.15-.15.3-.4.45-.6.15-.2.2-.3.3-.5.1-.2.05-.4-.025-.55-.075-.15-.7-1.7-1-2.3-.25-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.075-.8.4-.3.3-1.05 1-1.05 2.5s1.075 2.95 1.225 3.15c.15.2 2.1 3.2 5.075 4.5.7.3 1.25.5 1.7.6.7.2 1.35.2 1.85.1.55-.1 1.7-.7 1.95-1.4.25-.7.25-1.3.175-1.4-.075-.1-.275-.175-.575-.325M12 2C6.5 2 2 6.5 2 12c0 1.95.55 3.75 1.5 5.25L2 22l4.85-1.5c1.45.8 3.15 1.25 4.95 1.25 5.5 0 10-4.5 10-10S17.5 2 12 2" />
        </svg>
      </a>
    </>
  );
}
