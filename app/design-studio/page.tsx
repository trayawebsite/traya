'use client'

import {useState} from 'react'

/* ── Neutrals ───────────────────────────────────────────────────────── */
const INK = '#14120E'
const MUTED = 'rgba(20,18,14,0.62)'
const MUTED_HARD = '#6E6A60'
const HAIRLINE = 'rgba(20,18,14,0.12)'
const PANEL_BG = '#F3F1EC'

/* ── Options ────────────────────────────────────────────────────────── */
// Reds ranked for "premium-but-warm, founder-led" + Saffron (the 2nd option).
// base = button/fill · deep = text-on-light & eyebrow · on = text on the fill.
const ACCENTS = [
  {name: 'Pomegranate', base: '#9E1B32', deep: '#821327', on: '#FBF8F2'},
  {name: 'Bordeaux', base: '#6E1F2A', deep: '#4E1620', on: '#FFFFFF'},
  {name: 'Vermilion', base: '#B23A20', deep: '#8F2E18', on: '#FBF8F2'},
  {name: 'Cherry', base: '#A31D34', deep: '#7E1528', on: '#FFFFFF'},
  {name: 'Carmine', base: '#A20D2E', deep: '#7C0A23', on: '#FFFFFF'},
  {name: 'Brick', base: '#9A3324', deep: '#79271B', on: '#FFFFFF'},
  // Saffron — done per the rule: DEEP saffron fill + cream text (never bright
  // #C4820A with dark/white text; bright turmeric is large-decorative only).
  {name: 'Saffron', base: '#8B5C06', deep: '#6E4905', on: '#F8F4EA'}
]

const BGS = [
  {name: 'White', hex: '#FFFFFF'},
  {name: 'Ivory', hex: '#FBF8F2'},
  {name: 'Cream', hex: '#F8F4EA'},
  {name: 'Linen', hex: '#FAF6EE'},
  {name: 'Paper', hex: '#F5F6F3'},
  {name: 'Bone', hex: '#F1ECE2'},
  {name: 'Warm Gray', hex: '#EDEBE5'}
]

const DISPLAY = [
  {label: 'Lora', v: 'var(--font-lora)'},
  {label: 'Fraunces', v: 'var(--font-fraunces)'},
  {label: 'Newsreader', v: 'var(--font-newsreader)'},
  {label: 'Outfit', v: 'var(--font-outfit)'},
  {label: 'Geist', v: 'var(--font-geist)'}
]

const BODY = [
  {label: 'Figtree', v: 'var(--font-figtree)'},
  {label: 'Plus Jakarta', v: 'var(--font-jakarta)'},
  {label: 'Outfit', v: 'var(--font-outfit)'},
  {label: 'Manrope', v: 'var(--font-manrope)'},
  {label: 'Geist', v: 'var(--font-geist)'}
]

const RADII = [
  {label: 'Square', px: 2},
  {label: 'Soft', px: 8},
  {label: 'Pill', px: 999}
]

const MONO = 'var(--font-dm-mono)'
const SPEC_ROWS: [string, string][] = [
  ['ORIGIN', 'India'],
  ['HS CODE', '0712.20'],
  ['MOQ', '1x20 FCL'],
  ['LEAD', '2-3 wks']
]
const NAV = ['About', 'Capabilities', 'Products', 'Certifications', 'Contact']
const CERTS = ['FSSAI', 'APEDA', 'FIEO', 'Spice Board']

/* ── Colour helpers (for the custom shade wheel) ────────────────────── */
function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return {r: parseInt(f.slice(0, 2), 16), g: parseInt(f.slice(2, 4), 16), b: parseInt(f.slice(4, 6), 16)}
}
function toHex(n: number) {
  return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
}
function darken(hex: string, f: number) {
  const {r, g, b} = hexToRgb(hex)
  return `#${toHex(r * (1 - f))}${toHex(g * (1 - f))}${toHex(b * (1 - f))}`
}
function onText(hex: string) {
  const {r, g, b} = hexToRgb(hex)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum < 0.55 ? '#FBF8F2' : '#14120E'
}

