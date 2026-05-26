// Generates branded blog covers: 1600×1000 WebP with brand tint + typography
// over a stock photo base. One cover per (article × locale) so the typography
// on the cover matches the language a visitor picked. 13 articles × 4 locales
// = 52 files, written as public/blog/{slug}.{locale}.webp.
//
// Run:  node scripts/generate-blog-covers.mjs
// Swap a photo by editing the `base` field for that article.
//
// Layout is fixed so generated covers stay safe under common crop ratios:
//   16:10 (BlogCard regular)     – full image visible
//   21:9  (BlogCard featured)    – top/bottom ~157px cropped, badge & brand
//                                  line stay just inside safe band
// The brand strapline never sits below y=830 so 16:8 / 21:9 crops keep it.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'public', 'blog');
const OUT_DIR = path.join(ROOT, 'public', 'blog');

// ---- brand tokens (mirrored from app/globals.css) -------------------------
const INK = '#0A0908';
const INK_2 = '#14110E';
const GOLD = '#C9A961';
const GOLD_BRIGHT = '#E2C57F';
const CREAM = '#F2EFE8';

// ---- typography stacks (mirror Next.js font variables) --------------------
const F_DISPLAY = '"Bricolage Grotesque","Manrope",system-ui,-apple-system,sans-serif';
const F_SERIF = '"Instrument Serif","Cormorant Garamond",Georgia,serif';
const F_MONO = '"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace';
const F_BODY = '"Onest","Manrope",system-ui,-apple-system,sans-serif';

const W = 1600;
const H = 1000;
const LOCALES = ['ru', 'pl', 'en', 'uk'];
const BRAND_LINE = 'VISIONAIR · WARSZAWA';

