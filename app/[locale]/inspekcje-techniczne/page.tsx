import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ServiceLanding, { buildMetadata } from '@/components/ServiceLanding';
import InspekcjeHero from '@/components/InspekcjeHero';

const NAMESPACE = 'inspekcje-techniczne';
const PAGE_PATH = '/inspekcje-techniczne';
const SLUG = 'inspekcje';
const HERO_IMAGE = '/video/inspekcje-hero-poster.jpg';

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

export default async function InspekcjeTechnicznePage({
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
      heroVideo={<InspekcjeHero />}
      heroVideoKey="inspekcje-techniczne"
      howToTotalTime="P10D"
      audienceType="Property managers, HOAs, infrastructure operators, insurers"
      category="Aerial visual technical inspection"
    />
  );
}
