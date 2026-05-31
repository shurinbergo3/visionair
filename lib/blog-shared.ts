// Client-safe blog helpers and types. This module MUST NOT import node:fs /
// node:path (or anything that does) — it's imported by client components
// (BlogCard inside the client carousel), and a Node built-in here would get
// pulled into the browser bundle and break `next build`. The filesystem-backed
// loaders live in ./blog (server-only) and re-export everything from here.

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
  tags?: string[];
  i18n: Record<Locale, ArticleLocale>;
};

export function getArticleLocale(article: Article, locale: string): ArticleLocale {
  const known = (['ru', 'pl', 'en', 'uk'] as const).includes(locale as Locale);
  const key = (known ? locale : 'ru') as Locale;
  return article.i18n[key] ?? article.i18n.ru;
}

// Branded covers are pre-rendered per (slug × locale) by
// scripts/generate-blog-covers.mjs and saved as /blog/{slug}.{locale}.webp.
// Cache-bust query is bumped whenever covers are regenerated so CDNs/browsers
// pick up the new bytes without a hard refresh.
const COVER_CACHE_BUST = '20260526b';

export function getCoverUrl(article: Article, locale: string): string {
  const known = (['ru', 'pl', 'en', 'uk'] as const).includes(locale as Locale);
  const key = (known ? locale : 'ru') as Locale;
  return `/blog/${article.slug}.${key}.webp?v=${COVER_CACHE_BUST}`;
}
