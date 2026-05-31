# syntax=docker/dockerfile:1
# Multi-stage build for Next.js 15 standalone output.
# Built in GitHub Actions, pushed to GHCR, run by Dokploy.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# ── deps: install node_modules from the lockfile ──────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── builder: compile the app (postbuild pings IndexNow) ───────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# INDEXNOW_KEY is public (also served at /public/{KEY}.txt); INDEXNOW_ENABLE
# lets scripts/notify-indexnow.mjs ping Bing at build time off Vercel.
ARG INDEXNOW_KEY
ARG INDEXNOW_ENABLE=1
ENV INDEXNOW_KEY=$INDEXNOW_KEY
ENV INDEXNOW_ENABLE=$INDEXNOW_ENABLE
RUN npm run build

# ── runner: minimal runtime image ────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Static assets and the standalone server bundle.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Persistent lead/admin store (mount a Dokploy volume here).
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
