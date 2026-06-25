import type {Metadata} from 'next';
import {Lora, Figtree, DM_Mono} from 'next/font/google';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {getSiteSettings} from '@/lib/site-settings';
import {TopBar} from '@/components/layout/top-bar';
import {SiteHeader} from '@/components/layout/site-header';
import {SiteFooter} from '@/components/layout/site-footer';
import {FloatingActions} from '@/components/layout/floating-actions';
import {EnquiryProvider} from '@/lib/enquiry-context';
import {EnquireTab} from '@/components/layout/enquire-tab';
import {EnquirySection} from '@/components/sections/enquiry-section';
import {LanguagePrompt} from '@/components/layout/language-prompt';
import {Toaster} from '@/components/ui/sonner';
import '../../globals.css';

// Display: Lora (calligraphic serif, warm & editorial). Headlines only.
const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap'
});

// Body / UI: Figtree (clean humanist sans).
const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap'
});

// Technical: DM Mono (specs, HS codes, MOQ, product codes).
const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Traya International Exim LLP | Multi-Sector Exports from India',
    template: '%s | Traya International Exim LLP'
  },
  description:
    'Source food and agricultural products, chemicals, mechanical and engineering goods, and paper from India through one accountable export partner.',
  openGraph: {
    type: 'website',
    siteName: 'Traya International Exim LLP',
    title: 'Traya International Exim LLP | Multi-Sector Exports from India',
    description:
      'Multi-sector sourcing, export documentation, and shipment coordination for global buyers sourcing from India.',
    url: siteUrl,
    locale: 'en'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traya International Exim LLP | Multi-Sector Exports from India',
    description: 'One accountable export partner for buyers sourcing across sectors from India.'
  }
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
  const settings = await getSiteSettings();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${lora.variable} ${figtree.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* No-JS / crawler safety: scroll-reveal starts content at opacity:0, so
            force it visible when JS is unavailable. */}
        <noscript>
          <style>{`[data-reveal],[data-stagger]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <EnquiryProvider>
          <LanguagePrompt />
          <a
            href="#main"
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {t('skip')}
          </a>
          <TopBar />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <EnquirySection founderPhoto={settings.founderPhoto} />
          <SiteFooter />
          <EnquireTab />
          <FloatingActions />
          <Toaster richColors position="top-center" />
          </EnquiryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
