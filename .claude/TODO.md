# Traya International Exim LLP — Master Build TODO

**The complete start-to-finish checklist.** Every feature from the agreed scope (28-point client clarification) plus the build work to deliver it. Keep this as the single source of truth — tick items as they land.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · next-intl 4 · Sanity CMS · Resend · Google Sheets · Vercel · pnpm 11
- **Sister docs (same folder):** [PROJECT_STATUS.md](./PROJECT_STATUS.md) (detailed status + scope table) · [company-profile.md](./company-profile.md) (brand copy, product universe, tone)
- **Legend:** `[x]` done & verified · `[~]` partially done · `[ ]` to do · 🔒 blocked on a decision/client input · `(Qn)` = maps to contract clarification question n

---

## ⛳ The idea in one paragraph
A fast, modern, fully client-editable marketing + catalogue website for **Traya International Exim LLP** — a diversified Indian food-ingredient export house (151 products / 18 categories, from industrial dehydrates to nutraceutical powders to premium retail goods). The site must make 150+ SKUs feel curated (not a catalogue dump), present spec-grade trust signals for very different buyer industries, carry a refined-but-warm founder-led brand, and funnel international B2B buyers into three lead forms + WhatsApp. Built English-first but i18n-ready for future markets.

---

## 🗺️ FINALIZED SITE MAP (research-backed — locked 2026-06-10)
Decided from [research-findings.md](./research-findings.md). IA = "company/solutions-first + browsable catalogue" (Kanegrade/Jain/Synthite model), not a flat product dump.

