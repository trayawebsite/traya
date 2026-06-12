import type {Metadata} from 'next';
import {Fraunces, Figtree, DM_Mono} from 'next/font/google';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {SiteHeader} from '@/components/layout/site-header';
import {SiteFooter} from '@/components/layout/site-footer';
import {WhatsAppButton} from '@/components/layout/whatsapp-button';
import '../../globals.css';

// Display — Fraunces (variable optical serif, warm editorial). Headlines only.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap'
});

// Body / UI — Figtree (clean humanist sans).
const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap'
});

// Technical — DM Mono (specs, HS codes, MOQ, product codes).
const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Traya International Exim LLP',
    template: '%s | Traya International Exim LLP'
  },
  description:
    'Traya International Exim LLP — a trusted global export-import partner. Explore our product portfolio and request a quote.'
};

// Pre-render all configured locales at build time (SSG).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this request.
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations('Header');

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${figtree.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {t('skip')}
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
