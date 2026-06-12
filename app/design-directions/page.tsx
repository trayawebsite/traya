import {Fraunces, Figtree, Lora, Nunito_Sans, Space_Grotesk, Plus_Jakarta_Sans} from 'next/font/google'

/* ── Fonts (all variable — no weight arrays needed) ─────────────────── */
const fraunces = Fraunces({subsets: ['latin'], style: ['normal', 'italic'], display: 'swap'})
const figtree = Figtree({subsets: ['latin'], display: 'swap'})
const lora = Lora({subsets: ['latin'], style: ['normal', 'italic'], display: 'swap'})
const nunito = Nunito_Sans({subsets: ['latin'], display: 'swap'})
const spaceGrotesk = Space_Grotesk({subsets: ['latin'], display: 'swap'})
const jakarta = Plus_Jakarta_Sans({subsets: ['latin'], display: 'swap'})

const PAGE_BG = '#E8E7E3'
const INK = '#14120E'
const MUTED = '#6E6A60'
const HAIRLINE = 'rgba(20,18,14,0.10)'
const SHELL_BG = 'rgba(20,18,14,0.035)'
const CARD_BG = '#FCFAF4'

type Direction = {
  num: string
  name: string
  recommended?: boolean
  tag?: string
  accentOnLight?: string
  showPacks?: boolean
  positioning: string
  hero: {
    bg: string
    text: string
    muted: string
    eyebrowColor: string
    accent: string
    accentText: string
    ctaIconBg: string
    outline: string
    glow?: string
    topHighlight?: string
    chipBorder: string
    eyebrow: string
    headline: string
    sub: string
    displayFamily: string
    bodyFamily: string
    headlineWeight: number
    headlineSpacing: string
    italicWord?: string
  }
  swatches: {n: string; h: string}[]
  type: {
    displayName: string
    displayNote: string
    displayFamily: string
    displayItalic?: boolean
    bodyName: string
    bodyNote: string
    bodyFamily: string
  }
  mood: string[]
}

