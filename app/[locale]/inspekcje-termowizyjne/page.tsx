import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ServiceLanding, { buildMetadata } from '@/components/ServiceLanding';

const NAMESPACE = 'inspekcje-termowizyjne';
const PAGE_PATH = '/inspekcje-termowizyjne';
const SLUG = 'inspekcje-termo';
const HERO_IMAGE = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80';

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

export default async function InspekcjeTermowizyjnePage({
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
      howToTotalTime="P14D"
      priceLow="790"
      priceHigh="4200"
      audienceType="PV farm operators, EPC contractors, energy auditors, district heating operators"
      category="Aerial thermographic inspection"
    />
  );
}
