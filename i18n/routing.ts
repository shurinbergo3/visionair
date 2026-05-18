import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'pl', 'en', 'uk'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed',
  // Default share previews and crawler hits to Russian. Without this, next-intl
  // reads Accept-Language from social bots (usually en-US) and serves the EN page.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
