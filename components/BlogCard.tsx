import { Link } from '@/i18n/navigation';
import type { Article } from '@/lib/blog';
import { getArticleLocale } from '@/lib/blog';
import { pickHeroImage } from '@/lib/blogImages';

function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    'real-estate': 'Real Estate',
    wesela: 'Wedding',
    promo: 'Promo',
    eventy: 'Events',
    budownictwo: 'Construction',
    'fpv-teledyski': 'FPV',
    inspekcje: 'Inspection',
    general: 'Industry',
  };
  return map[category] ?? category;
}

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function BlogCard({
  article,
  locale,
  featured = false,
}: {
  article: Article;
  locale: string;
  featured?: boolean;
}) {
  const a = getArticleLocale(article, locale);
  const cover = article.cover || pickHeroImage(article.slug, article.category);
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`blog-card ${featured ? 'blog-card--featured' : ''}`}
    >
      <div className="blog-card-cover" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-cat">{categoryLabel(article.category)}</span>
          <span className="blog-card-dot" aria-hidden>•</span>
          <span className="blog-card-time">{article.readingMinutes} min read</span>
        </div>
        <h3 className="blog-card-title">{a.h1 || a.title}</h3>
        <p className="blog-card-lead">{a.lead}</p>
        <div className="blog-card-footer">
          <span className="blog-card-date">{formatDate(article.publishedAt, locale)}</span>
          <span className="blog-card-arrow" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
