'use client'

import {useState} from 'react'

/* Saffron Route palette — inline so the demo is self-contained. */
const C = {
  deep: '#100D08',
  deepMid: '#1C1811',
  cream: '#FDFAF4',
  surface: '#F4EFE6',
  border: '#EBE4D7',
  saffron: '#B5341A',
  saffronHi: '#D9583C',
  saffronLo: '#8F2814',
  forest: '#1C4230',
  slate: '#6E6456',
  error: '#C44F3C',
  success: '#2D7A4F'
} as const

type LeadType = 'contact' | 'inquiry' | 'quote'

// Which fields each lead type sends (mirrors lib/validations.ts).
const FIELDS: Record<LeadType, string[]> = {
  contact: ['name', 'email', 'company', 'message'],
  inquiry: ['name', 'email', 'company', 'country', 'phone', 'productName', 'message'],
  quote: ['name', 'email', 'company', 'country', 'phone', 'productName', 'quantity', 'message']
}

const SAMPLE: Record<string, string> = {
  name: 'Anika Rao',
  email: 'buyer@globalfoods.example',
  company: 'Global Foods GmbH',
  country: 'Germany',
  phone: '+49 151 23456789',
  productName: 'Dehydrated White Onion Powder',
  quantity: '5,000 kg / month',
  message: 'We are sourcing for Q3. Please share specs, MOQ, and FOB pricing.'
}

const label = (k: string) =>
  ({productName: 'Product', quantity: 'Quantity'} as Record<string, string>)[k] ??
  k.charAt(0).toUpperCase() + k.slice(1)

export default function LeadDemo() {
  const [type, setType] = useState<LeadType>('quote')
  const [values, setValues] = useState<Record<string, string>>(SAMPLE)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<unknown>(null)
  const [status, setStatus] = useState<number | null>(null)

  const set = (k: string, v: string) => setValues((s) => ({...s, [k]: v}))

  async function submit() {
    setLoading(true)
    setResult(null)
    setStatus(null)
    const payload: Record<string, string> = {}
    for (const k of FIELDS[type]) payload[k] = values[k] ?? ''
    try {
      // One route per form type: /api/contact, /api/inquiry, /api/quote
      const res = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      setStatus(res.status)
      setResult(await res.json())
    } catch (err) {
      setResult({ok: false, error: String(err)})
    } finally {
      setLoading(false)
    }
  }

  const r = result as
    | {
        ok?: boolean
        email?: {sent: boolean; to: string[]; id?: string; error?: string}
        sheet?: {ok: boolean; configured: boolean; status?: number; error?: string}
        error?: string
      }
    | null

  return (
    <main
      style={{
        background: C.cream,
        minHeight: '100vh',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        color: C.deep,
        padding: '40px 20px'
      }}
    >
      <div style={{maxWidth: 760, margin: '0 auto'}}>
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
          Lead Pipeline Demo
        </h1>
        <p style={{fontSize: 14, lineHeight: '22px', color: C.slate, marginBottom: 28}}>
          Submits to the real <code style={{color: C.saffronLo}}>/api/contact</code>,{' '}
          <code style={{color: C.saffronLo}}>/api/inquiry</code> and{' '}
          <code style={{color: C.saffronLo}}>/api/quote</code> routes — same zod validation, same
          Resend multi-recipient fan-out, same Google Sheets log the production forms will use. Fill
          in <code style={{color: C.saffronLo}}>.env.local</code> first.
        </p>

        {/* Type selector */}
        <div style={{display: 'flex', gap: 8, marginBottom: 24}}>
          {(['contact', 'inquiry', 'quote'] as LeadType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 4,
                border: `1.5px solid ${type === t ? C.saffron : C.border}`,
                background: type === t ? C.saffron : 'transparent',
                color: type === t ? C.cream : C.slate,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 20, rowGap: 28, marginBottom: 28}}>
          {FIELDS[type].map((k) => (
            <div key={k} style={{gridColumn: k === 'message' ? '1 / -1' : undefined}}>
              <label
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: C.slate,
                  marginBottom: 6
                }}
              >
                {label(k)}
              </label>
              {k === 'message' ? (
                <textarea
                  value={values[k] ?? ''}
                  onChange={(e) => set(k, e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 4,
                    padding: '10px 12px',
                    fontSize: 14,
                    color: C.deep,
                    resize: 'vertical'
                  }}
                />
              ) : (
                <input
                  value={values[k] ?? ''}
                  onChange={(e) => set(k, e.target.value)}
                  style={{
                    width: '100%',
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 4,
                    padding: '10px 12px',
                    fontSize: 14,
                    color: C.deep
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            background: C.saffron,
            color: C.cream,
            fontWeight: 700,
            fontSize: 14,
            padding: '13px 26px',
            borderRadius: 4,
            border: 'none',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Submitting…' : `Submit ${type} lead →`}
        </button>

        {/* Result */}
        {r && (
          <div style={{marginTop: 28}}>
            <div style={{display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap'}}>
              <Badge
                label="HTTP"
                value={String(status)}
                ok={status !== null && status < 400}
              />
              {r.email && (
                <Badge
                  label={`Email → ${r.email.to.length} recipient(s)`}
                  value={r.email.sent ? 'sent' : r.email.error || 'not sent'}
                  ok={r.email.sent}
                />
              )}
              {r.sheet && (
                <Badge
                  label="Google Sheets"
                  value={
                    !r.sheet.configured
                      ? 'no URL set'
                      : r.sheet.ok
                        ? `logged (${r.sheet.status})`
                        : r.sheet.error || `failed (${r.sheet.status})`
                  }
                  ok={r.sheet.ok}
                />
              )}
            </div>
            {r.email?.to && r.email.to.length > 0 && (
              <p style={{fontSize: 12, color: C.slate, marginBottom: 12}}>
                Recipients: {r.email.to.join(', ')}
              </p>
            )}
            <pre
              style={{
                background: C.deep,
                color: C.cream,
                padding: 16,
                borderRadius: 6,
                fontSize: 12,
                lineHeight: '18px',
                overflowX: 'auto',
                fontFamily: 'ui-monospace, monospace'
              }}
            >
              {JSON.stringify(r, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}

function Badge({label, value, ok}: {label: string; value: string; ok: boolean}) {
  return (
    <div
      style={{
        border: `1px solid ${ok ? '#2D7A4F55' : '#C44F3C55'}`,
        borderRadius: 6,
        padding: '8px 12px',
        background: ok ? '#2D7A4F12' : '#C44F3C12'
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#6E6456',
          marginBottom: 3
        }}
      >
        {label}
      </div>
      <div style={{fontSize: 13, fontWeight: 600, color: ok ? '#2D7A4F' : '#C44F3C'}}>{value}</div>
    </div>
  )
}
