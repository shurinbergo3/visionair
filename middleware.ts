import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { SERVICE_SLUG_MAP } from './lib/localizedRoutes';

const intlMiddleware = createMiddleware(routing);

// Reverse map of public localized slug → internal locale-prefixed polish-slug
// path. next-intl middleware has no knowledge of our SLUG_MAP and would
// otherwise treat these public paths as unknown and 404 (or, for the RU
// default locale, redirect `/ru/<polish>` back to `/<polish>` which then
// 500s). We rewrite to the internal `/{locale}/{polish}` form ourselves and
// skip next-intl for matching paths.
const PUBLIC_TO_INTERNAL = new Map<string, string>();
for (const [internal, localeMap] of Object.entries(SERVICE_SLUG_MAP)) {
  for (const [locale, publicSlug] of Object.entries(localeMap)) {
    if (!publicSlug || publicSlug === internal) continue;
    const publicPath =
      locale === routing.defaultLocale ? publicSlug : `/${locale}${publicSlug}`;
    PUBLIC_TO_INTERNAL.set(publicPath, `/${locale}${internal}`);
  }
}

export default function middleware(req: NextRequest) {
  // Canonical host: 301 www → apex so visionair.biz.pl is the single primary
  // host (avoids duplicate-content split between www and non-www).
  const host = req.headers.get('host') ?? '';
  if (host.startsWith('www.')) {
    const url = req.nextUrl.clone();
    url.protocol = 'https:';
    url.host = host.slice(4);
    return NextResponse.redirect(url, 301);
  }

  const internal = PUBLIC_TO_INTERNAL.get(req.nextUrl.pathname);
  if (internal) {
    const url = req.nextUrl.clone();
    url.pathname = internal;
    return NextResponse.rewrite(url);
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
