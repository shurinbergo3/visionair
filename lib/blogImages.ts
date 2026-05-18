// Portfolio image picker for blog hero & inline injection.
// Mapping is hand-curated against the alt-text catalogue in messages/*.json
// so each article category surfaces visually relevant frames.

const PORTFOLIO_BY_CATEGORY: Record<string, number[]> = {
  // Real estate listings: cityscape + premium architecture
  'real-estate': [4, 5, 6, 11, 14, 16, 17, 8, 10, 24],
  // Construction monitoring: business towers + skyline progress
  budownictwo: [4, 5, 14, 16, 17, 18, 1, 2],
  // Thermo / inspections: technical architecture
  inspekcje: [5, 14, 16, 4, 17, 18],
  // Weddings: scenic, golden hour, romantic landscapes
  wesela: [12, 9, 21, 22, 6, 8, 10, 24],
  // Promo / brand: mixed urban premium
  promo: [1, 4, 11, 12, 14, 17, 6, 8],
  // Events: markets, crowds, night
  eventy: [19, 12, 20, 2, 1, 18],
  // FPV / dynamic clips: wide & motion-friendly frames
  'fpv-teledyski': [13, 18, 22, 23, 4, 1],
  // Regulations, taxes, RODO — general aerial portfolio
  general: [1, 6, 8, 11, 17, 4, 12, 10, 24, 14],
};

const FALLBACK = PORTFOLIO_BY_CATEGORY.general;

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function srcFor(n: number): string {
  return `/portfolio/portfolio-${String(n).padStart(2, '0')}.webp`;
}

// Stable pick: same article slug always gets the same hero image,
// but the choice is drawn from the category-curated pool.
export function pickHeroImage(slug: string, category: string): string {
  const pool = PORTFOLIO_BY_CATEGORY[category] ?? FALLBACK;
  const idx = hash(slug) % pool.length;
  return srcFor(pool[idx]);
}

// Returns up to `count` distinct images from the category pool,
// deterministic per slug, different from the hero.
export function pickInlineImages(
  slug: string,
  category: string,
  count: number,
): string[] {
  const pool = PORTFOLIO_BY_CATEGORY[category] ?? FALLBACK;
  const heroIdx = hash(slug) % pool.length;

  // Walk the pool starting at an offset, skip the hero pick.
  const out: number[] = [];
  const start = hash(slug + ':inline') % pool.length;
  for (let i = 0; i < pool.length && out.length < count; i++) {
    const j = (start + i) % pool.length;
    if (j === heroIdx) continue;
    if (out.includes(pool[j])) continue;
    out.push(pool[j]);
  }
  // If the pool was too small, allow repeats from the broader catalogue.
  while (out.length < count) {
    const extra = ((hash(slug + ':extra' + out.length)) % 24) + 1;
    if (!out.includes(extra)) out.push(extra);
  }
  return out.map(srcFor);
}
