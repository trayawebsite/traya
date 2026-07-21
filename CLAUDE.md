# CLAUDE.md — Traya International Exim LLP website

Operating contract for this project. Auto-loaded each session. The detailed "gold" lives in `.claude/` — **read the relevant doc before building.**

## What this is
A marketing + catalogue website for **Traya International Exim LLP** — a diversified Indian food-ingredient & chemicals EXPORT house (452 products / 28 categories, per the client's final list 2026-07-20; founder Neha Pardeshi). Brand: refined, founder-led, partnership-first, **premium-but-warm**. Global B2B buyers.
Stack: **Next.js 16 (App Router) · React 19 · TS · Tailwind 4 · next-intl 4 · Sanity CMS · Resend · Google Sheets · Vercel · pnpm 11**.

## 📚 Knowledge base — read before relevant work (all in `.claude/`)
| Doc | Use it for |
|---|---|
| [PROJECT_STATUS.md](.claude/PROJECT_STATUS.md) | Current status, scope (28-pt contract), locked decisions, open items |
| [TODO.md](.claude/TODO.md) | Master build checklist (12 phases) + finalized site map |
| [company-profile.md](.claude/company-profile.md) | Brand copy, voice, founder, product universe, content hierarchy |
| [design-system.md](.claude/design-system.md) | **Canonical tokens** — colors, fonts, scale, usage rules (implemented in `app/globals.css`) |
| [design-playbook.md](.claude/design-playbook.md) | **How to build each page** — section order, hero, hub/category/PDP layouts, nav, conversion, motion, anti-patterns (from 13-site teardown) |
| [research-findings.md](.claude/research-findings.md) | IA/conversion/design evidence (cited, verified) |

## 🔒 Locked decisions (do not re-litigate)
- **IA / routes:** `/`, `/about`, `/capabilities`, `/products` (hub: 6 groups → 30 categories, incl. Chemicals & Dyes), `/categories/[slug]` (rich), `/products/[slug]` (light, flat URL), `/certifications`, `/contact`, `/enquiry` (cart-style RFQ).
- **Design direction:** **Vermilion** — client-confirmed. Primary accent **`#B5341A`** (deep `#6D1F10`, white button text) · ivory bg `#FBF8F2` · ink `#14120E` · **Lora** display + **Figtree** body + DM Mono specs · soft 8px buttons · **light-only (no dark mode)**. Forest is a meaningful secondary (sourcing/quality); **saffron is the second brand accent** (gold `#C4820A`, used for highlights — stat numbers, icon chips, footer rule, badges; see `.claude/design-system.md`).
- **Conversion:** cart-style **Enquiry List** + per-product Enquire/Sample + downloadable spec sheets + prominent cert cluster.
- **Email:** Resend (needs verified sending domain). **Leads:** Google Sheets webhook. **Chatbot:** custom Gemini bot (`app/api/chat` — needs `GEMINI_API_KEY`), not Crisp. **Stat:** "450+ products".
- **Rendering:** SSG + ISR. **Product depth:** rich category pages + light SKU pages.

## ✅ Non-negotiable build rules
1. **Use the design tokens — never raw hex.** Style via `bg-background`, `text-foreground`, `bg-primary` (= vermilion), `border-border`, `text-traya-red-deep`, `font-display`, `text-display-lg`, `py-section`, `ease-expo`, etc. (all in `app/globals.css`). Re-theming must be a token change, not a component rewrite.
2. **Red ≤ 2% of any view.** Ivory + whitespace + Lora carry the design; vermilion only punctuates (eyebrow, primary CTA, one deep CTA band). Forest is the meaningful secondary (sourcing/quality). **Keep `--destructive` (cool crimson) visually distinct from the brand red** — a delete/error must never look like a primary CTA.
3. **Fonts:** Lora = display/headlines only; Figtree = body/UI; DM Mono = specs/data. Never body in Lora, never a headline in Figtree.
4. **Separate logic from design.** Content/config in `lib/` + i18n messages; behavior in hooks/containers; presentation in dumb, prop-driven, token-styled components. Finalizing the look later must touch only the presentation layer.
5. **Build pages per [design-playbook.md](.claude/design-playbook.md)** — its section order, hero, and layout specs, with "borrowed from" rationale.
6. **Avoid the anti-patterns** (playbook §⛔): no autoplay hero carousel, no parallax/decorative GSAP, no countdown timers, no GIF/discount-badge spam, no clip-art cert dumps, no cold corporate-blue imagery, no flat-dump of 150 SKUs, no Shop/Add-to-Cart framing. These are the "cheap exporter" tells.
7. **All content is data, not hardcoded** (Sanity/config/i18n) — client edits without a developer.
8. **Honesty rule:** never publish unverified claims (e.g. "40+ countries", specific certs) until client-confirmed.
9. **Keep it green:** `pnpm build` + `pnpm lint` must pass; responsive at 360/768/1280; respect `prefers-reduced-motion`; WCAG AA contrast.

## Conventions
- Package manager: **pnpm**. Frontend lives in route group `app/(frontend)/[locale]/`; Studio in `app/(studio)/studio/`.
- Product URLs flat `/products/[slug]`; category pages at `/categories/[slug]` (separate roots).
- Motion: one entrance signature (opacity+translateY 24px, ~650ms `ease-expo`, 70ms stagger); hovers 150ms. Restraint = premium.
- WhatsApp button color `#25D366` (`--whatsapp`) never changes.
