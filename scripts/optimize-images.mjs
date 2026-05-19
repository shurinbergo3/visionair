#!/usr/bin/env node
/**
 * Re-encode site imagery into smaller modern formats. Idempotent: each output
 * is only re-generated if the source is newer than the existing target.
 *
 *   node scripts/optimize-images.mjs           # run all groups
 *   node scripts/optimize-images.mjs hero      # subset (hero|cards|portfolio)
 *
 * Outputs:
 *   - /video/<name>-poster.jpg  → adds .webp + .avif (≤1600w)
 *   - /assets/*-card.jpg        → adds .webp (≤1200w)
 *   - /portfolio/portfolio-XX.webp → adds @mobile.webp (≤960w) next to original
 */
import { readdir, stat, mkdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { extname, basename, dirname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = join(ROOT, 'public');

const log = (...a) => console.log('[opt]', ...a);

async function needsRebuild(src, dst) {
  if (!existsSync(dst)) return true;
  const [s, d] = await Promise.all([stat(src), stat(dst)]);
  return s.mtimeMs > d.mtimeMs;
}

async function encode({ src, dst, transform, label }) {
  if (!(await needsRebuild(src, dst))) {
    log(`skip ${label}: up to date`);
    return;
  }
  await mkdir(dirname(dst), { recursive: true });
  await transform(sharp(src)).toFile(dst);
  const before = statSync(src).size;
  const after = statSync(dst).size;
  const pct = ((1 - after / before) * 100).toFixed(0);
  log(`wrote ${label}  ${(before / 1024).toFixed(0)}→${(after / 1024).toFixed(0)} KiB  (-${pct}%)`);
}

async function processHeroPosters() {
  const dir = join(PUBLIC, 'video');
  const files = await readdir(dir);
  const posters = files.filter((f) => f.endsWith('-poster.jpg'));
  for (const f of posters) {
    const src = join(dir, f);
    const name = basename(f, '.jpg');
    await encode({
      src,
      dst: join(dir, `${name}.webp`),
      label: `${name}.webp`,
      transform: (s) =>
        s.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }),
    });
    await encode({
      src,
      dst: join(dir, `${name}.avif`),
      label: `${name}.avif`,
      transform: (s) =>
        s.resize({ width: 1600, withoutEnlargement: true }).avif({ quality: 50, effort: 5 }),
    });
  }
}

async function processCards() {
  const dir = join(PUBLIC, 'assets');
  const files = await readdir(dir);
  const cards = files.filter((f) => /-card\.(jpg|jpeg)$/i.test(f));
  for (const f of cards) {
    const src = join(dir, f);
    const ext = extname(f);
    const name = basename(f, ext);
    await encode({
      src,
      dst: join(dir, `${name}.webp`),
      label: `${name}.webp`,
      transform: (s) =>
        s.resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 75, effort: 5 }),
    });
  }
}

async function processPortfolio() {
  const dir = join(PUBLIC, 'portfolio');
  const files = await readdir(dir);
  const originals = files.filter((f) => /^portfolio-\d+\.webp$/.test(f));
  for (const f of originals) {
    const src = join(dir, f);
    const name = basename(f, '.webp');
    await encode({
      src,
      dst: join(dir, `${name}@mobile.webp`),
      label: `${name}@mobile.webp`,
      transform: (s) =>
        s.resize({ width: 960, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }),
    });
    await encode({
      src,
      dst: join(dir, `${name}@desktop.webp`),
      label: `${name}@desktop.webp`,
      transform: (s) =>
        s.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 76, effort: 5 }),
    });
  }
}

const groups = {
  hero: processHeroPosters,
  cards: processCards,
  portfolio: processPortfolio,
};

const arg = process.argv[2];
const run = arg ? [arg] : Object.keys(groups);
for (const name of run) {
  const fn = groups[name];
  if (!fn) {
    console.error(`unknown group "${name}". options: ${Object.keys(groups).join(', ')}`);
    process.exit(1);
  }
  log(`group: ${name}`);
  await fn();
}
log('done');
