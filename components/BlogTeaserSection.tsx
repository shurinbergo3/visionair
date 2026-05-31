import { getLatestArticles, getRelatedArticles } from '@/lib/blog';
import BlogTeaserCarousel from '@/components/BlogTeaserCarousel';

type Props = {
  locale: string;
  // When provided, picks articles matching the service category (with general
  // fallback). When omitted, renders the latest articles regardless of category.
  serviceSlug?: string;
  limit?: number;
};

// Server component: reads articles from disk (node:fs in lib/blog) and hands
// them to the client carousel as a prop. Keeping the data fetch on the server
// is what lets the carousel be a 'use client' component without dragging
// node:fs/node:path into the browser bundle.
export default function BlogTeaserSection({
  locale,
  serviceSlug,
  limit = 3,
}: Props) {
  const articles = serviceSlug
    ? getRelatedArticles(serviceSlug, limit)
    : getLatestArticles(limit);

  if (articles.length === 0) return null;

  return (
    <BlogTeaserCarousel
      articles={articles}
      locale={locale}
      mode={serviceSlug ? 'related' : 'latest'}
    />
  );
}
