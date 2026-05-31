<div align="center">

<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/og.jpg" />
  <img alt="VisionAir — Aerial Cinema" src="public/og.jpg" width="100%" />
</picture>

<br />
<br />

<h1>
  ✦&nbsp;&nbsp;V I S I O N&nbsp;&nbsp;A I R&nbsp;&nbsp;✦
</h1>

<p>
  <strong>Aerial Cinema · Warsaw · Worldwide</strong>
</p>

<p>
  <em>4K Cinematic&nbsp;·&nbsp;EASA&nbsp;Licensed&nbsp;·&nbsp;DJI&nbsp;Mini&nbsp;4&nbsp;Pro&nbsp;·&nbsp;Avata&nbsp;2&nbsp;FPV</em>
</p>

<br />

<p>
  <a href="https://visionair.pl">
    <img src="https://img.shields.io/badge/Live-visionair.pl-000000?style=for-the-badge&logoColor=white" alt="Live site" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-000?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Dokploy-Self--hosted-7c3aed?style=for-the-badge&logo=docker&logoColor=white" alt="Dokploy" />
</p>

<p>
  <img src="https://img.shields.io/badge/i18n-EN%20·%20PL%20·%20RU%20·%20UK-0ea5e9?style=flat-square" alt="i18n" />
  <img src="https://img.shields.io/badge/SEO-Schema.org%20%2B%20Sitemap-22c55e?style=flat-square" alt="SEO" />
  <img src="https://img.shields.io/badge/Leads-Telegram%20Bot-26A5E4?style=flat-square&logo=telegram&logoColor=white" alt="Telegram leads" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions%20→%20Dokploy-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="CI/CD" />
</p>

<br />

<samp>
─────────────────────────  cinematic aerial production studio  ─────────────────────────
</samp>

<br />
<br />

</div>

> **VisionAir** is the production codebase behind a premium aerial cinematography studio operating
> out of Warsaw. The site is a fully internationalised Next.js 15 application — four languages,
> seven service verticals, sub-second LCP, and a lead pipeline that pages the operator on Telegram
> the moment a brief lands.

<br />

## ✦ &nbsp; The Studio

<table>
<tr>
<td width="50%" valign="top">

**What we shoot.** Real estate towers from a perfect 80m orbit. Construction progress every
fortnight, mapped to the same waypoints. Weddings in golden hour. Sub-180g FPV dives through
warehouses, factories, and ballrooms — the kind of shot a Cineflex rig can't reach.

</td>
<td width="50%" valign="top">

**How we fly.** ULC-registered operator, EASA A1/A3 Open Category, Compensa VIG third-party
insurance, and zero flights in restricted airspace. Every project gets airspace clearance,
a flight plan, and raw 4K delivery within 72 hours of wheels-up.

</td>
</tr>
</table>

<br />

## ✦ &nbsp; Tech Stack

<table>
<tr>
  <th align="left" width="22%">Layer</th>
  <th align="left">Choice</th>
  <th align="left">Why</th>
</tr>
<tr>
  <td><sub>Framework</sub></td>
  <td><strong>Next.js 15 · App Router</strong></td>
  <td><sub>RSC, streaming, edge-rendered locale routing</sub></td>
</tr>
<tr>
  <td><sub>Runtime</sub></td>
  <td><strong>React 19</strong></td>
  <td><sub>Actions, async transitions, native form primitives</sub></td>
</tr>
<tr>
  <td><sub>Language</sub></td>
  <td><strong>TypeScript 5.7</strong></td>
  <td><sub>End-to-end types, including i18n message keys</sub></td>
</tr>
<tr>
  <td><sub>i18n</sub></td>
  <td><strong>next-intl 3</strong></td>
  <td><sub>Locale-prefixed routes, ICU messages, RSC-safe</sub></td>
</tr>
<tr>
  <td><sub>Lead store</sub></td>
  <td><strong>JSON on a Docker volume</strong></td>
  <td><sub>Persisted at <code>/app/data</code>; survives redeploys (single instance)</sub></td>
</tr>
<tr>
  <td><sub>Lead pipeline</sub></td>
  <td><strong>Telegram Bot API</strong></td>
  <td><sub>Operator receives the brief on their phone in &lt;2s</sub></td>
</tr>
<tr>
  <td><sub>Hosting</sub></td>
  <td><strong>Dokploy (self-hosted)</strong></td>
  <td><sub>Docker image behind Traefik, Let's Encrypt SSL</sub></td>
</tr>
<tr>
  <td><sub>CI/CD</sub></td>
  <td><strong>GitHub Actions → GHCR</strong></td>
  <td><sub>Build standalone image · push · webhook-deploy to Dokploy</sub></td>
</tr>
<tr>
  <td><sub>SEO</sub></td>
  <td><strong>Schema.org · IndexNow · Sitemap</strong></td>
  <td><sub>Auto-ping search engines on every build</sub></td>
</tr>
</table>

<br />

## ✦ &nbsp; Service Verticals

<table>
<tr>
  <td align="center" width="25%">
    <br />
    <strong>Real&nbsp;Estate</strong>
    <br /><sub>Listings · Towers · Estates</sub>
    <br />
  </td>
  <td align="center" width="25%">
    <br />
    <strong>Construction</strong>
    <br /><sub>Progress · Inspections · BIM</sub>
    <br />
  </td>
  <td align="center" width="25%">
    <br />
    <strong>Weddings</strong>
    <br /><sub>Ceremony · Reception · Golden hour</sub>
    <br />
  </td>
  <td align="center" width="25%">
    <br />
    <strong>Events</strong>
    <br /><sub>Concerts · Festivals · Brand</sub>
    <br />
  </td>
