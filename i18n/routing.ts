import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Launch English-only. Add markets later, e.g. ['en', 'ar', 'fr'] — no structural change.
  locales: ['en'],
  defaultLocale: 'en',
  // Default locale has clean URLs (/about); other locales are prefixed (/ar/about).
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];
