import { getTranslations, setRequestLocale } from 'next-intl/server';
import ClientEffects from '@/components/ClientEffects';
import LangSwitcher from '@/components/LangSwitcher';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';
import Packages from '@/components/Packages';
import ContactForm from '@/components/ContactForm';
import MobileMenu from '@/components/MobileMenu';
import CtaBannerVideo from '@/components/CtaBannerVideo';
import HomeHero from '@/components/HomeHero';
import BrandLogo from '@/components/BrandLogo';
import PortfolioGallery, { type PortfolioItem } from '@/components/PortfolioGallery';
import ServicesDropdown from '@/components/ServicesDropdown';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getServicePath } from '@/lib/serviceRoutes';
import { buildVideoLd } from '@/lib/heroVideos';
import { SITE_URL } from '@/lib/siteUrl';

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg className="arr" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

type ServiceItem = {
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  price: string;
  alt: string;
  img: string;
  feature: boolean;
};

type TrustStripItem = { title: string; sub: string };
type TrustStat = { k: string; v: string; small: string };
type CertSection = { sub: string; title: string; body: string; pills: string[] };
type ProcessStep = { n: string; title: string; body: string; dur: string };
type Pillar = { code?: string; title: string; body: string; tags?: string[] };
type FleetItem = { name: string; specs: string; badge: string; img: string; bg?: string; alt: string };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const meta = await getTranslations({ locale, namespace: 'meta' });

  const localePath = (l: string) => (l === routing.defaultLocale ? '/' : `/${l}/`);
  const pageUrl = SITE_URL + localePath(locale);

  const videoLd = buildVideoLd({
    key: 'home',
    name: meta('videoName'),
    description: meta('videoDescription'),
    locale,
    pageUrl,
  });

  const services = t.raw('services.items') as ServiceItem[];
  const trustStrip = t.raw('trustStrip') as TrustStripItem[];
  const trustStats = t.raw('trust.stats') as TrustStat[];
  const easa = t.raw('trust.easa') as CertSection;
  const compensa = t.raw('trust.compensa') as CertSection;
  const trustTitle = t.raw('trust.title') as string[];
  const portfolio = t.raw('portfolio.items') as PortfolioItem[];
  const processSteps = t.raw('process.steps') as ProcessStep[];
  const pillars = t.raw('why.pillars') as Pillar[];
  const aboutStats = t.raw('about.stats') as TrustStat[];
  const fleet = t.raw('about.fleet') as FleetItem[];
  const heroH1 = t.raw('hero.h1') as string[];
  const marquee = t.raw('marquee') as string[];
  const reviewCount = (t.raw('testimonials.items') as unknown[]).length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />

      <ClientEffects />

      {/* NAV */}
      <header className="nav" id="nav">
        <div className="container nav-inner">
          <BrandLogo variant="header" tagline={t('nav.tagline')} />

          <nav>
            <ul className="nav-links">
              <ServicesDropdown homeAnchor />
              <li><a href="#portfolio">{t('nav.links.portfolio')}</a></li>
              <li><a href="#about">{t('nav.links.about')}</a></li>
              <li><Link href="/blog">{t('nav.links.blog')}</Link></li>
              <li><a href="#contact">{t('nav.links.contact')}</a></li>
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
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" id="heroBg">
          {/* Active: looping hero video. To revert to the old Unsplash background,
              remove the v-video layer and put `active` back on .v-photo. */}
          <div className="layer v-video active">
            <HomeHero />
          </div>
          <div className="layer v-photo" />
          <div className="layer v-landscape" />
          <div className="layer v-gradient" />
        </div>

        <div className="hero-frame">
          <span className="br" />
          <span className="bl" />
        </div>

        <div className="container hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-eyebrow">
                <span className="dot" />
                <span>{t('hero.eyebrow')}</span>
              </div>

              <h1 className="display">
                <span className="line">{heroH1[0]}</span>
                <span className="line">{heroH1[1]}</span>
                <span className="line">
                  <span className="serif-it">{heroH1[2]}</span>
                </span>
              </h1>

              <p
                className="hero-sub"
                dangerouslySetInnerHTML={{ __html: t.raw('hero.sub') as string }}
              />

              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  {t('hero.ctaPrimary')}
                  <ArrowRight />
                </a>
                <a href="#cases" className="btn btn-ghost">
                  {t('hero.ctaGhost')}
                  <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                </a>
              </div>

              <a
                href="#testimonials"
                className="hero-rating"
                aria-label={`${t('testimonials.rating')} / ${t('testimonials.ratingMax')} — ${t('testimonials.basedOn', { count: reviewCount })}`}
              >
                <span className="hero-rating-stars" aria-hidden="true">★★★★★</span>
                <span className="hero-rating-score">
                  <span className="num">{t('testimonials.rating')}</span>
                  <span className="max">/ {t('testimonials.ratingMax')}</span>
                </span>
                <span className="hero-rating-sep" aria-hidden="true" />
                <span className="hero-rating-meta">{t('testimonials.basedOn', { count: reviewCount })}</span>
                <ArrowRight size={12} />
              </a>

              <div className="hero-meta">
                <div className="item">
                  <div className="k">{t('hero.meta.experienceKey')}</div>
                  <div className="v tabular">{t('hero.meta.experienceValue')}</div>
                </div>
                <div className="item">
                  <div className="k">{t('hero.meta.hoursKey')}</div>
                  <div className="v tabular">{t('hero.meta.hoursValue')}</div>
                </div>
                <div className="item">
                  <div className="k">{t('hero.meta.insuranceKey')}</div>
                  <div className="v">{t('hero.meta.insuranceValue')}</div>
                </div>
              </div>
            </div>

            <div className="drone-scene" aria-hidden="true">
              <div className="drone-rings">
                <div className="ring r1" />
                <div className="ring r2" />
                <div className="ring r3" />
              </div>
              <div className="coords">
                <div><span className="l">LAT</span> 52.2297° N</div>
                <div><span className="l">LON</span> 21.0122° E</div>
                <div><span className="l">ALT</span> 120m AGL</div>
              </div>
              <span className="spec-tag t1">4K Cinematic</span>
              <span className="spec-tag t2">DJI Mini 4 Pro</span>
              <span className="spec-tag t3">EASA Certified</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="droneImg" className="drone-img" src="/assets/drone-mini4pro.webp" alt="DJI cinema drone in flight" />
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>{t('hero.scrollHint')}</span>
          <span className="bar" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-strip-inner">
            {trustStrip.map((it, i) => (
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

      {/* SERVICES */}
      <section className="services-section section-pad" id="services">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{t('services.sectionLabel')}</div>
              <h2 className="display-2">
                {t('services.title')}
                <br />
                <span className="serif-it">{t('services.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{t('services.lead')}</p>
              <div className="sec-meta">
                <a href="#services" className="btn-link">
                  {t('services.allLink')}
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="services-grid">
            {services.map((s, i) => {
              const internalHref = getServicePath(s.num);
              const overlayLink = internalHref ? (
                <Link href={internalHref} className="card-link-overlay" aria-label={s.title} />
              ) : (
                <a href="#contact" className="card-link-overlay" aria-label={s.title} />
              );
              return (
                <article className={`service ${s.feature ? 'feature' : ''} service-clickable reveal`} key={i}>
                  {overlayLink}
                  <div className="s-img">
                    <span className="num">{s.num}</span>
                    <span className="tag">{s.tag}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.alt} loading="lazy" />
                  </div>
                  <div className="s-body">
                    <h3>
                      {s.title}
                      <small>{s.subtitle}</small>
                    </h3>
                    <p className="desc">{s.desc}</p>
                    <div className="s-foot">
                      <div className="price">
                        <b>{s.price}</b>
                      </div>
                      <span className="card-more" aria-hidden="true">
                        {t('services.moreLink')} <span className="arr">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i}>
              {m}
              <span className="sep" style={{ marginLeft: 8, marginRight: 8 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section className="portfolio-section section-pad" id="portfolio">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{t('portfolio.sectionLabel')}</div>
              <h2 className="display-2">
                {t('portfolio.title')}
                <br />
                <span className="serif-it">{t('portfolio.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{t('portfolio.lead')}</p>
              <div className="sec-meta">
                <a href="#portfolio" className="btn-link">
                  {t('portfolio.allLink')}
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <PortfolioGallery items={portfolio} />
        </div>
      </section>

      {/* CASES (client) */}
      <Cases />

      {/* WHY */}
      <section className="why-section section-pad">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{t('why.sectionLabel')}</div>
              <h2 className="display-2">
                {t('why.title')}
                <br />
                <span className="serif-it">{t('why.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{t('why.lead')}</p>
            </div>
          </div>

          <div className="why-grid">
            {pillars.map((p, i) => {
              const num = String(i + 1).padStart(2, '0');
              const total = String(pillars.length).padStart(2, '0');
              return (
                <article className={`pillar reveal pillar-${i + 1}`} key={i}>
                  <span className="wp-frame tl" aria-hidden="true" />
                  <span className="wp-frame tr" aria-hidden="true" />
                  <span className="wp-frame bl" aria-hidden="true" />
                  <span className="wp-frame br" aria-hidden="true" />
                  <span className="wp-scan" aria-hidden="true" />
                  <span className="wp-grid" aria-hidden="true" />

                  <header className="wp-head">
                    <div className="wp-meta">
                      <span className="wp-num"><span className="serif-it">{num}</span><span className="wp-num-total">/{total}</span></span>
                      {p.code && <span className="wp-code">{p.code}</span>}
                    </div>
                    <div className="wp-icon" aria-hidden="true">
                      {i === 0 && (
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="16" cy="16" r="3" />
                          <circle cx="6" cy="6" r="2.5" />
                          <circle cx="26" cy="6" r="2.5" />
                          <circle cx="6" cy="26" r="2.5" />
                          <circle cx="26" cy="26" r="2.5" />
                          <line x1="8" y1="8" x2="13.5" y2="13.5" />
                          <line x1="24" y1="8" x2="18.5" y2="13.5" />
                          <line x1="8" y1="24" x2="13.5" y2="18.5" />
                          <line x1="24" y1="24" x2="18.5" y2="18.5" />
                        </svg>
                      )}
                      {i === 1 && (
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="16" cy="16" r="11" strokeDasharray="2 3" opacity="0.55" />
                          <circle cx="16" cy="16" r="6" />
                          <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="16" y1="26" x2="16" y2="30" />
                          <line x1="2" y1="16" x2="6" y2="16" />
                          <line x1="26" y1="16" x2="30" y2="16" />
                        </svg>
                      )}
                      {i === 2 && (
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="16" cy="16" r="11" />
                          <ellipse cx="16" cy="16" rx="5" ry="11" />
                          <line x1="5" y1="16" x2="27" y2="16" />
                          <path d="M16 5c3 3 4 7 4 11s-1 8-4 11" />
                          <path d="M16 5c-3 3-4 7-4 11s1 8 4 11" />
                        </svg>
                      )}
                    </div>
                  </header>

                  <h3 className="wp-title">{p.title}</h3>
                  <p className="wp-body">{p.body}</p>

                  {p.tags && p.tags.length > 0 && (
                    <>
                      <span className="wp-divider" aria-hidden="true" />
                      <ul className="wp-tags">
                        {p.tags.map((tag) => (
                          <li className="wp-tag" key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section section-pad">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{t('process.sectionLabel')}</div>
              <h2 className="display-2">
                {t('process.title')}
                <br />
                <span className="serif-it">{t('process.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{t('process.lead')}</p>
            </div>
          </div>

          <div className="process-grid">
            {processSteps.map((step, i) => (
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

      {/* TRUST SECTION */}
      <section className="trust-section section-pad" id="trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-text reveal">
              <div className="section-label" style={{ marginBottom: 18 }}>{t('trust.sectionLabel')}</div>
              <h2 className="display-2">
                {trustTitle[0]}
                <br />
                {trustTitle[1]}
                <br />
                <span className="serif-it">{t('trust.titleItalic')}</span>
              </h2>
              <p className="lead" style={{ marginTop: 24 }}>{t('trust.lead')}</p>
              <p style={{ color: 'var(--cream-2)', marginTop: 18, maxWidth: '56ch' }}>{t('trust.body')}</p>

              <div className="trust-stats">
                {trustStats.map((s, i) => (
                  <div className="stat" key={i}>
                    <div className="k">{s.k}</div>
                    <div className="v tabular">
                      {s.v}<small>{s.small}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 36 }}>
                <a href="#contact" className="btn-link">
                  {t('trust.ctaPdf')}
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

            <div className="trust-cards reveal">
              <div className="cert-card">
                <div className="cert-head">
                  <div className="logo-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/easa-logo.png" alt="EASA — European Union Aviation Safety Agency" loading="lazy" />
                  </div>
                  <div className="cert-tag">
                    <span className="sub">{easa.sub}</span>
                    <span className="verified" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
                <div className="cert-body">
                  <h4>{easa.title}</h4>
                  <p>{easa.body}</p>
                  <div className="pill-row">
                    {easa.pills.map((p) => (
                      <span className="pill" key={p}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cert-card compensa">
                <div className="cert-head">
                  <div className="logo-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/compensa-logo.png" alt="Compensa Vienna Insurance Group" loading="lazy" />
                  </div>
                  <div className="cert-tag">
                    <span className="sub">{compensa.sub}</span>
                    <span className="verified" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Active
                    </span>
                  </div>
                </div>
                <div className="cert-body">
                  <h4>{compensa.title}</h4>
                  <p>{compensa.body}</p>
                  <div className="pill-row">
                    {compensa.pills.map((p) => (
                      <span className="pill" key={p}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section section-pad" id="about">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>{t('about.sectionLabel')}</div>
              <h2 className="display-2">
                {t('about.title')}
                <br />
                <span className="serif-it">{t('about.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{t('about.lead')}</p>
            </div>
          </div>

          <div className="about-grid">
            <div className="reveal about-text-col">
              <h3 className="display-3" style={{ marginBottom: 18 }}>
                {t('about.approachTitle')}
                <br />
                <span className="serif-it">{t('about.approachItalic')}</span>
              </h3>
              <p>{t('about.approachBody1')}</p>
              <p>{t('about.approachBody2')}</p>

              <div className="trust-stats" style={{ marginTop: 36 }}>
                {aboutStats.map((s, i) => (
                  <div className="stat" key={i}>
                    <div className="k">{s.k}</div>
                    <div className="v tabular">
                      {s.v}<small>{s.small}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="section-label" style={{ marginBottom: 20 }}>{t('about.fleetLabel')}</div>
              <div className="fleet-list">
                {fleet.map((f, i) => (
                  <article className="fleet" key={i}>
                    <div className="f-img">
                      <div className="f-bg-wrap" aria-hidden="true">
                        {f.bg && (
                          <span
                            className="f-bg"
                            style={{ backgroundImage: `url(${f.bg})` }}
                          />
                        )}
                        <span className="f-bg-tint" />
                        <span className="f-grid" />
                        <span className="f-glow" />
                      </div>
                      <span className="f-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="badge">{f.badge}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="f-drone" src={f.img} alt={f.alt} loading="lazy" />
                    </div>
                    <div className="fleet-body">
                      <div className="name">{f.name}</div>
                      <div className="specs">{f.specs}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* PACKAGES (client) */}
      <Packages />

      {/* CONTACT — merged cinematic hero + form */}
      <section className="contact-section section-pad" id="contact">
        <CtaBannerVideo />
        <div className="container">
          <div className="contact-hero reveal">
            <div className="section-label contact-hero-eyebrow">
              {t('ctaBanner.eyebrow')}
            </div>
            <h2 className="display-2">
              {t('ctaBanner.title')}
              <br />
              <span className="serif-it">{t('ctaBanner.titleItalic')}</span>
            </h2>
            <p className="lead">{t('ctaBanner.lead')}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="section-label" style={{ marginBottom: 18 }}>{t('contact.sectionLabel')}</div>
              <h3 className="display-3">
                {t('contact.title')}
                <br />
                <span className="serif-it">{t('contact.titleItalic')}</span>
              </h3>
              <p className="lead" style={{ marginTop: 20 }}>{t('contact.lead')}</p>

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
                        <Link href={href}>{s.title}</Link>
                      ) : (
                        <a href="#services">{s.title}</a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="foot-col">
              <h5>{t('footer.studioTitle')}</h5>
              <ul>
                <li><a href="#about">{t('footer.studioLinks.about')}</a></li>
                <li><a href="#trust">{t('footer.studioLinks.trust')}</a></li>
                <li><a href="#cases">{t('footer.studioLinks.cases')}</a></li>
                <li><a href="#portfolio">{t('footer.studioLinks.portfolio')}</a></li>
                <li><a href="#pricing">{t('footer.studioLinks.pricing')}</a></li>
                <li><a href="#contact">{t('footer.studioLinks.contact')}</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h5>{t('footer.languagesTitle')}</h5>
              <ul>
                <li><Link href="/" locale="pl" hrefLang="pl">Polski</Link></li>
                <li><Link href="/" locale="en" hrefLang="en">English</Link></li>
                <li><Link href="/" locale="uk" hrefLang="uk">Українська</Link></li>
                <li><Link href="/" locale="ru" hrefLang="ru">Русский</Link></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <div className="legal-row">
              <div className="legal">{t('footer.legal')}</div>
              <ul className="foot-legal-links">
                <li><Link href="/polityka-prywatnosci">{t('footer.legalLinks.privacy')}</Link></li>
                <li><Link href="/polityka-cookies">{t('footer.legalLinks.cookies')}</Link></li>
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