const DIRECTIONS: Direction[] = [
  {
    num: '01',
    name: 'Saffron Route',
    recommended: true,
    tag: 'Dark',
    accentOnLight: '#8B5C06',
    showPacks: true,
    positioning: 'Warm editorial premium — founder-led, spice-forward, refined.',
    hero: {
      bg: '#100D08',
      text: '#F8F4EA',
      muted: 'rgba(248,244,234,0.58)',
      eyebrowColor: '#E8A81F',
      accent: '#C4820A',
      accentText: '#100D08',
      ctaIconBg: 'rgba(16,13,8,0.18)',
      outline: 'rgba(248,244,234,0.28)',
      glow: 'rgba(196,130,10,0.20)',
      topHighlight: 'rgba(255,255,255,0.06)',
      chipBorder: 'rgba(232,168,31,0.32)',
      eyebrow: 'Food & Agro Ingredient Export · India',
      headline: 'A refined approach to global trade.',
      sub: 'Spices, dehydrates, and herbal ingredients — sourced, processed, and shipped with founder-led precision.',
      displayFamily: fraunces.style.fontFamily,
      bodyFamily: figtree.style.fontFamily,
      headlineWeight: 500,
      headlineSpacing: '-0.025em',
      italicWord: 'refined'
    },
    swatches: [
      {n: 'Deep Espresso', h: '#100D08'},
      {n: 'Warm Cream', h: '#F8F4EA'},
      {n: 'Saffron', h: '#C4820A'},
      {n: 'Forest', h: '#1C4230'}
    ],
    type: {
      displayName: 'Fraunces',
      displayNote: 'Optical serif · headings & brand moments',
      displayFamily: fraunces.style.fontFamily,
      displayItalic: true,
      bodyName: 'Figtree',
      bodyNote: 'Geometric humanist · body & UI',
      bodyFamily: figtree.style.fontFamily
    },
    mood: ['Premium', 'Founder-led', 'Editorial', 'Warm']
  },
  {
    num: '01',
    name: 'Saffron Route',
    tag: 'Light variant',
    accentOnLight: '#8B5C06',
    positioning: 'Same system, light treatment — compare against the dark hero above.',
    hero: {
      bg: '#F8F4EA',
      text: '#14120E',
      muted: 'rgba(20,18,14,0.62)',
      eyebrowColor: '#8B5C06',
      accent: '#14120E',
      accentText: '#F8F4EA',
      ctaIconBg: 'rgba(248,244,234,0.22)',
      outline: 'rgba(35,26,14,0.28)',
      topHighlight: 'rgba(255,255,255,0.6)',
      chipBorder: 'rgba(35,26,14,0.18)',
      eyebrow: 'Food & Agro Ingredient Export · India',
      headline: 'A refined approach to global trade.',
      sub: 'Spices, dehydrates, and herbal ingredients — sourced, processed, and shipped with founder-led precision.',
      displayFamily: fraunces.style.fontFamily,
      bodyFamily: figtree.style.fontFamily,
      headlineWeight: 500,
      headlineSpacing: '-0.025em',
      italicWord: 'refined'
    },
    swatches: [
      {n: 'Warm Cream', h: '#F8F4EA'},
      {n: 'Deep Espresso', h: '#100D08'},
      {n: 'Saffron Lo', h: '#8B5C06'},
      {n: 'Forest', h: '#1C4230'}
    ],
    type: {
      displayName: 'Fraunces',
      displayNote: 'Optical serif · headings & brand moments',
      displayFamily: fraunces.style.fontFamily,
      displayItalic: true,
      bodyName: 'Figtree',
      bodyNote: 'Geometric humanist · body & UI',
      bodyFamily: figtree.style.fontFamily
    },
    mood: ['Premium', 'Airy', 'Editorial', 'Warm']
  },
  {
    num: '02',
    name: 'Harvest',
    positioning: 'Earthy & organic — provenance, soil-to-shelf, naturally sourced.',
    hero: {
      bg: '#EFE6D4',
      text: '#2A2117',
      muted: 'rgba(42,33,23,0.60)',
      eyebrowColor: '#9A5A34',
      accent: '#B5603A',
      accentText: '#F7F1E6',
      ctaIconBg: 'rgba(247,241,230,0.26)',
      outline: 'rgba(62,74,46,0.50)',
      topHighlight: 'rgba(255,255,255,0.45)',
      chipBorder: 'rgba(62,74,46,0.28)',
      eyebrow: 'Naturally Sourced · From Indian Soil',
      headline: "From Indian soil to the world's shelves.",
      sub: 'Honest provenance, clean processing, and ingredients you can trace from farm to freight.',
      displayFamily: lora.style.fontFamily,
      bodyFamily: nunito.style.fontFamily,
      headlineWeight: 600,
      headlineSpacing: '-0.01em',
      italicWord: 'soil'
    },
    swatches: [
      {n: 'Oat', h: '#EFE6D4'},
      {n: 'Olive', h: '#3E4A2E'},
      {n: 'Terracotta', h: '#B5603A'},
      {n: 'Sage', h: '#8A9A7B'},
      {n: 'Clay Brown', h: '#2A2117'}
    ],
    type: {
      displayName: 'Lora',
      displayNote: 'Calligraphic serif · warm & organic',
      displayFamily: lora.style.fontFamily,
      displayItalic: true,
      bodyName: 'Nunito Sans',
      bodyNote: 'Rounded humanist · friendly & natural',
      bodyFamily: nunito.style.fontFamily
    },
    mood: ['Organic', 'Provenance', 'Grounded', 'Trustworthy']
  },
  {
    num: '03',
    name: 'Meridian',
    positioning: 'Clean & modern — precision, scale, documentation-grade B2B.',
    hero: {
      bg: '#F5F6F3',
      text: '#15211C',
      muted: 'rgba(21,33,28,0.56)',
      eyebrowColor: '#0E6E52',
      accent: '#0E6E52',
      accentText: '#FFFFFF',
      ctaIconBg: 'rgba(255,255,255,0.24)',
      outline: 'rgba(21,33,28,0.18)',
      topHighlight: 'rgba(255,255,255,0.7)',
      chipBorder: 'rgba(21,33,28,0.14)',
      eyebrow: 'Global Ingredient Supply',
      headline: 'Precision sourcing for global food brands.',
      sub: 'Documentation-grade specs, reliable logistics, and a sourcing partner built for scale.',
      displayFamily: spaceGrotesk.style.fontFamily,
      bodyFamily: jakarta.style.fontFamily,
      headlineWeight: 600,
      headlineSpacing: '-0.03em'
    },
    swatches: [
      {n: 'Paper', h: '#F5F6F3'},
      {n: 'Ink Green', h: '#15211C'},
      {n: 'Emerald', h: '#0E6E52'},
      {n: 'Mist', h: '#DCE3DE'}
    ],
    type: {
      displayName: 'Space Grotesk',
      displayNote: 'Technical grotesk · structured headings',
      displayFamily: spaceGrotesk.style.fontFamily,
      bodyName: 'Plus Jakarta Sans',
      bodyNote: 'Premium geometric · body & data',
      bodyFamily: jakarta.style.fontFamily
    },
    mood: ['Modern', 'Precise', 'Scalable', 'Enterprise']
  }
]

