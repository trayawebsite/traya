import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Order mirrors the language switcher. English is default (clean URLs);
  // every other locale is prefixed (/ar/about, /zh/about, …).
  locales: [
    'en', // English
    'ar', // Arabic
    'zh', // Mandarin Chinese
    'ja', // Japanese
    'id', // Bahasa Indonesia
    'vi', // Vietnamese
    'nl', // Dutch
    'ko', // Korean
    'de', // German
    'fr', // French
    'it', // Italian
    'es', // Spanish
    'ru', // Russian
    'pl', // Polish
    'sw', // Swahili
    'pt', // Portuguese
    'tr'  // Turkish
  ],
  defaultLocale: 'en',
  // Default locale has clean URLs (/about); other locales are prefixed (/ar/about).
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

// Right-to-left locales (only Arabic today) — used for the <html dir> attribute.
export const rtlLocales: Locale[] = ['ar'];

// Native display names for the switcher and the language prompt.
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  nl: 'Nederlands',
  ko: '한국어',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  ru: 'Русский',
  pl: 'Polski',
  sw: 'Kiswahili',
  pt: 'Português',
  tr: 'Türkçe'
};