// ---- per-article config ---------------------------------------------------
// `base` = filename inside public/blog (without extension). `i18n` holds the
// short editorial copy in each supported locale: badge (auto-uppercased),
// line1 (sans heavy), line2 (serif italic), tag (mono-feeling supporting).
const ARTICLES = [
  {
    slug: 'arenda-drona-s-operatorom-warszawa',
    base: 'drone-city-dusk',
    i18n: {
      ru: { badge: 'Аренда', line1: 'Дрон с', line2: 'оператором', tag: 'Warszawa · команды и пакеты' },
      pl: { badge: 'Wynajem', line1: 'Dron z', line2: 'operatorem', tag: 'Warszawa · ekipa i pakiety' },
      en: { badge: 'Hire', line1: 'Drone with', line2: 'operator', tag: 'Warsaw · crews & packages' },
      uk: { badge: 'Оренда', line1: 'Дрон з', line2: 'оператором', tag: 'Warszawa · команди й пакети' },
    },
  },
  {
    slug: 'cena-aerosemki-dronom-warszawa-2026',
    base: 'city-buildings',
    i18n: {
      ru: { badge: 'Прайс', line1: 'Аэросъёмка', line2: 'цены 2026', tag: 'Warszawa · полный калькулятор' },
      pl: { badge: 'Cennik', line1: 'Filmowanie', line2: 'ceny 2026', tag: 'Warszawa · pełny kalkulator' },
      en: { badge: 'Pricing', line1: 'Drone filming', line2: 'prices 2026', tag: 'Warsaw · full calculator' },
      uk: { badge: 'Прайс', line1: 'Аерозйомка', line2: 'ціни 2026', tag: 'Warszawa · повний калькулятор' },
    },
  },
  {
    slug: 'dlaczego-zwykle-zdjecia-zabijaja-cene-domu',
    base: 'luxury-house',
    i18n: {
      ru: { badge: 'Real Estate', line1: 'Дом дороже', line2: 'когда видно сверху', tag: 'Премиум-листинг · недвижимость' },
      pl: { badge: 'Real Estate', line1: 'Dom drożej', line2: 'z lotu ptaka', tag: 'Premium listing · nieruchomości' },
      en: { badge: 'Real Estate', line1: 'Higher price', line2: 'shot from above', tag: 'Premium listing · property' },
      uk: { badge: 'Real Estate', line1: 'Дім дорожче', line2: 'коли видно згори', tag: 'Преміум-лістинг · нерухомість' },
    },
  },
  {
    slug: 'foto-czy-wideo-z-drona-listing-nieruchomosci-warszawa',
    base: 'aerial-houses',
    i18n: {
      ru: { badge: 'Real Estate', line1: 'Фото или видео', line2: 'что продаёт быстрее', tag: 'Листинг · Warszawa' },
      pl: { badge: 'Real Estate', line1: 'Zdjęcia czy wideo', line2: 'co sprzedaje szybciej', tag: 'Listing · Warszawa' },
      en: { badge: 'Real Estate', line1: 'Photos or video', line2: 'which sells faster', tag: 'Listing · Warsaw' },
      uk: { badge: 'Real Estate', line1: 'Фото чи відео', line2: 'що продає швидше', tag: 'Лістинг · Warszawa' },
    },
  },
  {
    slug: 'fpv-dron-warszawa-cinematic-klip',
    base: 'drone-sky',
    i18n: {
      ru: { badge: 'FPV', line1: 'Cinematic FPV', line2: 'когда нужен', tag: 'FPV vs Mavic · Warszawa' },
      pl: { badge: 'FPV', line1: 'Cinematic FPV', line2: 'kiedy warto', tag: 'FPV vs Mavic · Warszawa' },
      en: { badge: 'FPV', line1: 'Cinematic FPV', line2: 'when you need it', tag: 'FPV vs Mavic · Warsaw' },
      uk: { badge: 'FPV', line1: 'Cinematic FPV', line2: 'коли потрібен', tag: 'FPV vs Mavic · Warszawa' },
    },
  },
  {
    slug: 'ile-kosztuje-filmowanie-wesela-dronem-warszawa-2026',
    base: 'wedding-outdoor',
    i18n: {
      ru: { badge: 'Wedding', line1: 'Свадьба', line2: 'с воздуха', tag: 'Warszawa · 2026 · пакеты' },
      pl: { badge: 'Wedding', line1: 'Wesele', line2: 'z powietrza', tag: 'Warszawa · 2026 · pakiety' },
      en: { badge: 'Wedding', line1: 'Wedding', line2: 'from the sky', tag: 'Warsaw · 2026 · packages' },
      uk: { badge: 'Wedding', line1: 'Весілля', line2: 'з повітря', tag: 'Warszawa · 2026 · пакети' },
    },
  },
  {
    slug: 'inspekcja-termowizyjna-fotowoltaiki-dronem-cena-raport-2026',
    base: 'solar-farm',
    i18n: {
      ru: { badge: 'Inspection', line1: 'Термоинспекция', line2: 'фотовольтаики', tag: 'PV · отчёт · 2026' },
      pl: { badge: 'Inspection', line1: 'Termoinspekcja', line2: 'fotowoltaiki', tag: 'PV · raport · 2026' },
      en: { badge: 'Inspection', line1: 'Thermal scan', line2: 'of solar farms', tag: 'PV · report · 2026' },
      uk: { badge: 'Inspection', line1: 'Термоінспекція', line2: 'фотовольтаїки', tag: 'PV · звіт · 2026' },
    },
  },
  {
    slug: 'kak-nanyat-operatora-drona-warszawa',
    base: 'drone-city-dusk',
    i18n: {
      ru: { badge: 'Гид', line1: 'Нанять', line2: 'оператора дрона', tag: 'Чек-лист из 7 пунктов' },
      pl: { badge: 'Poradnik', line1: 'Wynajmij', line2: 'operatora drona', tag: 'Checklista z 7 punktów' },
      en: { badge: 'Guide', line1: 'Hire a', line2: 'drone operator', tag: '7-point checklist' },
      uk: { badge: 'Гід', line1: 'Найняти', line2: 'оператора дрона', tag: 'Чек-лист із 7 пунктів' },
    },
  },
  {
    slug: 'monitoring-budowy-z-drona-co-ukrywaja-wykonawcy',
    base: 'construction-crane',
    i18n: {
      ru: { badge: 'Construction', line1: 'Контроль', line2: 'стройки сверху', tag: 'Что скрывают подрядчики' },
      pl: { badge: 'Construction', line1: 'Kontrola', line2: 'budowy z góry', tag: 'Co ukrywają wykonawcy' },
      en: { badge: 'Construction', line1: 'Site monitoring', line2: 'from above', tag: 'What contractors hide' },
      uk: { badge: 'Construction', line1: 'Контроль', line2: 'будівництва', tag: 'Що приховують підрядники' },
    },
  },
  {
    slug: 'pozwolenia-na-loty-dronem-warszawa-ctr-epwa-2026',
    base: 'drone-sky',
    i18n: {
      ru: { badge: 'Закон', line1: 'Полёты в CTR', line2: 'EPWA Warszawa', tag: 'Разрешения · 2026' },
      pl: { badge: 'Prawo', line1: 'Loty w CTR', line2: 'EPWA Warszawa', tag: 'Pozwolenia · 2026' },
      en: { badge: 'Law', line1: 'Flights in CTR', line2: 'EPWA Warsaw', tag: 'Permissions · 2026' },
      uk: { badge: 'Закон', line1: 'Польоти в CTR', line2: 'EPWA Warszawa', tag: 'Дозволи · 2026' },
    },
  },
  {
    slug: 'rodo-gdpr-zdjecia-z-drona-nieruchomosc',
    base: 'aerial-houses',
    i18n: {
      ru: { badge: 'GDPR', line1: 'RODO и дрон', line2: 'съёмка по закону', tag: 'Недвижимость · события' },
      pl: { badge: 'RODO', line1: 'RODO i dron', line2: 'zgodnie z prawem', tag: 'Nieruchomości · eventy' },
      en: { badge: 'GDPR', line1: 'GDPR & drone', line2: 'shooting by the book', tag: 'Property · events' },
      uk: { badge: 'GDPR', line1: 'RODO та дрон', line2: 'зйомка за законом', tag: 'Нерухомість · події' },
    },
  },
  {
    slug: 'vat-faktura-zdjecia-z-drona-polska',
    base: 'tax-paperwork',
    i18n: {
      ru: { badge: 'B2B', line1: 'VAT и фактура', line2: 'за дрон-съёмку', tag: 'Польша · B2B-гид' },
      pl: { badge: 'B2B', line1: 'VAT i faktura', line2: 'za usługi drona', tag: 'Polska · poradnik B2B' },
      en: { badge: 'B2B', line1: 'VAT & invoice', line2: 'for drone work', tag: 'Poland · B2B guide' },
      uk: { badge: 'B2B', line1: 'VAT і фактура', line2: 'за дрон-послуги', tag: 'Польща · B2B-гід' },
    },
  },
  {
    slug: 'zamowienie-drona-w-europie-licencje-ubezpieczenie-2026',
    base: 'city-buildings',
    i18n: {
      ru: { badge: 'Europe', line1: 'Заказ дрона', line2: 'по всей Европе', tag: 'Лицензии · страховка · 2026' },
      pl: { badge: 'Europe', line1: 'Zamów drona', line2: 'w całej Europie', tag: 'Licencje · ubezpieczenie · 2026' },
      en: { badge: 'Europe', line1: 'Order a drone', line2: 'across Europe', tag: 'Licenses · insurance · 2026' },
      uk: { badge: 'Europe', line1: 'Замовлення дрона', line2: 'по всій Європі', tag: 'Ліцензії · страховка · 2026' },
    },
  },
  {
    slug: 'inspekcja-dachu-dronem-warszawa-cena-raport-2026',
    base: 'roof-aerial-tiles',
    i18n: {
      ru: { badge: 'Inspection', line1: 'Инспекция', line2: 'крыши с дрона', tag: 'Warszawa · цена и отчёт · 2026' },
      pl: { badge: 'Inspekcja', line1: 'Inspekcja', line2: 'dachu z drona', tag: 'Warszawa · cena i raport · 2026' },
      en: { badge: 'Inspection', line1: 'Roof inspection', line2: 'by drone', tag: 'Warsaw · price & report · 2026' },
      uk: { badge: 'Інспекція', line1: 'Інспекція', line2: 'даху з дрона', tag: 'Warszawa · ціна та звіт · 2026' },
    },
  },
  {
    slug: 'mapowanie-3d-fotogrametria-dronem-cena-za-hektar',
    base: 'topographic-mapping',
    i18n: {
      ru: { badge: 'Mapping', line1: '3D-карта', line2: 'фотограмметрия', tag: 'Цена за гектар · ортофото · DTM' },
      pl: { badge: 'Mapping', line1: 'Mapa 3D', line2: 'fotogrametria', tag: 'Cena za hektar · ortofoto · DTM' },
      en: { badge: 'Mapping', line1: '3D mapping', line2: 'by photogrammetry', tag: 'Price per hectare · ortho · DTM' },
      uk: { badge: 'Mapping', line1: '3D-карта', line2: 'фотограмметрія', tag: 'Ціна за гектар · ортофото · DTM' },
    },
  },
  {
    slug: 'aerial-marketing-hotelu-pensjonatu-dron-booking-airbnb',
    base: 'boutique-hotel-pool',
    i18n: {
      ru: { badge: 'Hotel', line1: 'Маркетинг', line2: 'отеля сверху', tag: 'Booking · Airbnb · 2026' },
      pl: { badge: 'Hotel', line1: 'Marketing', line2: 'hotelu z lotu', tag: 'Booking · Airbnb · 2026' },
      en: { badge: 'Hotel', line1: 'Aerial', line2: 'hotel marketing', tag: 'Booking · Airbnb · 2026' },
      uk: { badge: 'Hotel', line1: 'Маркетинг', line2: 'готелю згори', tag: 'Booking · Airbnb · 2026' },
    },
  },
  {
    slug: 'eventy-firmowe-konferencje-festiwale-filmowanie-dronem-warszawa',
    base: 'corporate-event-stage',
    i18n: {
      ru: { badge: 'Eventy', line1: 'Корпоративы', line2: 'и фестивали', tag: 'Warszawa · aftermovie · 2026' },
      pl: { badge: 'Eventy', line1: 'Eventy firmowe', line2: 'i festiwale', tag: 'Warszawa · aftermovie · 2026' },
      en: { badge: 'Events', line1: 'Corporate', line2: 'events & festivals', tag: 'Warsaw · aftermovie · 2026' },
      uk: { badge: 'Eventy', line1: 'Корпоративи', line2: 'та фестивалі', tag: 'Warszawa · aftermovie · 2026' },
    },
  },
  {
    slug: 'komercyjne-nieruchomosci-magazyny-biurowce-aerosurvey-warszawa',
    base: 'warehouse-logistics-aerial',
    i18n: {
      ru: { badge: 'CRE', line1: 'Склады и', line2: 'бизнес-центры', tag: 'Aerial для CRE · Warszawa' },
      pl: { badge: 'CRE', line1: 'Magazyny', line2: 'i biurowce', tag: 'Aerosurvey dla CRE · Warszawa' },
      en: { badge: 'CRE', line1: 'Warehouses', line2: 'and office towers', tag: 'Aerial for CRE · Warsaw' },
      uk: { badge: 'CRE', line1: 'Склади і', line2: 'бізнес-центри', tag: 'Aerial для CRE · Warszawa' },
    },
  },
  {
    slug: 'certyfikat-operatora-drona-a1-a2-a3-polska-2026-jak-zdobyc',
    base: 'drone-pilot-controller',
    i18n: {
      ru: { badge: 'EASA', line1: 'Сертификат', line2: 'оператора дрона', tag: 'A1 · A2 · A3 · Polska · 2026' },
      pl: { badge: 'EASA', line1: 'Certyfikat', line2: 'operatora drona', tag: 'A1 · A2 · A3 · Polska · 2026' },
      en: { badge: 'EASA', line1: 'Drone operator', line2: 'certificate', tag: 'A1 · A2 · A3 · Poland · 2026' },
      uk: { badge: 'EASA', line1: 'Сертифікат', line2: 'оператора дрона', tag: 'A1 · A2 · A3 · Polska · 2026' },
    },
  },
  {
    slug: 'najlepsze-drony-2026-mavic-4-inspire-3-air-3s-porownanie',
    base: 'dji-drone-product',
    i18n: {
      ru: { badge: 'Tech', line1: 'Лучшие дроны', line2: '2026 года', tag: 'Mavic 4 · Inspire 3 · Air 3S' },
      pl: { badge: 'Tech', line1: 'Najlepsze drony', line2: 'roku 2026', tag: 'Mavic 4 · Inspire 3 · Air 3S' },
      en: { badge: 'Tech', line1: 'Best drones', line2: 'of 2026', tag: 'Mavic 4 · Inspire 3 · Air 3S' },
      uk: { badge: 'Tech', line1: 'Найкращі дрони', line2: '2026 року', tag: 'Mavic 4 · Inspire 3 · Air 3S' },
    },
  },
  {
    slug: 'dron-reels-instagram-tiktok-format-9-16-nieruchomosci-eventy',
    base: 'vertical-phone-content',
    i18n: {
      ru: { badge: 'Social', line1: 'Reels и TikTok', line2: 'формат 9:16', tag: 'Нерухомість · события · дрон' },
      pl: { badge: 'Social', line1: 'Reels i TikTok', line2: 'format 9:16', tag: 'Nieruchomości · eventy · dron' },
      en: { badge: 'Social', line1: 'Reels & TikTok', line2: 'in 9:16 format', tag: 'Property · events · drone' },
      uk: { badge: 'Social', line1: 'Reels і TikTok', line2: 'формат 9:16', tag: 'Нерухомість · події · дрон' },
    },
  },
  {
    slug: 'inwentaryzacja-stokow-hald-kopalni-dronem-lidar-fotogrametria',
    base: 'gravel-quarry-pile',
    i18n: {
      ru: { badge: 'Survey', line1: 'Инвентаризация', line2: 'отвалов и куч', tag: 'LiDAR · фотограмметрия · объём' },
      pl: { badge: 'Survey', line1: 'Inwentaryzacja', line2: 'hałd i stoków', tag: 'LiDAR · fotogrametria · objętość' },
      en: { badge: 'Survey', line1: 'Stockpile', line2: 'volume survey', tag: 'LiDAR · photogrammetry · volume' },
      uk: { badge: 'Survey', line1: 'Інвентаризація', line2: 'відвалів і куп', tag: 'LiDAR · фотограмметрія · обʼєм' },
    },
  },
  {
    slug: 'aerial-wedding-polska-top-12-lokalizacji-do-dronowych-kadrow',
    base: 'palace-wedding-aerial',
    i18n: {
      ru: { badge: 'Wedding', line1: 'Топ-12 локаций', line2: 'свадьба с дрона', tag: 'Дворцы · парки · Polska' },
      pl: { badge: 'Wedding', line1: 'Top 12 miejsc', line2: 'wesele z drona', tag: 'Pałace · plenery · Polska' },
      en: { badge: 'Wedding', line1: 'Top 12 venues', line2: 'aerial wedding', tag: 'Palaces · parks · Poland' },
      uk: { badge: 'Wedding', line1: 'Топ-12 локацій', line2: 'весілля з дрона', tag: 'Палаци · парки · Polska' },
    },
  },
  {
    slug: 'night-drone-filming-warszawa-cinematyczne-ujecia-nocne-miasta',
    base: 'warsaw-skyline-night',
    i18n: {
      ru: { badge: 'Night', line1: 'Ночная съёмка', line2: 'дроном в городе', tag: 'Warszawa · cinematic · 2026' },
      pl: { badge: 'Night', line1: 'Nocne ujęcia', line2: 'dronem nad miastem', tag: 'Warszawa · cinematic · 2026' },
      en: { badge: 'Night', line1: 'Night drone', line2: 'over the city', tag: 'Warsaw · cinematic · 2026' },
      uk: { badge: 'Night', line1: 'Нічна зйомка', line2: 'дроном над містом', tag: 'Warszawa · cinematic · 2026' },
    },
  },
  {
    slug: 'audyt-elewacji-wiezowca-dronem-termowizja-fasada-warszawa',
    base: 'glass-facade-skyscraper',
    i18n: {
      ru: { badge: 'Facade', line1: 'Аудит фасада', line2: 'небоскрёба', tag: 'Термовизия · Warszawa · 2026' },
      pl: { badge: 'Facade', line1: 'Audyt elewacji', line2: 'wieżowca', tag: 'Termowizja · Warszawa · 2026' },
      en: { badge: 'Facade', line1: 'High-rise', line2: 'facade audit', tag: 'Thermal · Warsaw · 2026' },
      uk: { badge: 'Facade', line1: 'Аудит фасаду', line2: 'хмарочоса', tag: 'Термовізія · Warszawa · 2026' },
    },
  },
];