const NAV = ['Products', 'About', 'Certifications', 'Contact']
const CERTS = ['ISO 22000', 'FSSAI', 'APEDA', 'HACCP']

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/* ── Eyebrow pill ───────────────────────────────────────────────────── */
function Eyebrow({color, border, family, children}: {color: string; border: string; family: string; children: React.ReactNode}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: `1px solid ${border}`,
        borderRadius: 999,
        padding: '6px 14px 6px 12px'
      }}
    >
      <span style={{width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block'}} />
      <span
        style={{
          fontFamily: family,
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color
        }}
      >
        {children}
      </span>
    </span>
  )
}

/* ── Stylized product pouch (SVG, no photography needed) ────────────── */
function Pouch({
  body,
  label,
  seal,
  name,
  sub,
  nameColor,
  subColor,
  dot,
  style
}: {
  body: string
  label: string
  seal: string
  name: string
  sub: string
  nameColor: string
  subColor: string
  dot: string
  style: React.CSSProperties
}) {
  return (
    <div style={{position: 'absolute', filter: 'drop-shadow(0 24px 28px rgba(0,0,0,0.45))', ...style}}>
      <svg width="132" height="178" viewBox="0 0 132 178" fill="none">
        <rect x="22" y="2" width="88" height="13" rx="2" fill={seal} />
        <rect x="14" y="13" width="104" height="161" rx="12" fill={body} />
        <rect x="14" y="13" width="18" height="161" rx="12" fill="rgba(0,0,0,0.07)" />
        <rect x="14" y="13" width="104" height="46" rx="12" fill="rgba(255,255,255,0.05)" />
        <rect x="14" y="74" width="104" height="58" fill={label} />
        <circle cx="66" cy="90" r="3.5" fill={dot} />
        <text
          x="66"
          y="110"
          textAnchor="middle"
          fontFamily={figtree.style.fontFamily}
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.6"
          fill={nameColor}
        >
          {name}
        </text>
        <text
          x="66"
          y="123"
          textAnchor="middle"
          fontFamily={figtree.style.fontFamily}
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="2"
          fill={subColor}
        >
          {sub}
        </text>
      </svg>
    </div>
  )
}

function ProductPacks() {
  return (
    <div
      className="dd-packs"
      style={{position: 'relative', flexShrink: 0, width: 'clamp(280px, 30vw, 360px)', height: 340, alignSelf: 'center'}}
    >
      <Pouch
        name="MORINGA"
        sub="LEAF POWDER"
        body="#1C4230"
        label="#F8F4EA"
        seal="#142A1E"
        nameColor="#1C4230"
        subColor="rgba(28,66,48,0.55)"
        dot="#C4820A"
        style={{left: '-4%', top: '22%', transform: 'rotate(-12deg) scale(0.82)', zIndex: 1}}
      />
      <Pouch
        name="CHILLI"
        sub="GROUND"
        body="#C4820A"
        label="#100D08"
        seal="#8B5C06"
        nameColor="#F8F4EA"
        subColor="rgba(248,244,234,0.6)"
        dot="#E8A81F"
        style={{left: '54%', top: '36%', transform: 'rotate(8deg) scale(0.8)', zIndex: 2}}
      />
      <Pouch
        name="TURMERIC"
        sub="FINE POWDER"
        body="#F8F4EA"
        label="#C4820A"
        seal="#E2DAC6"
        nameColor="#100D08"
        subColor="rgba(16,13,8,0.6)"
        dot="#1C4230"
        style={{left: '24%', top: '4%', transform: 'rotate(-3deg) scale(1.02)', zIndex: 3}}
      />
    </div>
  )
}

