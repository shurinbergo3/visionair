import fs from 'node:fs';
import path from 'node:path';
import type { Article } from './blog-shared';

// Re-export the client-safe types and pure helpers so existing server-side
// importers of `@/lib/blog` keep working unchanged. Client components must
// import those from `@/lib/blog-shared` directly to avoid dragging node:fs /
// node:path into the browser bundle.
export * from './blog-shared';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'));
  const articles = files
    .map((f) => JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')) as Article)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  cache = articles;
  return articles;
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) ?? null;
}

// Service slug → article category. Articles tagged "general" act as a
// fallback pool for services with no dedicated category yet.
// Accepts both URL slugs ("inspekcje-techniczne") and the shorter anchor
// slugs used inside ServiceLanding ("inspekcje", "fpv").
const SERVICE_TO_CATEGORY: Record<string, string> = {
  'real-estate': 'real-estate',
  wesela: 'wesela',
  eventy: 'general',
  promo: 'general',
  budownictwo: 'budownictwo',
  'inspekcje-techniczne': 'inspekcje',
  inspekcje: 'inspekcje',
  'fpv-teledyski': 'general',
  fpv: 'general',
};

export function getRelatedArticles(serviceSlug: string, limit = 3): Article[] {
  const all = getAllArticles();
  const targetCategory = SERVICE_TO_CATEGORY[serviceSlug];
  if (!targetCategory) return all.slice(0, limit);

  const primary = all.filter((a) => a.category === targetCategory);
  if (primary.length >= limit) return primary.slice(0, limit);

  const fillers = all.filter(
    (a) => a.category !== targetCategory && a.category === 'general',
  );
  const remaining = all.filter(
    (a) => a.category !== targetCategory && a.category !== 'general',
  );
  return [...primary, ...fillers, ...remaining].slice(0, limit);
}

export function getLatestArticles(limit = 3): Article[] {
  return getAllArticles().slice(0, limit);
}
