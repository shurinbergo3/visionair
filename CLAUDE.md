# CLAUDE.md

## Sitemap & IndexNow

The project pings Bing IndexNow on every production deploy via
[scripts/notify-indexnow.mjs](scripts/notify-indexnow.mjs) (wired as
`postbuild` in [package.json](package.json)). The script reads
`.next/server/app/sitemap.xml.body` and submits only URLs whose `<lastmod>`
falls inside a recent window (default 48h, overridable via
`INDEXNOW_LASTMOD_WINDOW_HOURS`).

**Rules when touching sitemap/IndexNow code:**

- `lastModified` in [app/sitemap.ts](app/sitemap.ts) MUST stay stable across
  builds. Never use `new Date()` — it makes every URL look "fresh" on every
  deploy, defeats the IndexNow filter (everything gets re-pinged, Bing
  throttles us), and makes Bing/Google distrust the sitemap (stalls
  processing). Use:
  - Static pages → hardcoded constant `STATIC_LASTMOD`, bumped manually when
    content actually changes.
  - Dynamic pages (articles) → `updatedAt || publishedAt` from the source.

- Don't "fix" `notify-indexnow.mjs` by removing the lastmod filter or
  sending the full sitemap unconditionally. Re-pinging unchanged URLs is
  treated as noise by Bing and reduces IndexNow effectiveness. If you need
  to force a full re-ping, do it manually (one-off curl), not from postbuild.

- Don't try to persist "already-sent URLs" state between builds. Vercel's
  filesystem is ephemeral — it won't work. The lastmod window is the
  state-free substitute.

- `notify-indexnow.mjs` must never exit non-zero. It runs in postbuild and
  must not fail the deploy if IndexNow is unreachable, the key is missing,
  or the sitemap can't be read. Always `process.exit(0)`.
