'use client';

import {useState, useRef, useEffect, useTransition} from 'react';
import Image from 'next/image';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, localeNames, type Locale} from '@/i18n/routing';

// Flag chip with a graceful fallback: if /flags/<locale>.svg is missing, show a
// small monogram of the locale code instead of a broken image. Lets us add all
// languages now and drop in flag SVGs later without breaking the UI.
function Flag({locale}: {locale: Locale}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-muted text-[8px] font-bold uppercase leading-none text-muted-foreground">
        {locale}
      </span>
    );
  }
  return (
    <span className="relative size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
      <Image
        src={`/flags/${locale}.svg`}
        alt=""
        width={20}
        height={20}
        onError={() => setFailed(true)}
        className="size-full object-cover"
      />
    </span>
  );
}

// Language switcher — flag + short code + dropdown of all supported locales.
export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
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
        aria-label={localeNames[locale]}
      >
        <Flag locale={locale} />
        <span className="font-medium uppercase">{locale}</span>
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
          className="absolute end-0 z-50 mt-1 max-h-[min(70vh,26rem)] min-w-[190px] overflow-y-auto overscroll-contain rounded-lg border border-border bg-card py-1 shadow-lg"
        >
          {routing.locales.map((l) => {
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
                  <Flag locale={l} />
                  <span className="whitespace-nowrap">{localeNames[l]}</span>
                  {isActive && (
                    <svg
                      className="ms-auto size-4 shrink-0 text-traya-saffron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
