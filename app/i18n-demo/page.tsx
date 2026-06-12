'use client'

import {useState} from 'react'
import {NextIntlClientProvider, useTranslations} from 'next-intl'

/* Saffron Route palette — inline so the demo is self-contained. */
const C = {
  deep: '#100D08',
  deepMid: '#1C1811',
  cream: '#F8F4EA',
  surface: '#EEE7D4',
  border: '#E0D8C5',
  saffron: '#C4820A',
  saffronHi: '#E8A81F',
  saffronLo: '#8B5C06',
  slate: '#6E6456'
} as const

type Loc = 'en' | 'ar'

// Sample/placeholder translations — for demonstrating the switch only.
// Real copy is client-provided and would live in messages/en.json + messages/ar.json.
const MESSAGES: Record<Loc, Record<string, Record<string, string>>> = {
  en: {
    Nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      certifications: 'Certifications',
      contact: 'Contact'
    },
    Hero: {
      eyebrow: 'Building Partnerships Across Continents',
      title: 'Traya International Exim LLP',
      subtitle:
        'A refined approach to global trade — precision, reliability, and partnerships built to last.',
      ctaQuote: 'Get a Quote',
      ctaProducts: 'Browse Products'
    }
  },
  ar: {
    Nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      products: 'المنتجات',
      certifications: 'الشهادات',
      contact: 'اتصل بنا'
    },
    Hero: {
      eyebrow: 'نبني شراكات عبر القارات',
      title: 'Traya International Exim LLP',
      subtitle: 'نهج راقٍ للتجارة العالمية — الدقة والموثوقية وشراكات تدوم.',
      ctaQuote: 'اطلب عرض سعر',
      ctaProducts: 'تصفّح المنتجات'
    }
  }
}

export default function I18nDemo() {
  const [locale, setLocale] = useState<Loc>('en')
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const fontVar = locale === 'ar' ? 'var(--font-arabic)' : 'var(--font-latin)'

  return (
    <main
      style={{
        background: C.cream,
        minHeight: '100vh',
        fontFamily: 'var(--font-latin), system-ui, sans-serif',
        color: C.deep,
        padding: '40px 20px'
      }}
    >
      <div style={{maxWidth: 880, margin: '0 auto'}}>
        {/* ── Outer chrome stays English/LTR ── */}
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: C.saffronLo,
            marginBottom: 8
          }}
        >
          Internal · Not indexed
        </p>
        <h1 style={{fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6}}>
          i18n / RTL Demo
        </h1>
        <p style={{fontSize: 14, lineHeight: '22px', color: C.slate, marginBottom: 24}}>
          Uses the real <code style={{color: C.saffronLo}}>next-intl</code> client API (
          <code style={{color: C.saffronLo}}>NextIntlClientProvider</code> +{' '}
          <code style={{color: C.saffronLo}}>useTranslations</code>). Switching the language swaps the
          message dictionary <em>and</em> flips layout direction — exactly what the live{' '}
          <code style={{color: C.saffronLo}}>/[locale]</code> routing does site-wide. Arabic strings
          here are sample placeholders; real copy is client-provided.
        </p>

        {/* ── Language toggle ── */}
        <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
          {(['en', 'ar'] as Loc[]).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              style={{
                padding: '9px 18px',
                borderRadius: 4,
                border: `1.5px solid ${locale === l ? C.saffron : C.border}`,
                background: locale === l ? C.saffron : 'transparent',
                color: locale === l ? C.deep : C.slate,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {l === 'en' ? 'English' : 'العربية (Arabic)'}
            </button>
          ))}
        </div>

        {/* ── Live state readout ── */}
        <div style={{display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap'}}>
          <StateChip label="locale" value={locale} />
          <StateChip label="dir" value={dir} />
          <StateChip label="URL (real app)" value={locale === 'en' ? '/about' : '/ar/about'} />
          <StateChip label="messages" value={`messages/${locale}.json`} />
        </div>

        {/* ── The translated preview: flips dir + font ── */}
        <div
          dir={dir}
          style={{
            fontFamily: fontVar,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            overflow: 'hidden',
            background: C.cream
          }}
        >
          <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]} timeZone="UTC">
            <Preview locale={locale} />
          </NextIntlClientProvider>
        </div>

        <p style={{fontSize: 12, color: C.slate, marginTop: 16, lineHeight: '18px'}}>
          Note how in Arabic the nav order mirrors, the hero text aligns right, and the CTA arrow
          reverses — all driven by <code style={{color: C.saffronLo}}>dir=&quot;rtl&quot;</code>, not
          hand-built layouts.
        </p>
      </div>
    </main>
  )
}

function Preview({locale}: {locale: Loc}) {
  const nav = useTranslations('Nav')
  const hero = useTranslations('Hero')
  const arrow = locale === 'ar' ? '←' : '→'

  return (
    <div>
      {/* mock nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '16px 24px',
          background: C.deep,
          flexWrap: 'wrap'
        }}
      >
        <span
          style={{
            fontWeight: 700,
            letterSpacing: '0.18em',
            fontSize: 13,
            color: C.saffronHi,
            textTransform: 'uppercase'
          }}
        >
          TRAYA
        </span>
        <nav style={{display: 'flex', gap: 18, flexWrap: 'wrap'}}>
          {['home', 'about', 'products', 'certifications', 'contact'].map((k) => (
            <span key={k} style={{fontSize: 13, color: `${C.cream}cc`}}>
              {nav(k)}
            </span>
          ))}
        </nav>
      </div>

      {/* mock hero */}
      <div style={{padding: '40px 28px'}}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: locale === 'ar' ? '0' : '0.12em',
            textTransform: 'uppercase',
            color: C.saffronLo,
            marginBottom: 14
          }}
        >
          {hero('eyebrow')}
        </p>
        <h2 style={{fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12}}>
          {hero('title')}
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: '26px',
            color: C.slate,
            maxWidth: 520,
            marginBottom: 24
          }}
        >
          {hero('subtitle')}
        </p>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
          <button
            style={{
              background: C.saffron,
              color: C.deep,
              fontWeight: 700,
              fontSize: 14,
              padding: '12px 22px',
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {hero('ctaQuote')} {arrow}
          </button>
          <button
            style={{
              background: 'transparent',
              color: C.deep,
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 22px',
              borderRadius: 4,
              border: `1.5px solid ${C.deep}`,
              cursor: 'pointer'
            }}
          >
            {hero('ctaProducts')}
          </button>
        </div>
      </div>
    </div>
  )
}

function StateChip({label, value}: {label: string; value: string}) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: '7px 12px',
        background: C.surface
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: C.slate
        }}
      >
        {label}:{' '}
      </span>
      <span style={{fontSize: 13, fontWeight: 600, color: C.deep, fontFamily: 'ui-monospace, monospace'}}>
        {value}
      </span>
    </div>
  )
}
