import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
  // Default locale has clean URLs (/about); other locales are prefixed (/ar/about).
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

// Display names for the language prompt
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français'
};
