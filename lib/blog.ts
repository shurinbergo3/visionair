import fs from 'node:fs';
import path from 'node:path';

export type Locale = 'ru' | 'pl' | 'en' | 'uk';

export type Section =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'callout'; kind: 'tip' | 'warn' | 'note'; title: string; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type FaqEntry = { q: string; a: string };

export type ArticleLocale = {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: Section[];
  cta: {
    title: string;
    titleItalic?: string;
    lead: string;
    primary: string;
    whatsapp: string;
  };
  faqQ?: FaqEntry[];
};

export type Article = {
  slug: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  cover?: string;
  tags?: string[];
  i18n: Record<Locale, ArticleLocale>;
};

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

export function getArticleLocale(article: Article, locale: string): ArticleLocale {
  const known = (['ru', 'pl', 'en', 'uk'] as const).includes(locale as Locale);
  const key = (known ? locale : 'ru') as Locale;
  return article.i18n[key] ?? article.i18n.ru;
}
