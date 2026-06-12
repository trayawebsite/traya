'use client';

import {useTransition} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

// LOGIC — switches locale while preserving the current path. Fully wired for
// when markets are added; with a single locale there's nothing to switch, so
// it renders nothing (graceful). Native <select> = accessible, zero deps.
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Language');
  const [isPending, startTransition] = useTransition();

  if (routing.locales.length < 2) return null;

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t('label')}</span>
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) =>
          startTransition(() =>
            router.replace(pathname, {locale: e.target.value as (typeof routing.locales)[number]})
          )
        }
        className="appearance-none rounded-md border border-border bg-background py-1.5 pl-3 pr-8 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {t(l)}
          </option>
        ))}
      </select>
    </label>
  );
}
