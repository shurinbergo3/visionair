// Downloads themed stock photos from Pixabay (Pixabay Content License: free
// for commercial use, no attribution) and saves them as 1600x1000 WebP into
// public/blog/, ready to be referenced as `base` in generate-blog-covers.mjs.
//
// Usage:  PIXABAY_KEY=xxxxx node scripts/fetch-stock.mjs
// Get a free key at https://pixabay.com/api/docs/ (sign in -> key shown on page)
//
// Re-running is safe: it skips files that already exist unless FORCE=1 is set.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'blog');
const KEY = process.env.PIXABAY_KEY;
const FORCE = process.env.FORCE === '1';
const W = 1600;
const H = 1000;

// One fresh photo per article that currently shares a base with another. Each
// entry: target filename (without ext) + Pixabay search query + the photo index
// to pick (0 = top hit; bump if the top hit is weak). Queries are tuned so the
// result fits the article's theme.
const WANTED = [
  { file: 'drone-operator-team', q: 'drone operator filming', i: 0 },
  { file: 'drone-cinematography-dusk', q: 'drone aerial cinematography city', i: 0 },
  { file: 'privacy-documents-law', q: 'privacy law documents signing', i: 0 },
  { file: 'modern-house-aerial', q: 'modern house aerial top view', i: 0 },
  { file: 'drone-regulations', q: 'drone flying regulations sky', i: 0 },
  { file: 'commercial-drone-business', q: 'commercial drone work professional', i: 0 },
  { file: 'luxury-apartment-interior', q: 'luxury apartment interior modern', i: 0 },
  { file: 'building-facade-inspection', q: 'building facade rope access climber', i: 0 },
  { file: 'house-garden-exterior', q: 'house garden exterior tidy', i: 0 },
  { file: 'air-traffic-control', q: 'airport control tower aviation', i: 0 },
  { file: 'wedding-aerial-couple', q: 'wedding couple aerial outdoor', i: 0 },
  { file: 'insurance-signing', q: 'insurance policy contract signing', i: 0 },
  { file: 'film-production-set', q: 'film production crew set', i: 0 },
  { file: 'drone-registration-laptop', q: 'person laptop drone desk', i: 0 },
  { file: 'church-wedding-aerial', q: 'church wedding ceremony aerial', i: 0 },
  { file: 'drone-europe-travel', q: 'drone landscape europe mountains', i: 0 },
];

async function fetchOne({ file, q, i }) {
  const out = path.join(OUT_DIR, `${file}.webp`);
  if (fs.existsSync(out) && !FORCE) {
    console.log(`  · ${file}.webp exists, skipping`);
    return true;
  }
  const url = `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(q)}` +
    `&image_type=photo&orientation=horizontal&min_width=1600&safesearch=true&per_page=20`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`  ✗ ${file}: API ${res.status} (${await res.text().catch(() => '')})`);
    return false;
  }
  const data = await res.json();
  const hit = data.hits?.[i] || data.hits?.[0];
  if (!hit) {
    console.error(`  ✗ ${file}: no results for "${q}"`);
    return false;
  }
  const imgUrl = hit.largeImageURL || hit.webformatURL;
  const imgRes = await fetch(imgUrl);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await sharp(buf)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .webp({ quality: 88, effort: 5 })
    .toFile(out);
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`  ✓ ${file}.webp  (${kb} KB)  via "${q}" by ${hit.user}`);
  return true;
}

async function main() {
  if (!KEY) {
    console.error('PIXABAY_KEY is not set. Get a free key at https://pixabay.com/api/docs/');
    process.exit(1);
  }
  console.log(`Fetching ${WANTED.length} stock photos -> ${OUT_DIR}`);
  let ok = 0;
  for (const item of WANTED) {
    try {
      if (await fetchOne(item)) ok++;
    } catch (err) {
      console.error(`  ✗ ${item.file}: ${err.message}`);
    }
  }
  console.log(`Done. ${ok}/${WANTED.length} photos ready.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