// ---- XML escape -----------------------------------------------------------
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ---- SVG overlay #1: smoky brand tint -------------------------------------
function buildTintSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="leftWash" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="${INK}" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="${INK}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0.30"/>
    </linearGradient>
    <linearGradient id="bottomVignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${INK}" stop-opacity="0"/>
      <stop offset="70%" stop-color="${INK_2}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0.72"/>
    </linearGradient>
    <radialGradient id="goldGlow" cx="0.88" cy="0.18" r="0.55">
      <stop offset="0%"  stop-color="${GOLD}" stop-opacity="0.32"/>
      <stop offset="55%" stop-color="${GOLD}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#leftWash)"/>
  <rect width="${W}" height="${H}" fill="url(#bottomVignette)"/>
  <rect width="${W}" height="${H}" fill="url(#goldGlow)"/>
</svg>`;
}

// ---- SVG overlay #2: typography ------------------------------------------
function buildTextSvg({ badge, line1, line2, tag }) {
  const badgeText = badge.toUpperCase();
  const badgeW = Math.max(180, badgeText.length * 17 + 56);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <g>
    <rect x="110" y="140" rx="29" ry="29" width="${badgeW}" height="58"
          fill="rgba(10,9,8,0.55)" stroke="${GOLD}" stroke-opacity="0.65" stroke-width="1.4"/>
    <text x="${110 + badgeW / 2}" y="178" text-anchor="middle"
          font-family='${F_MONO}' font-size="22" font-weight="500"
          letter-spacing="5" fill="${GOLD}">${esc(badgeText)}</text>

    <text x="110" y="430"
          font-family='${F_DISPLAY}' font-size="128" font-weight="800"
          letter-spacing="-4" fill="${CREAM}">${esc(line1)}</text>

    <text x="110" y="570"
          font-family='${F_SERIF}' font-size="114" font-style="italic"
          font-weight="500" fill="${GOLD_BRIGHT}">${esc(line2)}</text>

    <rect x="110" y="640" width="120" height="5" fill="${GOLD}"/>

    <text x="110" y="705"
          font-family='${F_BODY}' font-size="30" font-weight="400"
          fill="rgba(242,239,232,0.82)">${esc(tag)}</text>

    <text x="110" y="830"
          font-family='${F_MONO}' font-size="20" font-weight="500"
          letter-spacing="7" fill="rgba(201,169,97,0.85)">${esc(BRAND_LINE)}</text>
  </g>
</svg>`;
}

