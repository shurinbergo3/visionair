import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BlogCard from '@/components/BlogCard';
import {
  getLatestArticles,
  getRelatedArticles,
  type Article,
} from '@/lib/blog';

type Props = {
  locale: string;
  // When provided, picks articles matching the service category (with general
  // fallback). When omitted, renders the latest articles regardless of category.
  serviceSlug?: string;
  limit?: number;
};

export default async function BlogTeaserSection({
  locale,
  serviceSlug,
  limit = 3,
}: Props) {
  const articles: Article[] = serviceSlug
    ? getRelatedArticles(serviceSlug, limit)
    : getLatestArticles(limit);

  if (articles.length === 0) return null;

  const t = await getTranslations('blogTeaser');
  const mode = serviceSlug ? 'related' : 'latest';

  return (
    <section className="blog-teaser-section section-pad" id="blog-teaser">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>
              {t(`${mode}.sectionLabel`)}
            </div>
            <h2 className="display-2">
              {t(`${mode}.title`)}
              <br />
              <span className="serif-it">{t(`${mode}.titleItalic`)}</span>
            </h2>
          </div>
          <div>
            <p className="lead">{t(`${mode}.lead`)}</p>
            <div className="sec-meta">
              <Link href="/blog" locale={locale} className="btn-link">
                {t('ctaAll')}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="blog-teaser-grid reveal">
          {articles.map((a) => (
            <BlogCard key={a.slug} article={a} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
