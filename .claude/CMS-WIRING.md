# CMS Wiring Plan — connecting Sanity (Traya)

**Status (2026-06-19):** the site renders from `lib/` + `content/` + `messages/`. Sanity schemas/queries/fetchers exist but **no frontend page reads from Sanity yet**. The content **model is now complete** (below). Flipping to live Sanity is **blocked on the client's project ID + provided content** — it's a deliberate phase, not a flag flip.

## 🔒 Blockers (need the client)
- **`NEXT_PUBLIC_SANITY_PROJECT_ID`** in `.env.local` — client creates a free project at sanity.io/manage.
- **Re-import the seed** with the new `category.group` field: `pnpm dlx sanity@latest dataset import content/seed.ndjson production`. ⚠️ `scripts/generate-seed.mjs` must emit `group` per category and must NOT clobber the founder/about copy (see PROJECT_STATUS warning).
- **Real product specs / images / descriptions**, **verified cert scopes**, **real testimonials** — client provides; catalogue JSON has names only.

## ✅ Schema model — COMPLETE (2026-06-19)
- **`homePage` singleton** — every landing-page section's copy + headings + hero/CTA images (hero, intro/vision/mission, stats, products heading, why, testimonials heading, certs heading, how-it-works, FAQ, final CTA, seo). Added to Studio desk + singletons. ⚠️ **Schema exists but the home components still render from i18n (`messages/en.json`) — not wired to read this doc yet** (same status as `aboutPage`).
- `testimonial` document (quote/name/role/location/order) — home Testimonials renders these (hidden when none).
- `category.group` enum (alliums/powders/spices/herbs/nutraceutical/wellness) — drives the 6 `/products` groups (currently hardcoded in `lib/catalogue.ts`).
- `siteSettings.gstin` / `.iec` / `.founderPhoto` — footer legal bar + founder photo.
- All mirrored in `sanity/lib/types.ts` (`HomePage`, `Testimonial`, `group`, gstin/iec/founderPhoto).

## ⚠️ Wiring the marketing pages (home + about) — the big decision
`homePage` and `aboutPage` schemas exist but are UNUSED; the components read `getTranslations('Home.*' / 'About.*')`. Editing the Studio docs will NOT change the site until the components are rewired to read the docs via a `getHomePage()` / `getAboutPage()` data layer (mirroring `getSiteSettings()`'s "defaults now → Sanity later" pattern). **Decision needed:** localization — keep next-intl for translations (Sanity = English source), or move to Sanity field-level i18n. Until wired, the home/about copy is developer-edited in `messages/en.json`. Also: home `stats` values are hardcoded in `stats.tsx` (move to the homePage doc / i18n / derive from data).

## 🔧 Wiring steps (once the project ID is in)
1. **Catalogue** — swap `lib/catalogue.ts` JSON read for `sanity/lib/fetch.ts`. **Reconcile shape:** catalogue uses `product.name`; Sanity uses `product.title`. The product/category pages already have slots for the rich Sanity fields (shortDescription, specifications, images, hsCode, forms) — they currently render the spec-forward subset.
2. **Certifications** — wire `cert-list` / `cert-hero` / footer to `getCertifications()`. Field map: lib `name/file/issuedBy/meaning` → Sanity `title/image/issuedBy/description`. Move the "what it means" copy into the cert docs (it's honesty-sensitive — belongs in the editable surface).
3. **Testimonials** — add a `getTestimonials()` query + fetcher; wire `components/sections/home/testimonials.tsx`.
4. **siteSettings** — point `getSiteSettings()` at the GROQ fetch. Note Sanity `emails` is an **array** (single in lib) — map it; pull gstin/iec/founderPhoto from Sanity.
5. **About page** — `aboutPage` schema is fully built but **unused**; About copy lives in `messages/en.json`. **Decision:** (a) keep in i18n (developer-edited, simplest) or (b) rebuild `components/sections/about/*` to read the `aboutPage` doc (client-edited). The founder letter + principles/why/vision would move to the doc.
6. **Images** — wire `sanity/lib/image.ts` `urlFor()` into each `Photo`/`next/image` call site; static `/public/*` paths become Sanity assets. The home group tiles derive their path from the group key (`group-${g}.png`) — make `ProductGroups` read category images instead.
7. **ISR** — configure the Sanity publish webhook → `/api/revalidate` (secret `SANITY_REVALIDATE_SECRET`).

## ❓ Decisions to confirm
- **About content → Sanity, or stay in i18n?** (biggest scope question)
- Pricing posture — keep gated behind RFQ (current)?
- Confirm certs/testimonials have real, verified content before launch (honesty gate).
