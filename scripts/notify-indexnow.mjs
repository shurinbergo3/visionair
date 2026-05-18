#!/usr/bin/env node
// Pings Bing IndexNow with every URL from the build sitemap.
// Runs as `postbuild`. Skips locally and on Vercel preview builds.

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const HOST = 'visionair.biz.pl';
const KEY = process.env.INDEXNOW_KEY;
const VERCEL_ENV = process.env.VERCEL_ENV;

const log = (msg) => console.log(`[indexnow] ${msg}`);

if (VERCEL_ENV !== 'production') {
  log(`skipping (VERCEL_ENV=${VERCEL_ENV ?? 'undefined'})`);
  process.exit(0);
}

if (!KEY) {
  log('skipping: INDEXNOW_KEY env is not set');
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

const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);

if (urls.length === 0) {
  log('skipping: no URLs found in sitemap');
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
