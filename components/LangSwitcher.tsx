'use client';

import { useCallback, useRef, useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS: Record<string, string> = { ru: 'RU', pl: 'PL', en: 'EN', uk: 'UA' };

type Locale = (typeof routing.locales)[number];

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pending, setPending] = useState<string | null>(null);

  // Warm each target locale at most once per path. Without this, every
  // mouseenter/focus re-fetched the full RSC payload of the hovered locale —
  // sweeping the mouse across the switcher cold-fetched 3 heavy pages on each
  // pass, which was a big part of the switch jank.
  const warmed = useRef(new Set<string>());
  const warm = useCallback(
    (l: Locale) => {
      const key = `${pathname}|${l}`;
      if (warmed.current.has(key)) return;
      warmed.current.add(key);
      router.prefetch(pathname, { locale: l });
    },
    [pathname, router],
  );

  // Render real <a> tags (via next-intl Link) so Googlebot can follow them.
  // Earlier this was a <button> with router.replace, which left no href in the
  // HTML and effectively hid every non-current locale URL from crawlers — a
  // big chunk of EN/UK pages were sitting in GSC as "Discovered, not indexed"
  // for that reason.
  //
  // Switching used to feel slow/janky: prefetch was off, so each click cold-
  // fetched the whole (heavy) page with no visual feedback. Now we (1) warm the
  // target locale on hover/focus and (2) drive the click through a transition
  // with an optimistic active state, so the highlight moves instantly while the
  // new locale streams in. The <a href> stays intact for crawlers.
  const active = isPending && pending ? pending : locale;

  const go = (l: Locale) => {
    setPending(l);
    startTransition(() => router.replace(pathname, { locale: l }));
  };

  return (
    <div className="lang" role="tablist" aria-busy={isPending}>
      {routing.locales.map((l) =>
        l === active ? (
          <span key={l} className="active" aria-current="true">
            {LABELS[l]}
          </span>
        ) : (
          <Link
            key={l}
            href={pathname}
            locale={l as Locale}
            hrefLang={l}
            prefetch={false}
            onMouseEnter={() => warm(l as Locale)}
            onFocus={() => warm(l as Locale)}
            onClick={(e) => {
              // Plain left-click → enhanced transition; let modified clicks
              // (new tab, etc.) fall through to native anchor behavior.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              go(l as Locale);
            }}
          >
            {LABELS[l]}
          </Link>
        ),
      )}
    </div>
  );
}