</tr>
<tr>
  <td align="center">
    <br />
    <strong>FPV&nbsp;Teledyski</strong>
    <br /><sub>Cinematic dives · Sub-180g</sub>
    <br />
  </td>
  <td align="center">
    <br />
    <strong>Inspections</strong>
    <br /><sub>Rooftops · Thermal · Solar</sub>
    <br />
  </td>
  <td align="center">
    <br />
    <strong>Promo</strong>
    <br /><sub>Ads · Reels · Hospitality</sub>
    <br />
  </td>
  <td align="center">
    <br />
    <strong>Editorial</strong>
    <br /><sub>Blog · Cases · SEO content</sub>
    <br />
  </td>
</tr>
</table>

<br />

## ✦ &nbsp; Project Anatomy

```
visionair/
│
├─ app/
│  ├─ [locale]/                  ── locale-aware route group (en · pl · ru · uk)
│  │  ├─ page.tsx                 — landing
│  │  ├─ real-estate/             — vertical landing pages
│  │  ├─ budownictwo/             ▸ construction
│  │  ├─ wesela/                  ▸ weddings
│  │  ├─ eventy/                  ▸ events
│  │  ├─ fpv-teledyski/           ▸ FPV
│  │  ├─ inspekcje-techniczne/    ▸ inspections
│  │  ├─ promo/                   ▸ promo / ads
│  │  └─ blog/                    — editorial system (MDX-style)
│  ├─ api/                        — lead intake · revalidation hooks
│  ├─ sitemap.ts                  — dynamic, locale-aware
│  └─ robots.ts
│
├─ components/                    — 33 view components, hero-per-vertical pattern
├─ lib/                           — blog, leads, telegram, store, hero videos
├─ i18n/                          — routing · request · navigation helpers
├─ messages/                      — en.json · pl.json · ru.json · uk.json
├─ content/                       — long-form articles
├─ public/                        — portfolio media, OG cards, favicons
└─ scripts/                       — IndexNow ping · Telegram setup
```

<br />

## ✦ &nbsp; Getting Started

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env.local
#  └─ TELEGRAM_BOT_TOKEN, TELEGRAM_MAIN_ADMIN_ID, TELEGRAM_WEBHOOK_SECRET, INDEXNOW_KEY

# 3. Develop
npm run dev          # → http://localhost:3000

# 4. Type-check & build
npm run typecheck
npm run build        # postbuild pings IndexNow in CI only (INDEXNOW_ENABLE=1)
```

<br />

## ✦ &nbsp; Internationalisation

The whole surface area — routes, metadata, JSON-LD, OG cards, sitemap — is locale-aware.

```
/en/real-estate       →  English      ·  default canonical
/pl/real-estate       →  Polish       ·  primary market
/ru/real-estate       →  Russian
/uk/real-estate       →  Ukrainian
```

Messages live in [`messages/`](messages/). Every key is type-checked against [`messages/en.json`](messages/en.json) — adding a string in EN without translating it to PL/RU/UK will fail the build.

<br />

## ✦ &nbsp; The Lead Pipeline

```
   ┌──────────────┐     ┌───────────────┐     ┌──────────────┐     ┌────────────┐
   │  Contact     │ ──► │ /api/contact  │ ──► │  JSON store  │ ──► │  Telegram  │
   │  form        │     │  node route   │     │  on volume   │     │  operator  │
   └──────────────┘     └───────────────┘     └──────────────┘     └────────────┘
        client               node.js            /app/data            &lt; 2s
```

Every brief is archived to the JSON store on a persistent volume and pushed to the
operator's Telegram in real time — they get it on their phone before the user closes the tab.

<br />

## ✦ &nbsp; Performance & SEO

<table>
<tr>
  <td width="33%" align="center">
    <br /><strong>Sub-1s LCP</strong><br />
    <sub>Hero video is deferred,<br />poster is AVIF,<br />fonts are preconnected</sub>
    <br /><br />
  </td>
  <td width="33%" align="center">
    <br /><strong>Zero CLS</strong><br />
    <sub>Every media element has<br />intrinsic aspect-ratio reserved<br />before paint</sub>
    <br /><br />
  </td>
  <td width="33%" align="center">
    <br /><strong>Indexed in hours</strong><br />
    <sub>IndexNow ping on every<br />production build to Bing, Yandex,<br />Seznam, Naver</sub>
    <br /><br />
  </td>
</tr>
</table>

<br />

## ✦ &nbsp; Scripts

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Local development server with hot reload |
| `npm run build` | Production build · pings IndexNow in CI (`INDEXNOW_ENABLE=1`) |
| `npm run start` | Serve the production build |
| `npm run lint` | Next.js + ESLint pass |
| `npm run typecheck` | Strict `tsc --noEmit` |
| `npm run telegram:setup` | Provision the Telegram bot webhook for lead intake |

<br />

## ✦ &nbsp; Licence & Contact

<table>
<tr>
<td valign="top">

This codebase is the property of **VisionAir Studio**.
The code is published for portfolio and reference purposes — please don't redeploy a clone
of the marketing site. Components, patterns, and ideas are free to learn from.

</td>
<td valign="top" align="right">

📍 &nbsp; Warsaw, PL
🌐 &nbsp; [visionair.pl](https://visionair.pl)
✉️ &nbsp; via the site contact form
🎬 &nbsp; EASA A1/A3 · ULC · Compensa VIG

</td>
</tr>
</table>

<br />

<div align="center">

<sub>built with React 19, Next.js 15, and roughly 450 hours of flight time</sub>

<br />

<samp>──────────────  © VisionAir  ·  Warsaw  ·  Aerial Cinema  ──────────────</samp>

</div>
