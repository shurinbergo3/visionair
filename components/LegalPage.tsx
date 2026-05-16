import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type LegalSection = { h: string; p: string };

type Props = {
  namespace: 'privacyPage' | 'cookiesPage';
};

export default async function LegalPage({ namespace }: Props) {
  const tNav = await getTranslations('nav');
  const tp = await getTranslations(namespace);
  const sections = tp.raw('sections') as LegalSection[];

  return (
    <main className="legal-page">
      <header className="legal-topbar">
        <div className="container legal-topbar-inner">
          <Link href="/" className="legal-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>VisionAir</span>
          </Link>
          <Link href="/#contact" className="legal-cta">
            {tNav('cta')}
          </Link>
        </div>
      </header>

      <section className="legal-hero">
        <div className="container">
          <div className="section-label">{tp('eyebrow')}</div>
          <h1 className="display-1 legal-title">
            {tp('title')}
            <br />
            <span className="serif-it">{tp('titleItalic')}</span>
          </h1>
          <div className="legal-updated">{tp('updated')}</div>
          <p className="lead legal-intro">{tp('intro')}</p>
        </div>
      </section>

      <section className="legal-body">
        <div className="container legal-body-inner">
          {sections.map((s, i) => (
            <article className="legal-section" key={i}>
              <div className="legal-section-index">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="legal-section-content">
                <h2 className="legal-h2">{s.h}</h2>
                <p>{s.p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
