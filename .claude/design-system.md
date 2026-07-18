# Traya Design System — Vermilion (IMPLEMENTED)

> Canonical reference for building UI. Everything here is **wired in code** ([app/globals.css](../app/globals.css) + [app/(frontend)/[locale]/layout.tsx](<../app/(frontend)/[locale]/layout.tsx>)) and verified (`pnpm build` + `pnpm lint` clean). **Client-confirmed direction.** Light-only — there is no dark mode.

## Register
Premium-but-warm **diversified trade house** (food/agro today, widening later). **Warm ivory + ink carry the page; vermilion red punctuates (≤2%); forest is the meaningful secondary.** Whitespace + hierarchy + restraint = the premium signal. Avoid: clinical white, neon/scarlet red, flag-orange, gradients + heavy shadows everywhere.

## Color tokens
Brand utilities: `bg-traya-*`, `text-traya-*`, `border-traya-*`. Semantic utilities (`bg-background`, `bg-primary`, `text-muted-foreground`, `ring`, …) are **mapped onto the brand palette**, so shadcn components are on-brand automatically.

| Token | Hex | Utility | Role |
|---|---|---|---|
| deep | `#1a1008` | `traya-deep` | hero / footer / CTA bands / dark *sections* (warm espresso; was `#100D08`) |
| deep-mid | `#1C1811` | `traya-deep-mid` | dark cards |
| ink | `#14120E` | `traya-ink` / `foreground` | primary text (warm near-black) |
| cream (ivory) | `#FBF8F2` | `traya-cream` / `background` | **primary bg — warm ivory** |
| card | `#FFFFFF` | `traya-card` / `card` | cards (clean white lift off ivory) |
| surface | `#F4EFE6` | `traya-surface` / `secondary`,`muted`,`accent` | alternate sections, tonal cards, subtle hovers |
| border | `#EBE4D7` | `traya-border` / `border`,`input` | hairlines, dividers, form underlines |
| **red (vermilion)** | **`#B5341A`** | `traya-red` / `primary` / `ring` | **THE accent** — primary buttons, CTAs, active states, focus ring |
| red-deep | `#6D1F10` | `traya-red-deep` | hover · **red-as-text on ivory** (~10:1) · deep CTA bands · section-label |
| red-hi | `#E0795E` | `traya-red-hi` | red on **dark** backgrounds (eyebrows on deep sections) |
| red-soft | `#F6E3DC` | `traya-red-soft` | soft tint — badges / highlight backgrounds |
| forest | `#1C4230` | `traya-forest` | **secondary** — sourcing/quality (pairs with vermilion) |
| forest-mid | `#2D5E42` | `traya-forest-mid` | forest accents |
| slate | `#6E6456` | `traya-slate` / `muted-foreground` | secondary text, captions, metadata |
| clay | `#A67B5B` | `traya-clay` | warm tan/oak — dividers, icon strokes, decorative accents, text on **dark** sections (~4.8:1). NOT body text on ivory (~3.6:1). Adds earthy depth (from the wine-bar reference). |
| saffron* | `#C4820A` (+hi/lo/soft) | `traya-saffron*` | **2nd brand accent (gold)** — highlights (stat numbers, icon chips, footer rule, badges). One visible value `#C4820A`; hi/lo/soft = same hue, contrast-adjusted (dark glow / AA text-on-light / soft fills) |
| whatsapp | `#25D366` | `traya-whatsapp` | WhatsApp button only — never changes |

**Usage rules (enforced by convention):**
- **Red ≤2% of any view.** Ivory + whitespace + Lora carry it; vermilion punctuates (eyebrow, primary CTA, one deep band).
- Text on ivory: use **`red-deep #6D1F10`** (`#B5341A` itself is 5.5:1 — OK for ≥large/bold, marginal for small). On **dark** sections use **`red-hi #E0795E`**.
- **Buttons — exactly TWO CTA types:** (1) **primary** = `bg-primary text-primary-foreground` (vermilion + WHITE text, ~6:1), soft **`rounded-lg`**; (2) **secondary** = `.btn-ring` glowing vermilion hairline, **`rounded-full` (pill)**. Always from `lib/button-styles.ts` / `home/styles.ts` — never a one-off. The WhatsApp + chatbot floats and the Enquire tab are a **separate utility family** (their own shapes); add nothing else that reads as a CTA button.
- `accent` is surface (subtle hovers) — **never** the brand red.
- **`--destructive` is a cooler crimson `#A8132F`** — intentionally distinct from the warm brand red so delete/error never reads as a primary CTA. Never use brand red for error states.
- Forest is the secondary — reserve for sourcing/origin/quality so it stays meaningful.
- **Light-only.** No `.dark` block; don't add dark variants.

## Typography
Loaded via `next/font` on `<html>`. Headings (`h1–h4`) default to Lora in base CSS.

| Role | Font | Utility | Use |
|---|---|---|---|
| Display | **Lora** (calligraphic serif, italic avail) | `font-display` | H1–H4, hero, pull-quotes, stat numbers, founder quote |
| Body / UI | **Figtree** (humanist sans) | `font-sans` (default) / `font-body` | body, nav, buttons, forms, labels |
| Technical | **DM Mono** | `font-mono` / `font-code` | specs, HS codes, MOQ, product codes, lot/COA motif |

- Never set body in Lora; never set a headline in Figtree.
- Use Lora **italic** for pull-quotes / founder letter (editorial warmth).

### Display type scale (fluid)
`text-display-xl` · `text-display-lg` · `text-display` · `text-display-sm` — clamp-based, line-heights + tracking baked in. Use with `font-display`.

### Section-label pattern (identity-defining)
`.section-label` component class → Figtree 11px · 600 · 0.12em tracking · UPPERCASE · **red-deep**. The vermilion eyebrow above every section heading. Add `.on-dark` → red-hi.

## Spacing, container, radius
- Section rhythm: `py-section-sm` (64) · `py-section` (96) · `py-section-lg` (128) · `py-section-xl` (160).
- Container: `max-w-page` (1320px), center `mx-auto`, pad `px-6` → `px-10`/`px-16`.
- Radius: base 8px — `rounded-sm` (4) · `rounded-md` (6) · `rounded-lg` (8, soft buttons) · `rounded-xl` (12).

## Shadows & motion
- Warm-tinted shadows (low-contrast): `shadow-xs` → `shadow-xl` (ink-tinted, soft).
- Easing: `ease-expo` = `cubic-bezier(0.16, 1, 0.3, 1)` — all entrances. Durations: `--duration-fast` 150ms (hovers), `--duration-base` 300ms, `--duration-slow` 650ms (reveals).
- Scroll reveal: opacity 0→1 + translateY 24→0, 650ms `ease-expo`, ~70ms stagger. No parallax/decorative motion.

## Accessibility
- ink on ivory (very high), `muted-foreground` slate on ivory (~4.9:1), `red-deep` on ivory (~10:1), **white on vermilion (~6:1)**, red-hi on deep (~5:1) — all pass AA. `ring` is vermilion for visible brand focus. Respect `prefers-reduced-motion`.