/* ── Hero mockup (double-bezel) ─────────────────────────────────────── */
function HeroMock({d}: {d: Direction}) {
  const h = d.hero
  const parts = h.italicWord ? h.headline.split(new RegExp(`(${h.italicWord})`)) : [h.headline]

  return (
    <div
      style={{
        background: SHELL_BG,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 30,
        padding: 7,
        boxShadow: '0 40px 80px -40px rgba(40,30,15,0.34)'
      }}
    >
      <div
        style={{
          position: 'relative',
          background: h.bg,
          color: h.text,
          borderRadius: 23,
          overflow: 'hidden',
          boxShadow: h.topHighlight ? `inset 0 1px 0 ${h.topHighlight}` : undefined
        }}
      >
        {h.glow && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(75% 60% at 78% -5%, ${h.glow}, transparent 68%)`,
              pointerEvents: 'none'
            }}
          />
        )}

        <div style={{position: 'relative', padding: 'clamp(26px, 4.2vw, 60px)'}}>
          {/* nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
              paddingBottom: 'clamp(40px, 6.5vw, 80px)'
            }}
          >
            <span
              style={{
                fontFamily: h.displayFamily,
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: '0.18em',
                color: h.text
              }}
            >
              TRAYA
            </span>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap'}}>
              {NAV.map((n) => (
                <span key={n} style={{fontFamily: h.bodyFamily, fontSize: 13.5, color: h.muted}}>
                  {n}
                </span>
              ))}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: h.bodyFamily,
                  fontSize: 13,
                  fontWeight: 600,
                  color: h.accentText,
                  background: h.accent,
                  padding: '9px 18px',
                  borderRadius: 999
                }}
              >
                Get a Quote
              </span>
            </div>
          </div>

          <div style={{display: 'flex', gap: 'clamp(24px, 3vw, 56px)', alignItems: 'center', flexWrap: 'wrap'}}>
          <div style={{flex: '1 1 380px', minWidth: 0}}>
          {/* eyebrow */}
          <div style={{marginBottom: 22}}>
            <Eyebrow color={h.eyebrowColor} border={h.chipBorder} family={h.bodyFamily}>
              {h.eyebrow}
            </Eyebrow>
          </div>

          {/* headline */}
          <h3
            style={{
              fontFamily: h.displayFamily,
              fontWeight: h.headlineWeight,
              fontSize: 'clamp(32px, 5.4vw, 62px)',
              lineHeight: 1.03,
              letterSpacing: h.headlineSpacing,
              margin: 0,
              maxWidth: 780
            }}
          >
            {parts.map((part, i) =>
              h.italicWord && part === h.italicWord ? (
                <em key={i} style={{fontStyle: 'italic', color: h.eyebrowColor}}>
                  {part}
                </em>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h3>

          {/* sub */}
          <p
            style={{
              fontFamily: h.bodyFamily,
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              lineHeight: 1.62,
              color: h.muted,
              maxWidth: 540,
              margin: '22px 0 0'
            }}
          >
            {h.sub}
          </p>

          {/* CTAs */}
          <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32}}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: h.bodyFamily,
                fontSize: 14,
                fontWeight: 700,
                color: h.accentText,
                background: h.accent,
                padding: '8px 8px 8px 22px',
                borderRadius: 999
              }}
            >
              Explore Products
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: h.ctaIconBg,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15
                }}
              >
                ↗
              </span>
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: h.bodyFamily,
                fontSize: 14,
                fontWeight: 600,
                color: h.text,
                border: `1.5px solid ${h.outline}`,
                padding: '13px 24px',
                borderRadius: 999
              }}
            >
              Download Catalogue
            </span>
          </div>

          {/* cert chips */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              marginTop: 'clamp(30px, 5vw, 56px)',
              paddingTop: 24,
              borderTop: `1px solid ${h.chipBorder}`
            }}
          >
            {CERTS.map((cert) => (
              <span
                key={cert}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontFamily: h.bodyFamily,
                  fontSize: 12,
                  fontWeight: 600,
                  color: h.text,
                  border: `1px solid ${h.chipBorder}`,
                  padding: '6px 13px',
                  borderRadius: 999
                }}
              >
                <span style={{width: 5, height: 5, borderRadius: '50%', background: h.eyebrowColor, display: 'inline-block'}} />
                {cert}
              </span>
            ))}
          </div>
          </div>
          {d.showPacks && <ProductPacks />}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Palette ────────────────────────────────────────────────────────── */
function Palette({d}: {d: Direction}) {
  return (
    <div>
      <SubLabel>Palette</SubLabel>
      <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
        {d.swatches.map((s) => (
          <div key={s.h} style={{width: 92}}>
            <div
              style={{
                height: 66,
                borderRadius: 14,
                background: s.h,
                border: `1px solid ${HAIRLINE}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)'
              }}
            />
            <div style={{marginTop: 9, fontFamily: jakarta.style.fontFamily, fontSize: 12, color: INK, fontWeight: 600}}>
              {s.n}
            </div>
            <div style={{fontFamily: jakarta.style.fontFamily, fontSize: 11, color: MUTED, letterSpacing: '0.02em'}}>
              {s.h}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Type specimen ──────────────────────────────────────────────────── */
