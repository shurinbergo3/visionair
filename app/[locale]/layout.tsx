import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Bricolage_Grotesque, Onest, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import CookieConsent from '@/components/CookieConsent';
import ScrollToTop from '@/components/ScrollToTop';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0908',
};

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
    priceRange: '900 - 18 000 PLN',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warszawa',
      addressRegion: 'Mazowieckie',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.2297,
      longitude: 21.0122,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+48 453 474 944',
        contactType: 'customer service',
        availableLanguage: ['Polish', 'English', 'Russian', 'Ukrainian'],
        areaServed: ['PL', 'EU'],
      },
    ],
    knowsAbout: [
      'aerial cinematography',
      'real estate drone photography',
      'wedding aerial videography',
      'construction site monitoring',
      'RTK orthophoto mapping',
      'thermal inspection',
      'PV solar farm inspection',
      'FPV cinewhoop',
      'commercial drone production',
      'BVLOS operations',
      'CTR EPWA permits',
    ],
    areaServed: [
      { '@type': 'City', name: 'Warszawa' },
      { '@type': 'City', name: 'Kraków' },
      { '@type': 'City', name: 'Gdańsk' },
      { '@type': 'City', name: 'Wrocław' },
      { '@type': 'City', name: 'Poznań' },
      { '@type': 'Country', name: 'Poland' },
      { '@type': 'Place', name: 'European Union' },
    ],
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
          <ScrollToTop />
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
