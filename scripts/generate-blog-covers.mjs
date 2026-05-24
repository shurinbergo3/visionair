// Generates branded blog covers: 1600×1000 WebP with brand tint + typography
// over a stock photo base. Output goes to public/blog/{slug}.webp.
//
// Run:  node scripts/generate-blog-covers.mjs
// Add --base=<file> on a per-article entry below to swap photos.
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

// ---- per-article config ---------------------------------------------------
// `base` = filename inside public/blog (without extension). Swap to point at a
// different stock photo. `badge` is uppercased in the SVG; line1/line2/tag/brand
// are rendered as-is.
const ARTICLES = [
  {
    slug: 'arenda-drona-s-operatorom-warszawa',
    base: 'drone-city-dusk',
    badge: 'Аренда',
    line1: 'Дрон с',
    line2: 'оператором',
    tag: 'Warszawa · команды и пакеты',
  },
  {
    slug: 'cena-aerosemki-dronom-warszawa-2026',
    base: 'city-buildings',
    badge: 'Прайс',
    line1: 'Аэросъёмка',
    line2: 'цены 2026',
    tag: 'Warszawa · полный калькулятор',
  },
  {
    slug: 'dlaczego-zwykle-zdjecia-zabijaja-cene-domu',
    base: 'luxury-house',
    badge: 'Real Estate',
    line1: 'Дом дороже',
    line2: 'когда видно сверху',
    tag: 'Премиум-листинг · недвижимость',
  },
  {
    slug: 'foto-czy-wideo-z-drona-listing-nieruchomosci-warszawa',
    base: 'aerial-houses',
    badge: 'Real Estate',
    line1: 'Фото или видео',
    line2: 'что продаёт быстрее',
    tag: 'Листинг · Warszawa',
  },
  {
    slug: 'fpv-dron-warszawa-cinematic-klip',
    base: 'drone-sky',
    badge: 'FPV',
    line1: 'Cinematic FPV',
    line2: 'когда нужен',
    tag: 'FPV vs Mavic · Warszawa',
  },
  {
    slug: 'ile-kosztuje-filmowanie-wesela-dronem-warszawa-2026',
    base: 'wedding-outdoor',
    badge: 'Wedding',
    line1: 'Свадьба',
    line2: 'с воздуха',
    tag: 'Warszawa · 2026 · пакеты',
  },
  {
    slug: 'inspekcja-termowizyjna-fotowoltaiki-dronem-cena-raport-2026',
    base: 'solar-farm',
    badge: 'Inspection',
    line1: 'Термоинспекция',
    line2: 'фотовольтаики',
    tag: 'PV · отчёт · 2026',
  },
  {
    slug: 'kak-nanyat-operatora-drona-warszawa',
    base: 'drone-city-dusk',
    badge: 'Гид',
    line1: 'Нанять',
    line2: 'оператора дрона',
    tag: 'Чек-лист из 7 пунктов',
  },
  {
    slug: 'monitoring-budowy-z-drona-co-ukrywaja-wykonawcy',
    base: 'construction-crane',
    badge: 'Construction',
    line1: 'Контроль',
    line2: 'стройки сверху',
    tag: 'Что скрывают подрядчики',
  },
  {
    slug: 'pozwolenia-na-loty-dronem-warszawa-ctr-epwa-2026',
    base: 'drone-sky',
    badge: 'Закон',
    line1: 'Полёты в CTR',
    line2: 'EPWA Warszawa',
    tag: 'Разрешения · 2026',
  },
  {
    slug: 'rodo-gdpr-zdjecia-z-drona-nieruchomosc',
    base: 'aerial-houses',
    badge: 'GDPR',
    line1: 'RODO и дрон',
    line2: 'съёмка по закону',
    tag: 'Недвижимость · события',
  },
  {
    slug: 'vat-faktura-zdjecia-z-drona-polska',
    base: 'tax-paperwork',
    badge: 'B2B',
    line1: 'VAT и фактура',
    line2: 'за дрон-съёмку',
    tag: 'Польша · B2B-гид',
  },
  {
    slug: 'zamowienie-drona-w-europie-licencje-ubezpieczenie-2026',
    base: 'city-buildings',
    badge: 'Europe',
    line1: 'Заказ дрона',
    line2: 'по всей Европе',
    tag: 'Лицензии · страховка · 2026',
  },
];

const BRAND_LINE = 'VISIONAIR · WARSZAWA';

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
// Three layers stacked:
//  • horizontal charcoal wash from left (where text lives) fading right
//  • bottom vignette to seat the brand line on dark
//  • soft gold glow in top-right to introduce warmth & brand colour
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
// Coordinates are intentional and stable. See top-of-file comment for safe
// crop band reasoning.
function buildTextSvg({ badge, line1, line2, tag }) {
  const badgeText = badge.toUpperCase();
  // Approx badge pill width: 22px padding + ~9px per char (mono-ish)
  const badgeW = Math.max(140, badgeText.length * 13 + 44);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <g>
    <!-- category pill -->
    <rect x="110" y="150" rx="23" ry="23" width="${badgeW}" height="46"
          fill="rgba(10,9,8,0.55)" stroke="${GOLD}" stroke-opacity="0.65" stroke-width="1.2"/>
    <text x="${110 + badgeW / 2}" y="181" text-anchor="middle"
          font-family='${F_MONO}' font-size="16" font-weight="500"
          letter-spacing="4" fill="${GOLD}">${esc(badgeText)}</text>

    <!-- title line 1 (sans, heavy) -->
    <text x="110" y="450"
          font-family='${F_DISPLAY}' font-size="92" font-weight="800"
          letter-spacing="-3" fill="${CREAM}">${esc(line1)}</text>

    <!-- title line 2 (serif italic) -->
    <text x="110" y="565"
          font-family='${F_SERIF}' font-size="84" font-style="italic"
          font-weight="500" fill="${GOLD_BRIGHT}">${esc(line2)}</text>

    <!-- gold underline bar -->
    <rect x="110" y="625" width="92" height="4" fill="${GOLD}"/>

    <!-- supporting tag -->
    <text x="110" y="685"
          font-family='${F_BODY}' font-size="22" font-weight="400"
          fill="rgba(242,239,232,0.78)">${esc(tag)}</text>

    <!-- brand strapline (anchored above y=830 to survive 21:9 / 16:8 crops) -->
    <text x="110" y="830"
          font-family='${F_MONO}' font-size="14" font-weight="500"
          letter-spacing="6" fill="rgba(201,169,97,0.85)">${esc(BRAND_LINE)}</text>
  </g>
</svg>`;
}

// ---- generate one cover ---------------------------------------------------
async function buildCover(article) {
  const sourcePath = path.join(SOURCE_DIR, `${article.base}.webp`);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Base photo missing: ${sourcePath}`);
  }

  const tintSvg = Buffer.from(buildTintSvg());
  const textSvg = Buffer.from(buildTextSvg(article));

  const outPath = path.join(OUT_DIR, `${article.slug}.webp`);

  // 1. resize+crop base photo, 2. mute it, 3. composite tint + text
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

  console.log(`Generating ${ARTICLES.length} branded covers → ${OUT_DIR}`);
  let ok = 0;
  for (const article of ARTICLES) {
    try {
      const out = await buildCover(article);
      const stat = fs.statSync(out);
      console.log(`  ✓ ${article.slug}.webp  (${(stat.size / 1024).toFixed(1)} KB)`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${article.slug}: ${err.message}`);
    }
  }
  console.log(`Done. ${ok}/${ARTICLES.length} covers written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