// Robust clipboard copy: Clipboard API in secure contexts, with a legacy
// execCommand fallback (works on http/localhost and older browsers). Returns
// true only when the copy actually succeeded.
async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-9999px'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

type Accent = {name: string; base: string; deep: string; on: string}

/* ── Live hero preview (no product samples) ─────────────────────────── */
function HeroPreview({
  accent,
  bg,
  display,
  body,
  radius
}: {
  accent: Accent
  bg: (typeof BGS)[number]
  display: string
  body: string
  radius: number
}) {
  const chip = 'rgba(20,18,14,0.14)'
  return (
    <div style={{background: 'rgba(20,18,14,0.04)', border: `1px solid ${HAIRLINE}`, borderRadius: 30, padding: 7, boxShadow: '0 40px 80px -40px rgba(40,30,15,0.34)'}}>
      <div style={{position: 'relative', background: bg.hex, color: INK, borderRadius: 23, overflow: 'hidden', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)'}}>
        <div style={{position: 'relative', padding: 'clamp(24px, 4vw, 56px)'}}>
          {/* nav */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingBottom: 'clamp(36px, 6vw, 72px)'}}>
            <span style={{fontFamily: display, fontWeight: 600, fontSize: 19, letterSpacing: '0.18em', color: INK}}>TRAYA</span>
            <div style={{display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap'}}>
              {NAV.map((n) => (
                <span key={n} style={{fontFamily: body, fontSize: 13.5, color: MUTED}}>{n}</span>
              ))}
              <span style={{fontFamily: body, fontSize: 13, fontWeight: 600, color: accent.on, background: accent.base, padding: '9px 16px', borderRadius: radius}}>
                Get a Quote
              </span>
            </div>
          </div>

          {/* copy column */}
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22}}>
            <span style={{width: 34, height: 1, background: accent.deep, display: 'inline-block'}} />
            <span style={{fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent.deep}}>
              Diversified Trade House · India
            </span>
          </div>

          <h3 style={{fontFamily: display, fontWeight: 600, fontSize: 'clamp(32px, 4.8vw, 58px)', lineHeight: 1.05, letterSpacing: '-0.015em', margin: 0, maxWidth: 720, color: INK}}>
            Sourced in India.
            <br />
            Shipped with{' '}
            <span style={{position: 'relative', color: accent.base, whiteSpace: 'nowrap'}}>
              proof
              <span aria-hidden style={{position: 'absolute', left: 0, right: 0, bottom: '0.06em', height: 2, background: accent.base, opacity: 0.5}} />
            </span>
            .
          </h3>

          <p style={{fontFamily: body, fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.6, color: MUTED, maxWidth: 520, margin: '22px 0 0'}}>
            151 SKUs across 18 categories — dehydrates, spray-dried powders, spices and more. Every
            order ships with FSSAI and APEDA papers, specs, and a sample on request. Founder-led by
            Neha Pardeshi.
          </p>

          <div style={{display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', marginTop: 30}}>
            <span style={{fontFamily: body, fontSize: 14, fontWeight: 600, color: accent.on, background: accent.base, padding: '12px 22px', borderRadius: radius}}>
              Request a sample
            </span>
            <span style={{fontFamily: body, fontSize: 14, fontWeight: 600, color: INK, borderBottom: `1.5px solid ${accent.base}`, paddingBottom: 2}}>
              Download the catalogue →
            </span>
          </div>

          <div style={{marginTop: 'clamp(26px, 3.5vw, 40px)', display: 'flex', flexWrap: 'wrap', border: `1px solid ${chip}`, borderRadius: 8, overflow: 'hidden', maxWidth: 520}}>
            {SPEC_ROWS.map(([k, v], i) => (
              <div key={k} style={{flex: '1 1 110px', padding: '10px 14px', borderLeft: i ? `1px solid ${chip}` : 'none'}}>
                <div style={{fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', color: MUTED}}>{k}</div>
                <div style={{fontFamily: MONO, fontSize: 13, fontWeight: 500, color: INK, marginTop: 3}}>{v}</div>
              </div>
            ))}
          </div>

          {/* cert line */}
          <div style={{marginTop: 'clamp(28px, 4.5vw, 48px)', paddingTop: 22, borderTop: `1px solid ${chip}`, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'}}>
            <span style={{fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: MUTED}}>CERTIFIED</span>
            {CERTS.map((c) => (
              <span key={c} style={{fontFamily: MONO, fontSize: 12, fontWeight: 500, color: INK}}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Controls ───────────────────────────────────────────────────────── */
function CtrlLabel({children}: {children: React.ReactNode}) {
  return (
    <p style={{fontFamily: 'var(--font-jakarta)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED_HARD, margin: '0 0 12px'}}>
      {children}
    </p>
  )
}

function Segmented({options, idx, onSelect, fontKey}: {options: {label: string; v?: string}[]; idx: number; onSelect: (i: number) => void; fontKey?: boolean}) {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
      {options.map((o, i) => {
        const active = i === idx
        return (
          <button
            key={o.label}
            onClick={() => onSelect(i)}
            style={{
              fontFamily: fontKey && o.v ? o.v : 'var(--font-jakarta)',
              fontSize: 13,
              fontWeight: 600,
              color: active ? '#FFFFFF' : INK,
              background: active ? INK : '#FFFFFF',
              border: `1px solid ${active ? INK : HAIRLINE}`,
              borderRadius: 8,
              padding: '8px 14px',
              cursor: 'pointer'
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function DesignStudio() {
  const [accentIdx, setAccentIdx] = useState(0)
  const [custom, setCustom] = useState<string | null>(null)
  const [bgIdx, setBgIdx] = useState(1)
  const [displayIdx, setDisplayIdx] = useState(0)
  const [bodyIdx, setBodyIdx] = useState(0)
  const [radiusIdx, setRadiusIdx] = useState(1)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  const accent: Accent = custom
    ? {name: 'Custom', base: custom, deep: darken(custom, 0.4), on: onText(custom)}
    : ACCENTS[accentIdx]
  const bg = BGS[bgIdx]
  const display = DISPLAY[displayIdx]
  const body = BODY[bodyIdx]
  const radius = RADII[radiusIdx]

  function reset() {
    setAccentIdx(0)
    setCustom(null)
    setBgIdx(1)
    setDisplayIdx(0)
    setBodyIdx(0)
    setRadiusIdx(1)
  }

  async function copySetup() {
    const text = [
      'Traya — Hero Direction 01 (chosen setup)',
      '',
      `Primary:     ${accent.name}  ${accent.base}  (deep ${accent.deep}, text ${accent.on})`,
      `Background:  ${bg.name}  ${bg.hex}`,
      `Ink / text:  ${INK}`,
      `Display:     ${display.label}`,
      `Body:        ${body.label}`,
      `Buttons:     ${radius.label} (${radius.px}px radius)`
    ].join('\n')
    const ok = await copyText(text)
    setCopyState(ok ? 'copied' : 'error')
    window.setTimeout(() => setCopyState('idle'), 2200)
  }

  return (
    <main style={{background: '#E8E7E3', minHeight: '100dvh', color: INK, fontFamily: 'var(--font-jakarta)'}}>
      <div style={{maxWidth: 1280, margin: '0 auto', padding: 'clamp(24px, 4vw, 48px)'}}>
        {/* header */}
        <div style={{marginBottom: 28}}>
          <p style={{fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent.deep, margin: '0 0 8px'}}>
            Direction 01 · Live Prototype
          </p>
          <h1 style={{fontFamily: display.v, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.015em', margin: 0}}>
            Configure the hero, then copy the setup.
          </h1>
          <p style={{fontSize: 14, lineHeight: 1.6, color: MUTED_HARD, maxWidth: 620, margin: '8px 0 0'}}>
            Try the colour, background, fonts and button shape — use the colour wheel to dial in the
            exact red. When a combination feels right, hit <strong>Copy setup</strong> and send it back;
            that becomes the locked direction we build the site in.
          </p>
        </div>

        {/* layout: controls + preview */}
        <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 24, alignItems: 'start'}} className="ds-grid">
          {/* controls */}
          <aside
            style={{
              background: PANEL_BG,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 16,
              padding: 22,
              position: 'sticky',
              top: 24,
              alignSelf: 'start'
            }}
          >
            <CtrlLabel>Primary colour</CtrlLabel>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center'}}>
              {ACCENTS.map((a, i) => {
                const active = !custom && i === accentIdx
                return (
                  <button
                    key={a.name}
                    title={`${a.name} ${a.base}`}
                    onClick={() => {
                      setAccentIdx(i)
                      setCustom(null)
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: a.base,
                      border: '2px solid #FFFFFF',
                      boxShadow: active ? `0 0 0 2px ${INK}` : `0 0 0 1px ${HAIRLINE}`,
                      cursor: 'pointer'
                    }}
                  />
                )
              })}

              {/* colour wheel — pick any shade (great for dialling in the red) */}
              <label title="Pick any shade (colour wheel)" style={{position: 'relative', width: 30, height: 30, cursor: 'pointer'}}>
                <input
                  type="color"
                  value={custom ?? accent.base}
                  onChange={(e) => setCustom(e.target.value)}
                  style={{position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%'}}
                />
                <span
                  style={{
                    display: 'block',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'conic-gradient(#ff0000,#ff8a00,#ffe600,#34c759,#00b8d4,#2962ff,#aa00ff,#ff0000)',
                    border: '2px solid #FFFFFF',
                    boxShadow: custom ? `0 0 0 2px ${INK}` : `0 0 0 1px ${HAIRLINE}`
                  }}
                />
              </label>
            </div>
            <p style={{fontFamily: MONO, fontSize: 11, color: MUTED_HARD, margin: '10px 0 0'}}>
              {custom ? `Custom · ${custom}` : `${accent.name} · ${accent.base}`}
            </p>

            <div style={{height: 1, background: HAIRLINE, margin: '20px 0'}} />

            <CtrlLabel>Background</CtrlLabel>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
              {BGS.map((b, i) => (
                <button
                  key={b.name}
                  title={`${b.name} ${b.hex}`}
                  onClick={() => setBgIdx(i)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: b.hex,
                    border: '2px solid #FFFFFF',
                    boxShadow: i === bgIdx ? `0 0 0 2px ${INK}` : `0 0 0 1px ${HAIRLINE}`,
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
            <p style={{fontFamily: MONO, fontSize: 11, color: MUTED_HARD, margin: '10px 0 0'}}>
              {bg.name} · {bg.hex}
            </p>

            <div style={{height: 1, background: HAIRLINE, margin: '20px 0'}} />

            <CtrlLabel>Display font</CtrlLabel>
            <Segmented options={DISPLAY} idx={displayIdx} onSelect={setDisplayIdx} fontKey />

            <div style={{height: 16}} />
            <CtrlLabel>Body font</CtrlLabel>
            <Segmented options={BODY} idx={bodyIdx} onSelect={setBodyIdx} fontKey />

            <div style={{height: 20}} />
            <CtrlLabel>Button shape</CtrlLabel>
            <Segmented options={RADII} idx={radiusIdx} onSelect={setRadiusIdx} />

            <div style={{height: 1, background: HAIRLINE, margin: '22px 0'}} />

            <button
              onClick={copySetup}
              style={{
                width: '100%',
                fontFamily: 'var(--font-jakarta)',
                fontSize: 14,
                fontWeight: 700,
                color: accent.on,
                background: accent.base,
                border: 'none',
                borderRadius: 8,
                padding: '13px',
                cursor: 'pointer'
              }}
            >
              {copyState === 'copied' ? 'Copied ✓' : copyState === 'error' ? 'Copy failed — try again' : 'Copy setup'}
            </button>
            <button
              onClick={reset}
              style={{width: '100%', fontFamily: 'var(--font-jakarta)', fontSize: 13, fontWeight: 600, color: MUTED_HARD, background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 10}}
            >
              Reset to recommended
            </button>
          </aside>

          {/* preview */}
          <div>
            <HeroPreview accent={accent} bg={bg} display={display.v} body={body.v} radius={radius.px} />
          </div>
        </div>
      </div>

      {/* responsive: controls beside preview on wide screens */}
      <style dangerouslySetInnerHTML={{__html: '@media (min-width: 1024px){.ds-grid{grid-template-columns: 300px minmax(0, 1fr) !important;}}'}} />
    </main>
  )
}
