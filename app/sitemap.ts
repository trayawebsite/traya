import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Static routes. Dynamic product routes will be appended here once Sanity is wired.
const paths = ['', '/about', '/products', '/certifications', '/contact'];

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: urlFor(routing.defaultLocale, path),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
    // hreflang alternates — populated automatically as locales are added
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, path)])
      )
    }
  }));
}