| Route | Page | Notes |
|---|---|---|
| `/` | Home | hero · capabilities teaser · stats (150+) · category showcase (6 groups) · founder quote · cert cluster · CTA |
| `/about` | About | founder letter+photo · who we are · philosophy · global outlook · why Traya · vision/mission |
| `/capabilities` | Capabilities | ✅ dedicated page — the 5 core capabilities ("solutions house" signal) |
| `/products` | Catalogue hub | **6 group sections → 18 category tiles ABOVE any hero**; grouped, not equal-weight grid |
| `/categories/[slug]` | Category landing | ✅ rich Kanegrade template: Overview · Portfolio/product tiles · MOQ & packaging table · tech specs · applications · quality/compliance · filter/sort |
| `/products/[slug]` | Product detail (light) | flat URL (locked); name · variants · key specs · spec-sheet PDF · **Add to Enquiry / Enquire / Request sample** |
| `/certifications` | Quality & certs | cert cluster (FSSAI/ISO22000/HACCP/Halal/Kosher/organic/APEDA) + traceability promise; emerging-exporter framing |
| `/contact` | Contact | form · details · location · WhatsApp |
| `/enquiry` | ✅ **Enquiry List** | cart-style — batch multiple products → one RFQ (research's #1 conversion lever) |
| `/[...not-found]` | 404 | |

**Decisions locked this round:** RFQ = **cart-style Enquiry List** (+ per-product buttons) · Capabilities = **dedicated page** · Product depth = **rich category pages + light SKU pages**.

**Route note:** products stay flat `/products/[slug]`; categories live at `/categories/[slug]` (separate roots — Next.js can't share `[category]`/`[slug]` at one path level). Breadcrumbs still read Home › Products › Category › Product.

**Schema/build deltas this introduces (beyond original plan):**
- `category` schema: add a **`group`** field (enum: Dehydrates · Powders/Spray-Dried · Nutraceutical/Herbal · Spices & Seasonings · Dairy · Premium Retail) to drive the 6 hub sections + rich-template fields (overview, MOQ table, applications, quality).
- New **Enquiry List** feature: persistent client-side "add to enquiry" state + `/enquiry` page + 4th lead route `app/api/enquiry-list` (batched RFQ → Resend + Sheets).
- New **`/capabilities`** page (7th page, within 5–7 scope).
- Per-SKU **spec-sheet PDF** field on product (client-uploadable via Sanity).

---

## 🔑 Open decisions / client inputs still needed
- 🔒 **Design direction** — Saffron Route (recommended) vs Harvest Deep vs Spice Trade. Build is on hold for *visual* polish until confirmed; tokens default to Saffron Route.
- 🔒 **"40+ countries" stat** — real figure or drop it (don't publish unverified).
- 🔒 **Recipient email IDs** for lead routing — client to provide.
- 🔒 **Chatbot** — Crisp recommended; client to confirm.
- 🔒 **Brand assets** — logo, certification images, brochures/PDF catalogue, founder photo — client to provide.
- 🔒 **Sanity project** — client creates free project at sanity.io/manage → provides `NEXT_PUBLIC_SANITY_PROJECT_ID`.
- 🔒 **Pricing posture** (research Q1) — show FOB/indicative pricing on product pages, or gate all pricing behind RFQ? (default: gate behind RFQ — safer for an exporter, varies by region).
- 🔒 **Multi-region** (research Q3) — surface region-specific certs later (Halal-forward ME · EU-Organic EU · FDA/non-GMO US)? Affects cert page + i18n. Defer to post-launch unless client prioritizes.
- ✅ **Resolved:** Email = Resend · Product stat = "150+" · Rendering = SSG+ISR · **IA locked** (see Site Map) · RFQ = cart-style Enquiry List · Capabilities = dedicated page · Product depth = rich category + light SKU.

---

## PHASE 0 — Foundation `[x] COMPLETE`
- [x] Next 16 + React 19 + Tailwind 4 + TS scaffold, pnpm
- [x] i18n backbone — `i18n/routing.ts`, `navigation.ts`, `request.ts`, `messages/en.json`, `proxy.ts` (Next 16 convention)
- [x] `localePrefix: 'as-needed'` clean URLs (Q22, Q23)
- [x] shadcn/ui on Tailwind v4 + `cn()` helper; base components (Button, Input, Textarea, Label, Sonner)
- [x] `lib/` wrappers — `validations.ts` (zod), `resend.ts`, `sheets.ts`, `lead.ts`
- [x] `.env.example` template
- [x] `pnpm build` + `pnpm lint` pass clean; SSG confirmed

---

## PHASE 1 — Design system finalize `[x] WIRED & VERIFIED 2026-06-10`
- [x] Saffron Route brand tokens in `app/globals.css` (deep/ink/cream/card/surface/border/saffron×4/forest×2/slate)
- [x] **Brand → shadcn semantic layer bridged** (background=cream, primary=ink, ring=saffron, border/muted/accent mapped) — components on-brand automatically
- [x] **Fonts actually wired** — Fraunces (display) · Figtree (body) · DM Mono (specs) via `next/font` on `<html>` (was Geist — fixed)
- [x] Background = cream (was clinical white — fixed)
- [x] Scale tokens added: display type scale (`text-display-*`), section spacing (`py-section-*`), `max-w-page`, warm shadows (`shadow-*`), `ease-expo`, radius scale
- [x] `.section-label` identity pattern; headings default to Fraunces; saffron focus ring + selection
- [x] Canonical reference: [.claude/design-system.md](./design-system.md); `pnpm build`+`lint` clean
- [x] `app/design-directions/page.tsx` — 3 options for client
- [ ] 🔒 **Client confirms direction** (Saffron Route recommended & research-validated) → currently default
- [ ] Build reusable components on this system in Phase 2: Button variants, Card shells, Stat block, CTA banner, Cert badge
- [ ] (optional) `/style-guide` reference page — not built; build only if wanted

---

## PHASE 2 — Global shell (every page depends on this — build first)
- [ ] **Header** — logo, primary nav (Home, About, Products, Certifications, Contact), mobile menu, sticky behaviour
- [ ] **Footer** — company info, nav links, contact details, social, legal line, catalogue download link
- [ ] **WhatsApp floating button** (Q7) — fixed, all pages, `#25D366`, 56px, prefilled message, opens `wa.me`
- [ ] **LanguageSwitcher** — scaffold even with 1 language (Q23); locale-aware
- [ ] `app/[locale]/not-found.tsx` (404)
- [ ] `loading.tsx` / `error.tsx` boundaries
- [ ] Wire shared layout (fonts, `<html lang>`, metadata defaults, Toaster)

---

## PHASE 3 — Sanity CMS (content backbone)
- [x] Schemas — `category`, `product` (+`forms[]` variants), `certification`, `siteSettings`, `aboutPage`, reusable objects (`specRow`, `seo`, `productForm`, `featureItem`, `stat`)
- [x] `siteSettings.catalogueFile` — site-wide PDF catalogue (Q19)
- [x] Embedded Studio at `/studio`; `sanity.config.ts` / `sanity.cli.ts`
- [x] Seed script → `content/seed.ndjson` (18 categories · 151 items → 135 product docs)
- [x] GROQ queries ready in `sanity/lib/queries.ts`
- [ ] **Schema additions (from research IA):**
  - [ ] `category.group` enum (Dehydrates · Powders/Spray-Dried · Nutraceutical/Herbal · Spices & Seasonings · Dairy · Premium Retail) → drives 6 hub sections
  - [ ] `category` rich-template fields — overview, MOQ/packaging rows, applications, quality/compliance notes (Kanegrade template)
  - [ ] `product.specSheet` (uploadable PDF) for per-SKU spec download
  - [ ] polyhierarchy — allow a product/category to reference multiple parent categories
- [ ] 🔒 **Client:** create Sanity project → add `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local` (Q3, Q4)
- [ ] Import seed: `pnpm dlx sanity@latest dataset import content/seed.ndjson production`
- [ ] Wire pages to fetch live Sanity data (replace placeholders)
- [ ] ISR + on-demand revalidation via Sanity webhook (instant content updates)
- [ ] Verify client can add/edit/delete content end-to-end (Q4)

---

## PHASE 4 — Pages (per FINALIZED SITE MAP above, Q2)
- [ ] **Home** `/` — hero · capabilities teaser · stats (**150+ · 18 categories · India**) · 6-group category showcase · founder pull-quote · cert cluster · CTA banner
- [ ] **About** `/about` — founder letter + photo (lead) · who we are / 3 principles · philosophy · global outlook · why Traya · vision/mission
- [ ] **Capabilities** `/capabilities` — the 5 core capabilities, "solutions house" framing
- [ ] **Products hub** `/products` — 6 group sections → 18 category tiles ABOVE any hero; grouped w/ hierarchy, NOT equal-weight dump (Q15)
- [ ] **Category landing** `/categories/[slug]` — rich Kanegrade template: overview · product tiles · MOQ/packaging table · tech specs · applications · quality · filter/sort
- [ ] **Product detail (light)** `/products/[slug]` — flat URL; name · variants · key specs · spec-sheet PDF · Add-to-Enquiry / Enquire / Request-sample (Q10)
- [ ] **Certifications** `/certifications` — cert cluster + what each means to a buyer + traceability; Sanity-editable (Q20)
- [ ] **Contact** `/contact` — form · company details · location · WhatsApp · email
- [ ] **Enquiry List** `/enquiry` — cart-style batched RFQ review + submit
- [ ] **404** `/[...not-found]`
- [ ] Responsive pass on every page — mobile / tablet / desktop (Q5)
- [ ] Breadcrumbs (Home › Products › Category › Product) + polyhierarchy (cross-listed items under multiple categories)

---

## PHASE 5 — Lead generation & forms (the conversion core)
- [x] zod schemas — contact / inquiry / quote (`lib/validations.ts`)
- [x] API routes — `app/api/{contact,inquiry,quote}/route.ts` (thin wrappers over `lib/lead.ts`)
- [x] **Resend** email client — multi-recipient (Q8) — *needs `LEAD_RECIPIENT_EMAILS`*
- [x] **Google Sheets** Apps Script webhook — logs every lead (Q9)
- [x] `app/lead-demo` internal test harness (noindex)
- [ ] **Form UIs** with `react-hook-form` + zod resolver:
  - [ ] Contact Us
  - [ ] Product Inquiry
  - [ ] Request a Quote
  - [ ] Per-product inquiry/quote button → prefilled form/modal (Q10)
- [ ] **Enquiry List (cart-style RFQ)** — research's #1 conversion lever:
  - [ ] Persistent client-side "Add to Enquiry" state (context/localStorage)
  - [ ] "Add to Enquiry" button on product + category tiles
  - [ ] `/enquiry` review page (qty per item, remove, notes)
  - [ ] 4th lead route `app/api/enquiry-list` — batched RFQ → Resend + Sheets (extend `lib/lead.ts` + zod schema)
- [ ] Downloadable per-SKU **spec-sheet PDFs** + site-wide catalogue (Sanity-uploadable)
- [ ] Success / error / loading states + toasts (Sonner)
- [ ] 🔒 Wire **real recipient email IDs** (client to provide)
- [ ] **Resend: verify sending domain** so mail routes to client recipients (free-tier requirement)
- [ ] Spam protection — rate limit (honeypot removed; add if abuse appears)
- [ ] Accessibility — labels, focus states, keyboard, errors announced

---

## PHASE 6 — SEO & performance
- [x] `app/robots.ts` + `app/sitemap.ts` (hreflang alternates, Next 16 native)
- [ ] `generateMetadata()` per page — titles, descriptions (Q11)
- [ ] Image **alt tags** everywhere (Q11)
- [ ] `next/image` for all images — Core Web Vitals (Q14)
- [ ] JSON-LD structured data — `Organization` + `Product`
- [ ] Sitemap includes all products + locales (regenerate on content change)
- [ ] Canonical URLs + OpenGraph / Twitter images
- [ ] 🔒 **Google Search Console** — configure + verify + guide client to submit (Q12)
- [ ] 🔒 **Google Analytics** — set up + link (Q13)
- [ ] Lighthouse pass (performance / SEO / a11y / best practices)

---

## PHASE 7 — Internationalization (Q22–24)
- [x] next-intl framework — unlimited languages, `en` live
- [ ] Prove RTL/translation mechanism (e.g. isolated `app/i18n-demo`, noindex; English ↔ sample)
- [ ] Externalize all UI strings to `messages/`
- [ ] Structure for client-provided translated content per priority market (text by client)
- [ ] LanguageSwitcher wired to live locales

---

## PHASE 8 — Buyer-facing & marketing
- [ ] **PDF brochure/catalogue download** (Q19) — button → `siteSettings.catalogueFile`; client uploads via Sanity
- [ ] **Certifications section** — editable via Sanity (Q20)
- [ ] 🔒 **Chatbot** — integrate **Crisp** (recommended) once client confirms; single embed; client bears any paid plan (Q25)

---

## PHASE 9 — Security & backups (mostly platform-provided, Q16–18)
- [ ] SSL — auto via Vercel; verify `https` at launch (Q16)
- [ ] Security — Vercel infra (DDoS, secure deploys) + Sanity login protection; no paid plugins (Q17)
- [ ] Backups — Vercel deploy history (rollback) + Sanity content version history (Q18)
- [ ] Env vars never committed; `.env.local` gitignored

---

## PHASE 10 — QA & pre-launch
- [ ] Cross-device responsive QA — mobile / tablet/iPad / desktop (Q5)
- [ ] Cross-browser (Chrome, Safari, Firefox, Edge)
- [ ] All forms deliver to email **and** land in Google Sheet
- [ ] WhatsApp button works on every page
- [ ] Broken-link / 404 / empty-state check
- [ ] `pnpm build` + `pnpm lint` clean; no console errors
- [ ] Content proofread (client-provided copy in place)

---

## PHASE 11 — Deploy & handover
- [ ] Connect repo to **Vercel**
- [ ] Set env vars on Vercel — Sanity, Resend, Sheets webhook, WhatsApp, site URL
- [ ] Domain configuration + DNS
- [ ] Verify SSL live (Q16)
- [ ] Production smoke test (forms, Sanity edits propagate via ISR)
- [ ] **Client walkthrough of Sanity dashboard** (Q4)
- [ ] Handover doc — how to edit content, upload catalogue, add products/certs, read leads sheet

---

## 📦 Excluded from scope (for reference — separate quote if wanted)
- Copywriting / product descriptions / translated text — **client provides** (Q-note)
- Google Ads landing pages & future paid-marketing edits (Q21)
- Ongoing SEO management / monitoring (Q12–13 = setup only)
- Pages beyond the agreed 5–7 (Q2)
- Any feature from the agreement's exclusions list — none needed at launch (Q28)

---

## 🧱 Recommended build order
1. **Phase 2 (shell)** + **Phase 1 lock** — needed by everything
2. **Phase 4 Products IA** — highest-leverage; the 18-category architecture shapes the rest
3. Remaining Phase 4 pages (Home, About, Product detail, Certifications, Contact)
4. **Phase 5 form UIs** — wire onto existing routes; verify Resend domain
5. **Phase 3 Sanity connect** — swap placeholders for live data (once client provides project ID)
6. **Phase 6 SEO** + **Phase 7 i18n** polish
7. **Phase 8 chatbot/catalogue** → **Phase 10 QA** → **Phase 11 deploy & handover**
