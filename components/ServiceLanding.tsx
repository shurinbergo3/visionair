import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import ClientEffects from '@/components/ClientEffects';
import LangSwitcher from '@/components/LangSwitcher';
import ContactForm from '@/components/ContactForm';
import MobileMenu from '@/components/MobileMenu';
import CtaBannerVideo from '@/components/CtaBannerVideo';
import { getServicePath } from '@/lib/serviceRoutes';

const SITE_URL = 'https://visionair.site';

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg className="arr" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

type Deliverable = { title: string; desc: string; tag: string };
type Audience = { name: string; sub: string };
type Stat = { v: string; k: string; small?: string };
type Pkg = {
  name: string;
  tagline: string;
  price: string;
  sub: string;
  list: string[];
  featured: boolean;
};
type Step = { n: string; title: string; body: string; dur: string };
type Faq = { q: string; a: string };
type ServiceItem = { num: string; title: string };

export type ServiceLandingProps = {
  locale: string;
  /** i18n namespace under root, e.g. "wesela" | "eventy" | ... */
  namespace: string;
  /** Page path without locale, e.g. "/wesela" */
  pagePath: string;
  /** Slug-id used for in-page anchors and ld+json ids, e.g. "wesela" */
  slug: string;
  /** Hero poster image, served from /public */
  heroImage: string;
  /** Optional video element rendered behind the hero copy (replaces background-image when set) */
  heroVideo?: ReactNode;
  /** ISO 8601 duration for HowTo schema (P3D = 3 days) */
  howToTotalTime: string;
  /** Numeric low price string for AggregateOffer (e.g. "900") */
  priceLow: string;
  /** Numeric high price string for AggregateOffer (e.g. "3200") */
  priceHigh: string;
  /** Business audience description for Service ld+json */
  audienceType: string;
  /** Schema category */
  category: string;
};

const localePathBuilder = (pagePath: string) => (l: string) =>
  l === routing.defaultLocale ? pagePath : `/${l}${pagePath}`;

