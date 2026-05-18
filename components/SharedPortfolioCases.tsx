import { getTranslations } from 'next-intl/server';
import PortfolioGallery, { type PortfolioItem } from '@/components/PortfolioGallery';
import Cases from '@/components/Cases';

/**
 * Shared "Портфолио + Кейсы" block reused on every service page.
 * Sources its content from the root namespace, so editing the home
 * portfolio / cases data propagates to all service pages automatically.
 */
export default async function SharedPortfolioCases() {
  const t = await getTranslations();
  const portfolio = t.raw('portfolio.items') as PortfolioItem[];

  return (
    <>
      <section className="portfolio-section section-pad" id="portfolio">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="section-label" style={{ marginBottom: 18 }}>
                {t('portfolio.sectionLabel')}
              </div>
              <h2 className="display-2">
                {t('portfolio.title')}
                <br />
                <span className="serif-it">{t('portfolio.titleItalic')}</span>
              </h2>
            </div>
            <div>
              <p className="lead">{t('portfolio.lead')}</p>
              <div className="sec-meta">
                <a href="#contact" className="btn-link">
                  {t('portfolio.allLink')}
                  <svg
                    className="arr"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <PortfolioGallery items={portfolio} />
        </div>
      </section>

      <Cases />
    </>
  );
}
