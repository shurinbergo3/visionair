#!/usr/bin/env node
// Pings Bing IndexNow only with URLs whose <lastmod> falls inside a recent
// window. Re-pinging the full sitemap on every deploy is treated as noise by
// Bing and reduces IndexNow effectiveness. Runs as `postbuild`. Skips
// locally and on Vercel preview builds.

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const HOST = 'visionair.biz.pl';
const KEY = process.env.INDEXNOW_KEY;
const VERCEL_ENV = process.env.VERCEL_ENV;
const WINDOW_HOURS = Number(process.env.INDEXNOW_LASTMOD_WINDOW_HOURS ?? 48);

const log = (msg) => console.log(`[indexnow] ${msg}`);

if (VERCEL_ENV !== 'production') {
  log(`skipping (VERCEL_ENV=${VERCEL_ENV ?? 'undefined'})`);
  process.exit(0);
}

if (!KEY) {
  log('skipping: INDEXNOW_KEY env is not set');
  process.exit(0);
}

if (!Number.isFinite(WINDOW_HOURS) || WINDOW_HOURS <= 0) {
  log(`skipping: invalid INDEXNOW_LASTMOD_WINDOW_HOURS=${process.env.INDEXNOW_LASTMOD_WINDOW_HOURS}`);
  process.exit(0);
}

const sitemapPath = resolve(process.cwd(), '.next/server/app/sitemap.xml.body');

let xml;
try {
  xml = await readFile(sitemapPath, 'utf8');
} catch (err) {
  log(`skipping: cannot read sitemap (${err.message})`);
  process.exit(0);
}

// Parse <url>…</url> blocks so each <loc> stays paired with its <lastmod>.
const cutoff = Date.now() - WINDOW_HOURS * 60 * 60 * 1000;
const urls = [];
let stale = 0;
let missingLastmod = 0;

for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const body = block[1];
  const locMatch = body.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) continue;

  const lastmodMatch = body.match(/<lastmod>([^<]+)<\/lastmod>/);
  const lastmod = lastmodMatch ? Date.parse(lastmodMatch[1]) : NaN;
  if (!Number.isFinite(lastmod)) {
    missingLastmod++;
    continue;
  }

  if (lastmod < cutoff) {
    stale++;
    continue;
  }

  urls.push(locMatch[1]);
}

log(`window=${WINDOW_HOURS}h fresh=${urls.length} stale=${stale} no-lastmod=${missingLastmod}`);

if (urls.length === 0) {
  log('nothing to submit — no URLs within window');
  process.exit(0);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
};

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    log(`Accepted (${res.status}) — ${urls.length} URL(s) sent`);
  } else {
    const body = await res.text().catch(() => '');
    log(`HTTP ${res.status} — ${body.slice(0, 200)}`);
  }
} catch (err) {
  log(`fetch failed: ${err.message}`);
}

process.exit(0);