export default async function ServiceLanding({
  locale,
  namespace,
  pagePath,
  slug,
  heroImage,
  heroVideo,
  howToTotalTime,
  priceLow,
  priceHigh,
  audienceType,
  category,
}: ServiceLandingProps) {
  setRequestLocale(locale);

  const localePath = localePathBuilder(pagePath);
  const t = await getTranslations();
  const r = await getTranslations(namespace);
  const meta = await getTranslations(`${namespace}.meta`);

  const deliverables = r.raw('deliverables.items') as Deliverable[];
  const audience = r.raw('audience.items') as Audience[];
  const whyStats = r.raw('why.stats') as Stat[];
  const trust = r.raw('trustStrip') as { title: string; sub: string }[];
  const packages = r.raw('packages.items') as Pkg[];
  const steps = r.raw('process.steps') as Step[];
  const faq = r.raw('faq.items') as Faq[];
  const heroH1 = r.raw('hero.h1') as string[];
  const services = t.raw('services.items') as ServiceItem[];

  const pageUrl = SITE_URL + localePath(locale);

  const providerLd = {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': SITE_URL + '/#organization',
    name: 'VisionAir Warsaw',
    url: SITE_URL,
    telephone: '+48 453 474 944',
    image: SITE_URL + heroImage,
    priceRange: `${priceLow} - ${priceHigh} PLN`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warszawa',
      addressRegion: 'Mazowieckie',
      addressCountry: 'PL',
      streetAddress: 'Wola',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.233,
      longitude: 20.9818,
    },
    areaServed: [
      { '@type': 'City', name: 'Warszawa' },
      { '@type': 'AdministrativeArea', name: 'Mazowieckie' },
      { '@type': 'Country', name: 'Poland' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+48 453 474 944',
        contactType: 'sales',
        availableLanguage: ['Polish', 'English', 'Russian', 'Ukrainian'],
        areaServed: 'PL',
      },
    ],
    sameAs: [SITE_URL + '/pl/', SITE_URL + '/en/', SITE_URL + '/uk/'],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': pageUrl + '#service',
    serviceType: meta('schemaServiceType'),
    name: meta('title'),
    description: meta('schemaDescription'),
    url: pageUrl,
    provider: providerLd,
    areaServed: { '@type': 'City', name: 'Warszawa' },
    audience: { '@type': 'BusinessAudience', audienceType },
    category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PLN',
      lowPrice: priceLow,
      highPrice: priceHigh,
      offerCount: packages.length,
      offers: packages.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        description: p.tagline,
        price: p.price.replace(/\s|PLN|\/.*$/g, '').replace(/[^0-9]/g, ''),
        priceCurrency: 'PLN',
        url: pageUrl + '#packages',
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: p.name,
          description: p.list.join('. '),
        },
      })),
    },
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
    totalTime: howToTotalTime,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'PLN',
      value: priceLow,
    },
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
      url: pageUrl + `#${slug}-process`,
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

  const heroStyle = heroVideo
    ? undefined
    : ({
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7) 100%), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } as const);

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={heroImage}
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

      <header className="nav" id="nav">
        <div className="container nav-inner">
          <Link href="/" locale={locale} className="brand" aria-label="VisionAir Warsaw">
            <div className="brand-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="5" cy="5" r="2" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <line x1="6.5" y1="6.5" x2="10.2" y2="10.2" />
                <line x1="17.5" y1="6.5" x2="13.8" y2="10.2" />
                <line x1="6.5" y1="17.5" x2="10.2" y2="13.8" />
                <line x1="17.5" y1="17.5" x2="13.8" y2="13.8" />
              </svg>
            </div>
            <div>
              <div className="brand-name">VISIONAIR</div>
              <div className="brand-tagline">{t('nav.tagline')}</div>
            </div>
          </Link>

          <nav>
            <ul className="nav-links">
              <li><a href={`#${slug}-why`}>{r('nav.why')}</a></li>
              <li><a href={`#${slug}-deliverables`}>{r('nav.deliverables')}</a></li>
              <li><a href={`#${slug}-audience`}>{r('nav.audience')}</a></li>
              <li><a href="#packages">{r('nav.packages')}</a></li>
              <li><a href={`#${slug}-faq`}>{r('nav.faq')}</a></li>
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
      <section className="re-hero" id={`${slug}-hero`} style={heroStyle}>
        {heroVideo}
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

          <p className="re-hero-sub">
            {r.rich('hero.sub', { strong: (chunks) => <strong>{chunks}</strong> })}
          </p>

          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              {r('hero.ctaPrimary')}
              <ArrowRight />
            </a>
            <a href="#packages" className="btn btn-ghost">
              {r('hero.ctaGhost')}
              <ArrowRight />
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

      {/* WHY */}
      <section className="re-why section-pad" id={`${slug}-why`}>
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('why.sectionLabel')}</div>
              <h2 className="display-2">
                {r('why.title')}
                <br />
                <span className="serif-it">{r('why.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('why.lead')}</p>
            </div>
          </div>

          <div className="re-why-grid">
            {whyStats.map((s, i) => (
              <div className="re-why-stat reveal" key={i}>
                <div className="num tabular">
                  {s.v}
                  {s.small && <small>{s.small}</small>}
                </div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>

          <div className="re-why-body reveal">
            <p>{r('why.body1')}</p>
            <p>{r('why.body2')}</p>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="re-deliverables section-pad" id={`${slug}-deliverables`}>
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
              <article className={`re-deliver-card re-d-${i + 1}`} key={i}>
                <div className="re-d-tag">{d.tag}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="re-districts section-pad" id={`${slug}-audience`}>
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{r('audience.sectionLabel')}</div>
              <h2 className="display-2">
                {r('audience.title')}
                <br />
                <span className="serif-it">{r('audience.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{r('audience.lead')}</p>
            </div>
          </div>

          <div className="re-districts-grid reveal">
            {audience.map((a, i) => (
              <div className="re-district" key={i}>
                <div className="re-d-name">{a.name}</div>
                <div className="re-d-sub">{a.sub}</div>
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
                <div className="p-price">
                  {p.price} <small>{p.sub}</small>
                </div>
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

          <p className="re-pkg-note reveal">{r('packages.note')}</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section section-pad" id={`${slug}-process`}>
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

      {/* FAQ */}
      <section className="re-faq-section section-pad" id={`${slug}-faq`}>
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

          <div className="reveal" style={{ marginTop: 32 }}>
            {faq.map((f, i) => (
              <details key={i} style={{
                borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
                padding: '20px 0',
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontSize: 18,
                  fontWeight: 500,
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 24,
                }}>
                  <span>{f.q}</span>
                  <span style={{ color: 'var(--muted, #888)', fontSize: 20 }} aria-hidden="true">+</span>
                </summary>
                <p style={{ marginTop: 12, color: 'var(--muted, #aaa)', lineHeight: 1.6 }}>{f.a}</p>
              </details>
            ))}
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
              <Link href="/" locale={locale} className="brand">
                <div className="brand-mark">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="2.5" />
                    <circle cx="5" cy="5" r="2" />
                    <circle cx="19" cy="5" r="2" />
                    <circle cx="5" cy="19" r="2" />
                    <circle cx="19" cy="19" r="2" />
                    <line x1="6.5" y1="6.5" x2="10.2" y2="10.2" />
                    <line x1="17.5" y1="6.5" x2="13.8" y2="10.2" />
                    <line x1="6.5" y1="17.5" x2="10.2" y2="13.8" />
                    <line x1="17.5" y1="17.5" x2="13.8" y2="13.8" />
                  </svg>
                </div>
                <div>
                  <div className="brand-name">VISIONAIR</div>
                  <div className="brand-tagline">{t('nav.tagline')}</div>
                </div>
              </Link>
              <p>{t('footer.tagline')}</p>
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

export function buildMetadata({
  locale,
  pagePath,
  namespace: _namespace,
  heroImage,
  meta,
}: {
  locale: string;
  pagePath: string;
  namespace: string;
  heroImage: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
  };
}) {
  const localePath = localePathBuilder(pagePath);
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
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
      type: 'website' as const,
      url: SITE_URL + localePath(locale),
      title: meta.ogTitle,
      description: meta.ogDescription,
      locale,
      images: [
        {
          url: heroImage,
          width: 1600,
          height: 900,
          alt: meta.ogImageAlt,
        },
      ],
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
  };
}
