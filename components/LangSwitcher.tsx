'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS: Record<string, string> = { ru: 'RU', pl: 'PL', en: 'EN', uk: 'UA' };

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Render real <a> tags (via next-intl Link) so Googlebot can follow them.
  // Earlier this was a <button> with router.replace, which left no href in the
  // HTML and effectively hid every non-current locale URL from crawlers — a
  // big chunk of EN/UK pages were sitting in GSC as "Discovered, not indexed"
  // for that reason.
  return (
    <div className="lang" role="tablist">
      {routing.locales.map((l) =>
        l === locale ? (
          <span key={l} className="active" aria-current="true">
            {LABELS[l]}
          </span>
        ) : (
          <Link
            key={l}
            href={pathname}
            locale={l as (typeof routing.locales)[number]}
            hrefLang={l}
            prefetch={false}
          >
            {LABELS[l]}
          </Link>
        ),
      )}
    </div>
  );
}
