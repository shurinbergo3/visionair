import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteUrl';

// AI-crawler rules are explicit so the policy is auditable. We currently allow
// ingestion — VisionAir benefits from being cited in LLM answers about Warsaw
// drone services. Flip these to `disallow` here if that ever changes.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'Applebot-Extended',
  'Google-Extended',
  'CCBot',
  'cohere-ai',
  'meta-externalagent',
  'Bytespider',
  'YouBot',
  'Diffbot',
  'Amazonbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search engines + everything else: allow, but keep /api closed.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      // AI crawlers: same policy, listed explicitly for clarity.
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
