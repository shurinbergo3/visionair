import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ServiceLanding, { buildMetadata } from '@/components/ServiceLanding';

const NAMESPACE = 'fpv-teledyski';
const PAGE_PATH = '/fpv-teledyski';
const SLUG = 'fpv';
const HERO_IMAGE = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80';

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

export default async function FpvTeledyskiPage({
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
      howToTotalTime="P42D"
      priceLow="3200"
      priceHigh="14000"
      audienceType="Music artists, record labels, music video directors, creative agencies"
      category="FPV drone cinematography and music video production"
    />
  );
}
