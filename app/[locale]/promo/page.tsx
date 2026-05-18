import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import ClientEffects from '@/components/ClientEffects';
import LangSwitcher from '@/components/LangSwitcher';
import ContactForm from '@/components/ContactForm';
import MobileMenu from '@/components/MobileMenu';
import PromoHero from '@/components/PromoHero';
import CtaBannerVideo from '@/components/CtaBannerVideo';
import PromoFAQ from '@/components/PromoFAQ';
import BrandLogo from '@/components/BrandLogo';
import ServicesDropdown from '@/components/ServicesDropdown';
import SharedPortfolioCases from '@/components/SharedPortfolioCases';
import { getServicePath } from '@/lib/serviceRoutes';
import { SITE_URL } from '@/lib/siteUrl';

const PAGE_PATH = '/promo';

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

const localePath = (l: string) =>
  l === routing.defaultLocale ? PAGE_PATH : `/${l}${PAGE_PATH}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'promo.meta' });

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
          url: '/video/promo-hero-poster.jpg',
          width: 1600,
          height: 900,
          alt: t('ogImageAlt'),
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/video/promo-hero-poster.jpg'],
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

type Deliverable = { title: string; desc: string; tag: string };
type ObjectType = { title: string; desc: string; img: string; alt: string };
type District = { name: string; sub: string };
type Stat = { v: string; k: string; small?: string };
type Pkg = {
  name: string;
  tagline: string;
  price: string;
  list: string[];
  featured: boolean;
};
type Step = { n: string; title: string; body: string; dur: string };
type Testimonial = { quote: string; initials: string; name: string; role: string };
type Faq = { q: string; a: string };
type ServiceItem = { num: string; title: string };

export default async function PromoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const r = await getTranslations('promo');
  const meta = await getTranslations('promo.meta');

  const deliverables = r.raw('deliverables.items') as Deliverable[];
  const objectTypes = r.raw('objects.items') as ObjectType[];
  const districts = r.raw('districts.items') as District[];
  const whyStats = r.raw('why.stats') as Stat[];
  const trust = r.raw('trustStrip') as { title: string; sub: string }[];
  const packages = r.raw('packages.items') as Pkg[];
  const steps = r.raw('process.steps') as Step[];
  const testimonials = r.raw('testimonials.items') as Testimonial[];
  const faq = r.raw('faq.items') as Faq[];
  const heroH1 = r.raw('hero.h1') as string[];
  const services = t.raw('services.items') as ServiceItem[];

  const pageUrl = SITE_URL + localePath(locale);

  // Organization is emitted once globally in [locale]/layout.tsx. Per-page schemas
  // reference it by @id to avoid duplicate entities in Google's knowledge graph.
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': pageUrl + '#service',
    serviceType: meta('schemaServiceType'),
    name: meta('title'),
    description: meta('schemaDescription'),
    url: pageUrl,
    image: SITE_URL + '/video/promo-hero-poster.jpg',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: {
      '@type': 'City',
      name: 'Warszawa',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Advertising agencies, production companies, brand marketers, music labels, hotel chains',
    },
    category: 'Aerial commercial production, TVC, brand films, music videos',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: r('process.title') + ' ' + r('process.titleItalic'),
    description: r('process.lead'),
    totalTime: 'P14D',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
      url: pageUrl + '#promo-process',
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: r('breadcrumbs.home'),
        item: SITE_URL + (locale === routing.defaultLocale ? '/' : `/${locale}/`),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: r('breadcrumbs.current'),
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/video/promo-hero-poster.jpg"
        // @ts-expect-error fetchpriority is a valid HTML attribute
        fetchpriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <ClientEffects />

      {/* NAV */}
      <header className="nav" id="nav">
        <div className="container nav-inner">
          <BrandLogo variant="header" tagline={t('nav.tagline')} />

          <nav>
            <ul className="nav-links">
              <ServicesDropdown />
              <li><a href="#promo-why">{r('nav.why')}</a></li>
              <li><a href="#promo-deliverables">{r('nav.deliverables')}</a></li>
              <li><a href="#packages">{r('nav.packages')}</a></li>
              <li><a href="#promo-faq">{r('nav.faq')}</a></li>
              <li><a href="#contact">{r('nav.contact')}</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <div className="nav-actions-desktop">
              <LangSwitcher />
              <a href="#contact" className="btn btn-primary">
                {r('nav.cta')}
                <ArrowRight />
              </a>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="re-hero" id="promo-hero">
        <PromoHero />
        <div className="re-hero-overlay" aria-hidden="true" />
        <div className="re-hero-grain" aria-hidden="true" />

        <div className="hero-frame">
          <span className="br" />
          <span className="bl" />
        </div>

        <div className="container re-hero-content">
          <nav className="re-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" locale={locale}>{r('breadcrumbs.home')}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{r('breadcrumbs.current')}</span>
          </nav>

          <div className="hero-eyebrow">
            <span className="dot" />
            <span>{r('hero.eyebrow')}</span>
          </div>

          <h1 className="re-hero-h1">
            <span className="line">{heroH1[0]}</span>
            <span className="line">
              <span className="serif-it">{heroH1[1]}</span>
            </span>
          </h1>

          <p className="re-hero-sub">{r('hero.sub')}</p>

          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              {r('hero.ctaPrimary')}
              <ArrowRight />
            </a>
            <a href="#portfolio" className="btn btn-ghost">
              {r('hero.ctaGhost')}
              <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </a>
          </div>

          <div className="re-hero-meta">
            <div className="item">
              <div className="k">{r('hero.meta.objectsKey')}</div>
              <div className="v tabular">{r('hero.meta.objectsValue')}</div>
            </div>
            <div className="item">
              <div className="k">{r('hero.meta.deliveryKey')}</div>
              <div className="v tabular">{r('hero.meta.deliveryValue')}</div>
            </div>
            <div className="item">
              <div className="k">{r('hero.meta.ratingKey')}</div>
              <div className="v tabular">{r('hero.meta.ratingValue')}</div>
            </div>
            <div className="item">
              <div className="k">{r('hero.meta.permitsKey')}</div>
              <div className="v">{r('hero.meta.permitsValue')}</div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>{r('hero.scrollHint')}</span>
          <span className="bar" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-strip-inner">
            {trust.map((it, i) => (
              <div className="trust-item" key={i}>
                <span className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </span>
                <div className="lbl">
                  <b>{it.title}</b>
                  <span>{it.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DRONE */}
      <section className="re-why section-pad" id="promo-why">
        <div className="re-why-glow" aria-hidden="true" />
        <div className="container">
          <div className="re-why-head reveal">
            <aside className="re-why-rail" aria-hidden="true">
              <span className="re-why-ch">01</span>
              <span className="re-why-rail-line" />
              <span className="re-why-rail-dot" />
            </aside>

            <div className="re-why-intro">
              <div className="re-why-eyebrow">
                <span className="re-why-eyebrow-dash" aria-hidden="true" />
                <span className="section-label">{r('why.sectionLabel')}</span>
              </div>

              <h2 className="display-2 re-why-title">
                {r('why.title')}
                <br />
                <span className="serif-it">{r('why.titleItalic')}</span>
              </h2>

              <div className="re-why-rule" aria-hidden="true">
                <span className="re-why-rule-mark" />
              </div>

              <p className="re-why-lead">{r('why.lead')}</p>
              <p className="re-why-source">{r('why.source')}</p>
            </div>
          </div>

          <div className="re-why-grid reveal">
            {whyStats.map((s, i) => (
              <div className="re-why-stat" key={i}>
                <div className="re-why-stat-index">{String(i + 1).padStart(2, '0')}</div>
                <div className="num tabular">
                  {s.v}
                  {s.small && <small>{s.small}</small>}
                </div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>

          <div className="re-why-body reveal">
            <span className="re-why-body-mark" aria-hidden="true" />
            <p>{r('why.body1')}</p>
            <p>{r('why.body2')}</p>
          </div>
        </div>
      </section>

      {/* DELIVERABLES BENTO */}
      <section className="re-deliverables section-pad" id="promo-deliverables">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('deliverables.sectionLabel')}</div>
              <h2 className="display-2">
                {r('deliverables.title')}
                <br />
                <span className="serif-it">{r('deliverables.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('deliverables.lead')}</p>
            </div>
          </div>

          <div className="re-deliver-bento reveal">
            {deliverables.map((d, i) => (
              <article
                className={`re-deliver-card re-d-${i + 1}`}
                key={i}
              >
                <div className="re-d-tag">{d.tag}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECT TYPES / FORMATS */}
      <section className="re-objects section-pad" id="promo-objects">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('objects.sectionLabel')}</div>
              <h2 className="display-2">
                {r('objects.title')}
                <br />
                <span className="serif-it">{r('objects.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('objects.lead')}</p>
            </div>
          </div>

          <div className="re-objects-grid">
            {objectTypes.map((o, i) => (
              <article className="re-object-card reveal" key={i}>
                <div className="re-obj-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.alt} loading="lazy" />
                </div>
                <div className="re-obj-body">
                  <h3>{o.title}</h3>
                  <p>{o.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="re-districts section-pad" id="promo-industries">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('districts.sectionLabel')}</div>
              <h2 className="display-2">
                {r('districts.title')}
                <br />
                <span className="serif-it">{r('districts.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('districts.lead')}</p>
              <p style={{ color: 'var(--muted)', marginTop: 14, fontSize: 13 }}>
                {r('districts.note')}
              </p>
            </div>
          </div>

          <div className="re-districts-grid reveal">
            {districts.map((d, i) => (
              <div className="re-district" key={i}>
                <div className="re-d-name">{d.name}</div>
                <div className="re-d-sub">{d.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="pkg-section section-pad" id="packages">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('packages.sectionLabel')}</div>
              <h2 className="display-2">
                {r('packages.title')}
                <br />
                <span className="serif-it">{r('packages.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('packages.lead')}</p>
            </div>
          </div>

          <div className="pkg-grid">
            {packages.map((p, i) => (
              <article className={`pkg reveal ${p.featured ? 'featured' : ''}`} key={i}>
                <div className="p-name">{p.name}</div>
                <h3 className="p-title">{p.tagline}</h3>
                <div className="p-price">{p.price}</div>
                <ul>
                  {p.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
                <a href="#contact" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  {r('packages.selectCta')}
                  <ArrowRight />
                </a>
              </article>
            ))}
          </div>

          <p className="re-pkg-note reveal">
            {r('packages.note')}
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section section-pad" id="promo-process">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('process.sectionLabel')}</div>
              <h2 className="display-2">
                {r('process.title')}
                <br />
                <span className="serif-it">{r('process.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('process.lead')}</p>
            </div>
          </div>

          <div className="process-grid re-process-grid">
            {steps.map((step, i) => (
              <div className="step reveal" key={i}>
                <div className="n">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <div className="dur">{step.dur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO + CASES (shared block, single source of truth) */}
      <SharedPortfolioCases />

      {/* TESTIMONIALS */}
      <section className="test-section section-pad re-testimonials">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('testimonials.sectionLabel')}</div>
              <h2 className="display-2">
                {r('testimonials.title')}
                <br />
                <span className="serif-it">{r('testimonials.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('testimonials.lead')}</p>
            </div>
          </div>

          <div className="test-grid">
            {testimonials.map((tm, i) => (
              <div className="testimonial reveal" key={i}>
                <div className="stars">★★★★★</div>
                <div className="quote">{tm.quote}</div>
                <div className="author">
                  <div className="avatar">{tm.initials}</div>
                  <div className="meta">
                    <b>{tm.name}</b>
                    <span>{tm.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="re-faq-section section-pad" id="promo-faq">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('faq.sectionLabel')}</div>
              <h2 className="display-2">
                {r('faq.title')}
                <br />
                <span className="serif-it">{r('faq.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('faq.lead')}</p>
              <div className="sec-meta">
                <a href="#contact" className="btn-link">
                  {r('faq.askMore')}
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="reveal">
            <PromoFAQ />
          </div>
        </div>
      </section>

      {/* CONTACT — merged cinematic hero + form */}
      <section className="contact-section section-pad" id="contact">
        <CtaBannerVideo />
        <div className="container">
          <div className="contact-hero reveal">
            <div className="section-label contact-hero-eyebrow">
              {r('ctaBanner.eyebrow')}
            </div>
            <h2 className="display-2">
              {r('ctaBanner.title')}
              <br />
              <span className="serif-it">{r('ctaBanner.titleItalic')}</span>
            </h2>
            <p className="lead">{r('ctaBanner.lead')}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="section-label" style={{ marginBottom: 18 }}>{r('contact.sectionLabel')}</div>
              <h3 className="display-3">
                {r('contact.title')}
                <br />
                <span className="serif-it">{r('contact.titleItalic')}</span>
              </h3>
              <p className="lead" style={{ marginTop: 20 }}>{r('contact.lead')}</p>

              <ul className="contact-list">
                <li>
                  <div className="k">{t('contact.labels.phone')}</div>
                  <a href="tel:+48453474944" className="v tabular">+48 453 474 944</a>
                </li>
                <li>
                  <div className="k">{t('contact.labels.whatsapp')}</div>
                  <a href="https://wa.me/48453474944" className="v">{t('contact.labels.whatsappWrite')}</a>
                </li>
                <li>
                  <div className="k">{t('contact.labels.telegram')}</div>
                  <a href="https://t.me/sumotry" className="v" target="_blank" rel="noopener noreferrer">{t('contact.labels.telegramWrite')}</a>
                </li>
                <li>
                  <div className="k">{t('contact.labels.email')}</div>
                  <a href="mailto:shurinbergo@gmail.com" className="v">{t('contact.labels.emailValue')}</a>
                </li>
                <li>
                  <div className="k">{t('contact.labels.studio')}</div>
                  <div className="v">{t('contact.labels.studioValue')}</div>
                </li>
              </ul>
            </div>

            <ContactForm />
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
                <li><Link href="/" locale={locale}>{t('footer.studioLinks.portfolio')}</Link></li>
                <li><Link href="/" locale={locale}>{t('footer.studioLinks.trust')}</Link></li>
                <li><Link href="/" locale={locale}>{t('footer.studioLinks.about')}</Link></li>
                <li><a href="#contact">{t('footer.studioLinks.contact')}</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h5>{t('footer.languagesTitle')}</h5>
              <ul>
                <li><a href={localePath('pl')}>Polski</a></li>
                <li><a href={localePath('en')}>English</a></li>
                <li><a href={localePath('uk')}>Українська</a></li>
                <li><a href={localePath('ru')}>Русский</a></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <div className="legal">{t('footer.legal')}</div>
            <div className="foot-socials">
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8M10 15V9l5.2 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a className="whatsapp" href="https://wa.me/48453474944" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 14.4c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.05-.3-.15-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.15-.65.15-.15.3-.4.45-.6.15-.2.2-.3.3-.5.1-.2.05-.4-.025-.55-.075-.15-.7-1.7-1-2.3-.25-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.075-.8.4-.3.3-1.05 1-1.05 2.5s1.075 2.95 1.225 3.15c.15.2 2.1 3.2 5.075 4.5.7.3 1.25.5 1.7.6.7.2 1.35.2 1.85.1.55-.1 1.7-.7 1.95-1.4.25-.7.25-1.3.175-1.4-.075-.1-.275-.175-.575-.325M12 2C6.5 2 2 6.5 2 12c0 1.95.55 3.75 1.5 5.25L2 22l4.85-1.5c1.45.8 3.15 1.25 4.95 1.25 5.5 0 10-4.5 10-10S17.5 2 12 2" />
        </svg>
      </a>
    </>
  );
}