function TypeSpec({d}: {d: Direction}) {
  const t = d.type
  return (
    <div>
      <SubLabel>Typography</SubLabel>
      <div
        style={{
          background: SHELL_BG,
          border: `1px solid ${HAIRLINE}`,
          borderRadius: 18,
          padding: 6
        }}
      >
        <div style={{background: CARD_BG, borderRadius: 13, overflow: 'hidden'}}>
          <div style={{padding: '20px 22px', borderBottom: `1px solid ${HAIRLINE}`}}>
            <div
              style={{
                fontFamily: t.displayFamily,
                fontSize: 42,
                lineHeight: 1,
                color: INK,
                fontStyle: t.displayItalic ? 'italic' : 'normal',
                letterSpacing: '-0.01em'
              }}
            >
              Ingredients, Aa
            </div>
            <div style={{marginTop: 11, fontFamily: jakarta.style.fontFamily, fontSize: 12.5, color: MUTED}}>
              <strong style={{color: INK}}>{t.displayName}</strong> — {t.displayNote}
            </div>
          </div>
          <div style={{padding: '20px 22px'}}>
            <div style={{fontFamily: t.bodyFamily, fontSize: 15, lineHeight: 1.62, color: INK}}>
              Sourced, processed, and exported with operational precision and full documentation.
            </div>
            <div style={{marginTop: 11, fontFamily: jakarta.style.fontFamily, fontSize: 12.5, color: MUTED}}>
              <strong style={{color: INK}}>{t.bodyName}</strong> — {t.bodyNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubLabel({children}: {children: React.ReactNode}) {
  return (
    <p
      style={{
        fontFamily: jakarta.style.fontFamily,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: MUTED,
        margin: '0 0 16px'
      }}
    >
      {children}
    </p>
  )
}

/* ── Direction block ────────────────────────────────────────────────── */
function DirectionBlock({d}: {d: Direction}) {
  return (
    <section style={{borderTop: `1px solid ${HAIRLINE}`, padding: 'clamp(56px, 8vw, 104px) 0'}}>
      {/* header */}
      <div style={{display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap', marginBottom: 30}}>
        <span
          style={{
            fontFamily: spaceGrotesk.style.fontFamily,
            fontSize: 'clamp(34px, 4vw, 50px)',
            fontWeight: 500,
            color: d.accentOnLight ?? d.hero.accent,
            lineHeight: 1
          }}
        >
          {d.num}
        </span>
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'}}>
            <h2
              style={{
                fontFamily: d.hero.displayFamily,
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 600,
                color: INK,
                margin: 0,
                letterSpacing: '-0.015em'
              }}
            >
              {d.name}
            </h2>
            {d.recommended && (
              <span
                style={{
                  fontFamily: jakarta.style.fontFamily,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#1C4230',
                  background: 'rgba(28,66,48,0.10)',
                  border: '1px solid rgba(28,66,48,0.28)',
                  padding: '5px 11px',
                  borderRadius: 999
                }}
              >
                Recommended
              </span>
            )}
            {d.tag && (
              <span
                style={{
                  fontFamily: jakarta.style.fontFamily,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: MUTED,
                  background: CARD_BG,
                  border: `1px solid ${HAIRLINE}`,
                  padding: '5px 11px',
                  borderRadius: 999
                }}
              >
                {d.tag}
              </span>
            )}
          </div>
          <p
            style={{
              fontFamily: jakarta.style.fontFamily,
              fontSize: 15,
              color: MUTED,
              margin: '7px 0 0',
              maxWidth: 580,
              lineHeight: 1.5
            }}
          >
            {d.positioning}
          </p>
        </div>
      </div>

      <HeroMock d={d} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 40,
          marginTop: 44
        }}
      >
        <Palette d={d} />
        <TypeSpec d={d} />
      </div>

      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 34}}>
        {d.mood.map((m) => (
          <span
            key={m}
            style={{
              fontFamily: jakarta.style.fontFamily,
              fontSize: 12,
              fontWeight: 600,
              color: INK,
              background: CARD_BG,
              border: `1px solid ${HAIRLINE}`,
              padding: '6px 14px',
              borderRadius: 999
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function DesignDirections() {
  return (
    <main style={{background: PAGE_BG, minHeight: '100dvh', color: INK, position: 'relative'}}>
      <style dangerouslySetInnerHTML={{__html: '@media (max-width: 900px){.dd-packs{display:none}}'}} />
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          pointerEvents: 'none',
          opacity: 0.04,
          mixBlendMode: 'multiply',
          backgroundImage: GRAIN
        }}
      />

      <div style={{maxWidth: 1080, margin: '0 auto', padding: '0 clamp(20px, 5vw, 52px)'}}>
        {/* header */}
        <header style={{padding: 'clamp(64px, 10vw, 120px) 0 clamp(10px, 2vw, 20px)', textAlign: 'center'}}>
          <Eyebrow color="#8B5C06" border="rgba(139,92,6,0.32)" family={jakarta.style.fontFamily}>
            Traya International Exim · Brand Directions
          </Eyebrow>
          <h1
            style={{
              fontFamily: fraunces.style.fontFamily,
              fontSize: 'clamp(40px, 6.5vw, 74px)',
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              margin: '22px auto 0',
              maxWidth: 860
            }}
          >
            Three directions for a global{' '}
            <em style={{fontStyle: 'italic', color: '#8B5C06'}}>ingredient house</em>.
          </h1>
          <p
            style={{
              fontFamily: figtree.style.fontFamily,
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              lineHeight: 1.62,
              color: MUTED,
              maxWidth: 600,
              margin: '26px auto 0'
            }}
          >
            Each is a complete system — palette, typography, and tone — shown as a real homepage
            hero. Pick one and we build the entire site in it.
          </p>
        </header>

        {DIRECTIONS.map((d) => (
          <DirectionBlock key={d.num} d={d} />
        ))}

        {/* footer */}
        <footer style={{borderTop: `1px solid ${HAIRLINE}`, padding: 'clamp(44px, 6vw, 72px) 0', textAlign: 'center'}}>
          <p style={{fontFamily: jakarta.style.fontFamily, fontSize: 13, color: MUTED, margin: 0}}>
            All three are production-ready systems. Tell me which number to build the site in.
          </p>
        </footer>
      </div>
    </main>
  )
}
