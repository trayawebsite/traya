# Traya Design System — Saffron Route (IMPLEMENTED)

> Canonical reference for building UI. Everything here is **wired in code** ([app/globals.css](../app/globals.css) + [app/(frontend)/[locale]/layout.tsx](<../app/(frontend)/[locale]/layout.tsx>)) and verified (`pnpm build` + `pnpm lint` clean, 2026-06-10). Research-validated direction (see [research-findings.md](./research-findings.md) §4).

## Register
Premium-but-warm food-ingredient house. **Earthy neutrals carry the page; saffron punctuates (≤2%); forest is the meaningful secondary.** Whitespace + hierarchy + restraint = the premium signal. Avoid: clinical white, saturated primaries, flag/tricolor motifs, gradients + heavy shadows everywhere.

## Color tokens
Brand utilities: `bg-traya-*`, `text-traya-*`, `border-traya-*`. Semantic utilities (`bg-background`, `bg-primary`, `text-muted-foreground`, `ring`, …) are **mapped onto the brand palette**, so shadcn components are on-brand automatically.

| Token | Hex | Utility | Role |
|---|---|---|---|
| deep | `#100D08` | `traya-deep` | hero / footer / CTA bands / dark sections |
| deep-mid | `#1C1811` | `traya-deep-mid` | dark cards |
| ink | `#14120E` | `traya-ink` / `foreground` | primary text (warm near-black) |
| cream | `#F8F4EA` | `traya-cream` / `background` | **primary bg — never clinical white** |
| card | `#FCFAF4` | `traya-card` / `card` | cards (subtle lift off cream) |
| surface | `#EEE7D4` | `traya-surface` / `secondary`,`muted`,`accent` | alternate sections, tonal cards, subtle hovers |
| border | `#E0D8C5` | `traya-border` / `border`,`input` | hairlines, dividers, form underlines |
| saffron | `#C4820A` | `traya-saffron` / `ring` | **THE accent** — CTAs, badge borders, focus ring (non-text / large only) |
| saffron-hi | `#E8A81F` | `traya-saffron-hi` | saffron on dark backgrounds |
| saffron-lo | `#8B5C06` | `traya-saffron-lo` | **saffron as TEXT on cream** (WCAG AA 5.2:1) |
| saffron-soft | `#F3E7CC` | `traya-saffron-soft` | soft tint — badge/highlight backgrounds |
| forest | `#1C4230` | `traya-forest` | agriculture/nature secondary (sourcing, quality) |
| forest-mid | `#2D5E42` | `traya-forest-mid` | forest accents |
| slate | `#6E6456` | `traya-slate` / `muted-foreground` | secondary text, captions, metadata |

**Usage rules (enforced by convention):**
- Saffron ≤2% of any page. For text on cream use `saffron-lo`; for fills/borders/large use `saffron`; on dark use `saffron-hi`.
- Forest is the secondary — reserve for sourcing/origin/quality so it stays meaningful.
- Primary button = `bg-primary text-primary-foreground` (ink on cream). `accent` is surface (subtle hovers) — **never** saffron, or hovers go loud.
- `.dark` theme is coherent if toggled, but the site is light-first — dark *sections* use `bg-traya-deep` directly.

## Typography
Loaded via `next/font` on `<html>`. Headings (`h1–h4`) default to Fraunces in base CSS.

| Role | Font | Utility | Use |
|---|---|---|---|
| Display | **Fraunces** (variable optical serif, italic avail) | `font-display` | H1–H4, hero, pull-quotes, stat numbers, founder quote |
| Body / UI | **Figtree** (humanist sans) | `font-sans` (default) / `font-body` | body, nav, buttons, forms, labels |
| Technical | **DM Mono** | `font-mono` / `font-code` | specs, HS codes, MOQ, product codes |

- Never set body in Fraunces; never set a headline in Figtree.
- Use Fraunces **italic** for pull-quotes / founder letter (editorial warmth).

### Display type scale (fluid)
`text-display-xl` · `text-display-lg` · `text-display` · `text-display-sm` — clamp-based, line-heights + tracking baked in. Use with `font-display`.

### Section-label pattern (identity-defining)
`.section-label` component class → Figtree 11px · 600 · 0.12em tracking · UPPERCASE · saffron-lo. The amber eyebrow above every section heading. Add `.on-dark` (or inside `.dark`) → saffron-hi.

## Spacing, container, radius
- Section rhythm: `py-section-sm` (64) · `py-section` (96) · `py-section-lg` (128) · `py-section-xl` (160).
- Container: `max-w-page` (1320px), center with `mx-auto`, pad `px-6` mobile → `px-10`/`px-20` up.
- Radius: base 8px — `rounded-sm` (4) · `rounded-md` (6) · `rounded-lg` (8) · `rounded-xl` (12). Keep restrained.

## Shadows & motion
- Warm-tinted shadows (low-contrast, premium): `shadow-xs` → `shadow-xl` (ink-tinted, soft).
- Easing: `ease-expo` = `cubic-bezier(0.16, 1, 0.3, 1)` — all entrances. Durations (CSS vars): `--duration-fast` 150ms (hovers), `--duration-base` 300ms, `--duration-slow` 650ms (scroll reveals).
- Scroll reveal: opacity 0→1 + translateY 24→0, 650ms `ease-expo`, stagger ~70ms. No parallax, no decorative motion.

## Accessibility
- `foreground` ink on cream, `muted-foreground` slate on cream (~4.95:1), `saffron-lo` on cream (5.2:1), dark text on saffron (~5.7:1) — all pass AA for normal text. `ring` is saffron for visible brand focus.
