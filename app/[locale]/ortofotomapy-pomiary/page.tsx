import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ServiceLanding, { buildMetadata } from '@/components/ServiceLanding';

const NAMESPACE = 'ortofotomapy-pomiary';
const PAGE_PATH = '/ortofotomapy-pomiary';
const SLUG = 'ortofotomapy';
const HERO_IMAGE = 'https://images.unsplash.com/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1920&q=80';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = await getTranslations({ locale, namespace: `${NAMESPACE}.meta` });
  return buildMetadata({
    locale,
    pagePath: PAGE_PATH,
    namespace: NAMESPACE,
    heroImage: HERO_IMAGE,
    meta: {
      title: m('title'),
      description: m('description'),
      keywords: m('keywords'),
      ogTitle: m('ogTitle'),
      ogDescription: m('ogDescription'),
      ogImageAlt: m('ogImageAlt'),
    },
  });
}

export default async function OrtofotomapyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ServiceLanding
      locale={locale}
      namespace={NAMESPACE}
      pagePath={PAGE_PATH}
      slug={SLUG}
      heroImage={HERO_IMAGE}
      howToTotalTime="P10D"
      priceLow="950"
      priceHigh="4500"
      audienceType="Surveying firms, design studios, developers, precision agriculture"
      category="Aerial photogrammetry and RTK drone surveying"
    />
  );
}