// ---- generate one cover ---------------------------------------------------
async function buildCover(article, locale, copy) {
  const sourcePath = path.join(SOURCE_DIR, `${article.base}.webp`);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Base photo missing: ${sourcePath}`);
  }

  const tintSvg = Buffer.from(buildTintSvg());
  const textSvg = Buffer.from(buildTextSvg(copy));
  const outPath = path.join(OUT_DIR, `${article.slug}.${locale}.webp`);

  await sharp(sourcePath)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.85, brightness: 0.85 })
    .composite([
      { input: tintSvg, top: 0, left: 0 },
      { input: textSvg, top: 0, left: 0 },
    ])
    .webp({ quality: 86, effort: 5 })
    .toFile(outPath);

  return outPath;
}

// ---- main -----------------------------------------------------------------
async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const total = ARTICLES.length * LOCALES.length;
  console.log(`Generating ${total} branded covers (${ARTICLES.length} articles × ${LOCALES.length} locales) → ${OUT_DIR}`);

  let ok = 0;
  for (const article of ARTICLES) {
    for (const locale of LOCALES) {
      const copy = article.i18n[locale];
      if (!copy) {
        console.error(`  ✗ ${article.slug}.${locale}: missing i18n entry`);
        continue;
      }
      try {
        const out = await buildCover(article, locale, copy);
        const stat = fs.statSync(out);
        console.log(`  ✓ ${article.slug}.${locale}.webp  (${(stat.size / 1024).toFixed(1)} KB)`);
        ok++;
      } catch (err) {
        console.error(`  ✗ ${article.slug}.${locale}: ${err.message}`);
      }
    }
  }
  console.log(`Done. ${ok}/${total} covers written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
