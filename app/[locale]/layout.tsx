import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Bricolage_Grotesque, Onest, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/siteUrl';
import CookieConsent from '@/components/CookieConsent';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollTopButton from '@/components/ScrollTopButton';
import '../globals.css';

const YANDEX_METRIKA_ID = 103902546;

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
  const ogLocaleMap: Record<string, string> = {
    ru: 'ru_RU',
    pl: 'pl_PL',
    en: 'en_US',
    uk: 'uk_UA',
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'VisionAir Warsaw' }],
    creator: 'VisionAir Warsaw',
    publisher: 'VisionAir Warsaw',
    formatDetection: { telephone: false, email: false, address: false },
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
      siteName: 'VisionAir Warsaw',
      url: SITE_URL + localePath(locale),
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: ogLocaleMap[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocaleMap[l] ?? l),
      images: [
        {
          url: '/og.jpg',
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/og.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: 'vQArkHcbUGMhb2g3SV4S1zm5OstfD2g-3fVJ2OW4Q0g',
      other: {
        'msvalidate.01': '4A779CC4B436CFC5EE17C01C4DF302C7',
      },
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

  const localePath = (l: string) => (l === routing.defaultLocale ? '/' : `/${l}/`);
  const homeUrl = SITE_URL + localePath(locale);

  // Single JSON-LD graph: WebSite (for sitelinks search box), Organization (the
  // canonical brand entity referenced by every page via @id), ProfessionalService
  // (the LocalBusiness entry that surfaces in Google business panels), and
  // BreadcrumbList for the home page. All nodes are cross-linked by @id so search
  // engines treat them as one knowledge graph rather than four orphan entities.
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'VisionAir Warsaw',
        description: t('schemaDescription'),
        inLanguage: ['ru-RU', 'pl-PL', 'en-US', 'uk-UA'],
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'VisionAir Warsaw',
        alternateName: 'VisionAir Aerial Cinema',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/og.jpg`,
          width: 1200,
          height: 630,
          caption: 'VisionAir Warsaw',
        },
        image: { '@id': `${SITE_URL}/#logo` },
        telephone: '+48 453 474 944',
        email: 'shurinbergo@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Warszawa',
          addressRegion: 'Mazowieckie',
          addressCountry: 'PL',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+48 453 474 944',
            email: 'shurinbergo@gmail.com',
            contactType: 'customer service',
            availableLanguage: ['Polish', 'English', 'Russian', 'Ukrainian'],
            areaServed: ['PL', 'EU'],
          },
        ],
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'VisionAir Warsaw',
        alternateName: 'VisionAir Aerial Cinema',
        description: t('schemaDescription'),
        url: SITE_URL,
        image: `${SITE_URL}/og.jpg`,
        logo: { '@id': `${SITE_URL}/#logo` },
        telephone: '+48 453 474 944',
        priceRange: '€€',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
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
          'EASA-certified aerial cinematography',
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
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${homeUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'VisionAir Warsaw',
            item: homeUrl,
          },
        ],
      },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

            ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ScrollToTop />
          {children}
          <ScrollTopButton />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
