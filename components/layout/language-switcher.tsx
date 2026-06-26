'use client';

import {useState, useRef, useEffect, useTransition} from 'react';
import Image from 'next/image';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

const LOCALE_CONFIG: Record<Locale, {flag: string; code: string; label: string}> = {
  en: {flag: '/flags/en.svg', code: 'EN', label: 'English'},
  ar: {flag: '/flags/ar.svg', code: 'AR', label: 'العربية'},
  fr: {flag: '/flags/fr.svg', code: 'FR', label: 'Français'}
};

// Language switcher — flag + short code + dropdown chevron
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (routing.locales.length < 2) return null;

  const current = LOCALE_CONFIG[locale as Locale];

  function switchLocale(newLocale: Locale) {
    startTransition(() => {
      router.replace(pathname, {locale: newLocale});
      setOpen(false);
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="relative size-5 overflow-hidden rounded-full">
          <Image src={current.flag} alt="" width={20} height={20} className="size-full object-cover" />
        </span>
        <span className="font-medium">{current.code}</span>
        <svg
          className={`size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg"
        >
          {routing.locales.map((l) => {
            const config = LOCALE_CONFIG[l];
            const isActive = l === locale;
            return (
              <li key={l} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => switchLocale(l)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-muted ${
                    isActive ? 'font-medium text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <span className="relative size-5 overflow-hidden rounded-full">
                    <Image src={config.flag} alt="" width={20} height={20} className="size-full object-cover" />
                  </span>
                  <span>{config.code}</span>
                  <span className="text-xs text-muted-foreground">{config.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
