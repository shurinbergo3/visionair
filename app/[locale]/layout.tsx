import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Bricolage_Grotesque, Onest, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
});
const onest = Onest({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  display: 'swap',
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://visionair.site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const localePath = (l: string) => (l === routing.defaultLocale ? '/' : `/${l}/`);

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: localePath(locale),
      languages: {
        ru: localePath('ru'),
        pl: localePath('pl'),
        en: localePath('en'),
        uk: localePath('uk'),
        'x-default': localePath(routing.defaultLocale),
      },
    },
    openGraph: {
      type: 'website',
      url: SITE_URL + localePath(locale),
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'VisionAir Warsaw',
    alternateName: 'VisionAir Aerial Cinema',
    description: t('schemaDescription'),
    url: SITE_URL,
    image: `${SITE_URL}/og.jpg`,
    telephone: '+48 453 474 944',
    priceRange: '900 — 18 000 PLN',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warszawa',
      addressCountry: 'PL',
    },
    areaServed: ['Warszawa', 'Poland', 'Europe'],
  };

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${onest.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
