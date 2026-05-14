'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS: Record<string, string> = { ru: 'RU', pl: 'PL', en: 'EN', uk: 'UA' };

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as (typeof routing.locales)[number] });
    });
  };

  return (
    <div className="lang" role="tablist" data-pending={isPending || undefined}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          className={l === locale ? 'active' : ''}
          onClick={() => switchTo(l)}
          aria-current={l === locale ? 'true' : undefined}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
