import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/siteUrl';

export const dynamic = 'force-static';
export const revalidate = 86400;

type Faq = { q: string; a: string };
type Pkg = { name: string; tagline: string };

export async function GET() {
  const re = await getTranslations({ locale: 'en', namespace: 'realEstate' });
  const faq = re.raw('faq.items') as Faq[];
  const packages = re.raw('packages.items') as Pkg[];

  const lines: string[] = [];

  lines.push('# VisionAir Warsaw');
  lines.push('');
  lines.push('> Cinematic aerial drone cinematography studio in Warsaw, Poland. EASA-certified pilots (A1/A2/A3 + STS-01/STS-02), OC liability insurance via Compensa Vienna Insurance Group. Flights only in permitted airspace — we check zone availability and file required requests in advance. Cinema fleet: DJI Inspire 3 with Zenmuse X9-8K + ProRes RAW, DJI Mavic 3 Pro Hasselblad 5.1K, DJI Avata 2 FPV cinewhoop, DJI Mini 4 Pro. Serving real estate, film/TV, weddings, commercial advertising, construction, hospitality and events across Poland and Europe. Languages: Polish, English, Russian, Ukrainian.');
  lines.push('');
  lines.push('Contact: +48 453 474 944 (phone, WhatsApp). Studio: Mokotow. Hours: Mon-Sat 09:00-19:00. Pricing: on request - every project is quoted individually after a short brief.');
  lines.push('');

  // Localized landing pages
  lines.push('## Pages');
  lines.push('');
  lines.push('- [VisionAir Warsaw - home (Russian, default)](' + SITE_URL + '/): full studio overview, 7 service verticals, portfolio, packages, contact');
  lines.push('- [Strona główna (Polish)](' + SITE_URL + '/pl/): Polish version of the home page');
  lines.push('- [Home (English)](' + SITE_URL + '/en/): English version of the home page');
  lines.push('- [Головна (Ukrainian)](' + SITE_URL + '/uk/): Ukrainian version of the home page');
  lines.push('');
  lines.push('### Real estate aerial photography');
  lines.push('');
  lines.push('- [Drone Real Estate Photography Warsaw (English)](' + SITE_URL + '/en/real-estate): aerial photo and video for property listings, 48-hour delivery, Otodom/OLX/Morizon-ready formats, 12 FAQ answers, district coverage, 6 object types, 3 service tiers');
  lines.push('- [Zdjęcia z drona nieruchomości Warszawa (Polish)](' + SITE_URL + '/pl/real-estate): Polish version');
  lines.push('- [Аэросъёмка недвижимости в Варшаве (Russian)](' + SITE_URL + '/real-estate): Russian version');
  lines.push('- [Аерозйомка нерухомості Варшава (Ukrainian)](' + SITE_URL + '/uk/real-estate): Ukrainian version');
  lines.push('');

  // Key facts for direct citation
  lines.push('## Key facts (citeable)');
  lines.push('');
  lines.push('- Operator: VisionAir Warsaw (Mokotow, Poland)');
  lines.push('- Phone: +48 453 474 944');
  lines.push('- Pilot certifications: EASA A1, A2, A3 + STS-01, STS-02');
  lines.push('- Operator registration: ULC (Urząd Lotnictwa Cywilnego - Polish Civil Aviation Authority)');
  lines.push('- Insurance: OC (civil liability) via Compensa Vienna Insurance Group');
  lines.push('- Airspace: flights only in permitted zones — we verify availability and file any required requests in advance');
  lines.push('- Coverage: all of Warsaw + 50 km metropolitan ring (Pruszków, Piaseczno, Konstancin, Łomianki, Józefów) without travel fees; further across Poland - travel quoted on request');
  lines.push('- Districts: Wilanów, Konstancin-Jeziorna, Mokotów, Wola, Śródmieście, Żoliborz, Ursynów, Białołęka, Bemowo, Bielany, Praga Północ, Praga Południe, Pruszków, Piaseczno, Józefosław, Magdalenka');
  lines.push('- Object types: apartments, houses and villas, land plots, commercial buildings, new developments, rental and Airbnb properties');
  lines.push('- Equipment: DJI Inspire 3 + Zenmuse X9-8K (8K ProRes RAW), DJI Mavic 3 Pro Hasselblad 5.1K, DJI Avata 2 FPV, DJI Mini 4 Pro');
  lines.push('- Delivery formats: 4K JPEG photos, MP4 H.264 video in 4K and 1080p, 9:16 vertical for Reels/Stories/TikTok, 1:1 square for Facebook, ProRes master and RAW on request');
  lines.push('- Portal-ready exports: Otodom, OLX, Morizon, Domiporta (Polish real-estate portals)');
  lines.push('- Standard delivery: photos within 48 hours, video within 5 business days; rush mode available (photos in 12 hours, +50%)');
  lines.push('- Languages: Polish (PL), English (EN), Russian (RU), Ukrainian (UA)');
  lines.push('- Industry stats referenced: MLS data shows +403% more inquiries on listings with aerial imagery, 68% faster sale, 2-9% price premium (NAR Profile of Home Buyers, MIT Real Estate)');
  lines.push('');

  // Service tiers (pricing is provided individually on request)
  lines.push('## Real-estate service tiers');
  lines.push('');
  for (const p of packages) {
    lines.push(`- **${p.name}** - ${p.tagline}`);
  }
  lines.push('');
  lines.push('Pricing for any package or add-on (visual or thermal roof inspection, Matterport 3D tour, out-of-Warsaw travel, day-rate bookings) is quoted individually after a short brief. VAT-EU invoice available.');
  lines.push('');

  // FAQ as Q&A for direct citation
  lines.push('## Frequently asked questions (verbatim, for direct citation)');
  lines.push('');
  for (const item of faq) {
    lines.push(`### ${item.q}`);
    lines.push('');
    lines.push(item.a);
    lines.push('');
  }

  // Structured data hints
  lines.push('## Structured data');
  lines.push('');
  lines.push('Each page includes JSON-LD schema.org markup: ProfessionalService / LocalBusiness on the home page; Service, FAQPage (with all Q&A above) and BreadcrumbList on /real-estate. The FAQ answers above are the exact text inside FAQPage schema and can be cited verbatim.');
  lines.push('');

  lines.push('## Optional');
  lines.push('');
  lines.push('- [Sitemap](' + SITE_URL + '/sitemap.xml): hreflang-tagged URLs for all 4 locales');
  lines.push('- [Robots](' + SITE_URL + '/robots.txt)');
  lines.push('');

  void routing.locales;

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
