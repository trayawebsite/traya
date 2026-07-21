# Traya Build Playbook — from 13-site teardown

> Synthesized from a focused teardown of 13 sites (your 10 references + ofi/synthite/kanegrade), 2026-06-10. Maps the best real-world patterns onto Traya's locked IA + Vermilion system. Companion to [research-findings.md](./research-findings.md) (the broad research) and [design-system.md](./design-system.md) (the tokens). Full teardown data in the workflow output.

> **Honest scope:** these teardowns read structure/IA/section-flow reliably; visual aesthetics only partially (fetch sees markup, not pixels). Treat layout/section guidance as strong, pure look-and-feel as directional.

## Sites analyzed
Your refs: Fast Growing Trees · Plant Lipids · Jain Farm Fresh · BigHaat · Agrobi (Webflow template) · Cropin · EWG Food Scores · Field to Feed Export · Glee Impex · OES Export Import. Competitors: ofi · Synthite · Kanegrade. (Kanegrade = closest model for an emerging Traya.)

## Homepage section order (recommended)
1. **Sticky header** — wordmark · nav · persistent Enquiry List counter · "Request Catalogue" CTA *(Kanegrade + FGT)*
2. **Hero** — editorial, brand-and-intent first: eyebrow + Lora headline + warm origin photo + dual CTA (Browse the Range / Request Catalogue) *(Plant Lipids + ofi/Kanegrade + Cropin)*
3. **Self-segmentation router** — "What are you sourcing today?" 3–4 intent tiles (Bulk / Private label / Retail / By certification) *(FGT + Synthite + ofi)*
4. **Quantified trust band** — years exporting · countries · SKUs · throughput (DM Mono numerals) *(Plant Lipids + Kanegrade + Cropin)*
5. **Product hub teaser** — the 6 groups as large editorial tiles → categories *(Jain + Plant Lipids + ofi)*
6. **Capabilities strip** — sourcing / processing / private-label / QC blocks *(Synthite + Plant Lipids + OES)*
7. **Certification cluster** — branded, repeating cert wall, designed band (not logo dump) *(Jain + Plant Lipids + Field to Feed)*
8. **Sourcing / origin story** — alternating two-column, founder-led (forest accent section) *(Plant Lipids + ofi + Agrobi)*
9. **Featured ingredients** — "tease + View All" carousel of 6–8 hero SKUs (universal card) *(Glee + BigHaat + Jain)*
10. **Resources / Expert hub teaser** — sourcing guides + downloadable catalogue PDF *(FGT + Field to Feed + Plant Lipids)*
11. **Testimonials / global presence** — geo-tagged quotes + world map *(Glee + Synthite/ofi + Jain)*
12. **Final CTA banner** — deep `#100D08` band + vermilion radial accent, "Start an enquiry / Request a sample" + WhatsApp *(Cropin + ofi)*
13. **Footer** — three-column action footer: Sections | Actions (Sample/Catalogue/Certifications) | Legal/GSTIN/IEC *(Synthite + Plant Lipids)*

## Hero recommendation
Editorial hero on **warm ivory**, brand-and-intent first — **NOT a headline-less rotating carousel** (the #1 "cheap exporter" tell across Jain, Glee, OES, Field to Feed). Eyebrow in red-deep `#6D1F10` → confident Lora headline (1 idea, ~6–9 words; emphasis via colour/rule, not a reflex italic word) → Figtree subhead with the proof claim → one DM Mono micro-stat line ("150+ products · 18 categories"). **Two CTAs only:** primary "Request a sample" (**vermilion `#B5341A` fill, white text**, 8px radius); secondary "Download the catalogue" (underlined text link or ink outline). **One** warm, real origin/ingredient photograph (natural light, shallow DoF) — never clip-art or stock-blue industrial banners. Slim cert micro-row beneath CTAs. Vermilion only in eyebrow + CTA (<2%). No parallax, no autoplay.

## /products hub
Curated landing, not a flat SKU wall. Top: one dominant **search** field + browse-axis toggle. Body: **6 GROUPS as full-width editorial bands**, each with its category tiles (18 total: image + name + SKU-count chip + descriptor + arrow). **Multiple parallel browse axes** (same SKUs, different doors): by Category [default] · by Application (bakery/beverage/nutraceutical/savoury/dairy) · by Certification (Organic/Non-GMO/Halal/Kosher) · by Origin. One standardized card everywhere. Anchor with downloadable full-catalogue PDF + persistent Enquiry List. *(Kanegrade triple-browse + Cropin/ofi multi-axis + Plant Lipids/Jain drill-down + Field to Feed PDF)*

## /categories/[slug] (one reusable template ×18)
1. Category hero band (Lora name, group eyebrow, origin paragraph, warm photo)
2. SKU product-card grid (image, name, grade/form, origin, cert badges, Add-to-Enquiry + Request-Sample) with light faceting (form/cut/grade as siblings, organic/origin toggles)
3. Sourcing/origin story (forest accent)
4. Specs & packaging summary (grades, MOQ, packaging, Incoterms) in DM Mono
5. Category-scoped cert strip
6. Downloadable category spec sheet
7. Cross-links to sibling categories
8. Closing enquiry CTA
*(Kanegrade template + Jain sibling grades + Field to Feed long-form template + Plant Lipids cert/cross-links)*

## /products/[slug] (spec-first light PDP, flat URL — the differentiator)
Above fold split: left = 1:1 real photography; right = **attribute-first** panel (origin, grade/variety, form, moisture, mesh size, shelf life) in DM Mono — EWG's "lead attribute up top, sub-specs below" model. **No price/cart.** Primary actions (persistent): **Add to Enquiry List · Request Sample · Download Spec Sheet (COA/MSDS)**. Below: full spec table; packaging & MOQ/Incoterms; SKU-scoped certs; in-context **"compare variants"** module (same family, doubles as drill-down); origin note; enquiry CTA. Keep light. *(EWG + Kanegrade + Synthite/ofi)*

## Nav pattern
Slim sticky header on ivory, ink text, single vermilion-hover. Wordmark (Lora) left. Nav = locked IA (About · Capabilities · Products · Certifications · Contact). **Products = card mega-menu**: 6 groups as columns → categories as icon+name+descriptor cells (NOT a wall of links), right-rail with alternate axes (Application/Certification/Origin) + "Download catalogue PDF". Right cluster: search · **persistent Enquiry List counter** · primary CTA. Persistent floating WhatsApp (brand green, never restyled). Mega-menu = hover/focus desktop, accordion mobile. *(Kanegrade + Cropin + ofi/Synthite + Field to Feed)*

## Footer blueprint (merged: wine-bar reference + B2B playbook)
A premium-warm footer that combines the human warmth of the Wine Diplomacy reference with the export-legitimacy B2B buyers need. On a dark band (`bg-traya-deep`), `clay` for dividers/captions, `red-hi` for the eyebrow.
- **Brand column** — TRAYA wordmark (Lora) + tagline ("Building Partnerships Across Continents") + a *warm* invitation line: "Have a sourcing question? Talk to our team — we'll help." (not a cold "Contact" header)
- **Explore** — About · Capabilities · Products · Certifications
- **Actions** — Request a sample · Download catalogue (PDF) · Certifications
- **Get in touch** — Ahmedabad address · +91 99989 16679 · info@trayaexim.com · social row (LinkedIn · Instagram)
- **Bottom bar** — © {year} Traya International Exim LLP · Terms · Privacy · **GSTIN / IEC** (export legitimacy) · "Built by Studio Morpheus" (site credit)
- *Borrowed from:* Wine Diplomacy (warm "reach out" microcopy, tagline, social row, site credit) + Synthite/Plant Lipids (3-col action footer, GSTIN block).

## Conversion playbook
1. **Cart-style Enquiry List is the spine** — header counter on every page, "Add to Enquiry" on every card/PDP, slide-in list, one consolidated "Send Enquiry" *(Kanegrade)*
2. **Per-product dual action** — "Add to Enquiry" (batch) + "Request Sample" (immediate) *(Synthite/ofi)*
3. **Document-led conversion** — per-SKU Spec Sheet/COA/MSDS, per-category sheets, full-catalogue PDF in nav+footer (B2B converts on docs, not carts) *(Field to Feed/ofi/Plant Lipids)*
4. **Certification cluster** — branded repeating band on home, every category page, footer *(Jain/Plant Lipids/Kanegrade)*
5. **Intent router** — "What are you sourcing today?" to pre-qualify 4 buyer types *(FGT/Synthite/ofi)*
6. **Export-first enquiry form** — Country/Region + Company + Designation fields *(Glee/Plant Lipids)*
7. **Persistent WhatsApp** (#25D366, fixed 56px) decoupled from page CTAs *(Glee/Field to Feed)*
8. **Quantified trust band + markets map** repeated as rhythm *(Plant Lipids/Cropin)*
9. **Footer-as-conversion** — 3 columns: Sections | Actions | Legal/GSTIN/IEC *(Synthite + Plant Lipids)*

## Motion & polish
- **One entrance signature** reused everywhere: opacity 0→1 + translateY 24→0, ~650ms, `ease-expo`, 70ms stagger. Restraint = premium.
- Hover only where it aids action: ghost-arrow shift 4px, card lift + 1px border darken @150ms, CTA fill (vermilion → red-deep) @150ms. No bounce/spring.
- Mega-menu + Enquiry slide-in: same out-expo, ~200–250ms, faint backdrop dim.
- Stat band count-up once on scroll-in (~800ms), then rest. Sparingly.
- Respect `prefers-reduced-motion`.
- Real warm origin photography, 1:1 crops, WebP/AVIF, lazy-load.
- **Hard NOs:** autoplay hero carousel · parallax · decorative GSAP · countdown timers · animated-GIF banners. These are the exact "cheap" tells.
- Saffron stays <2% even in motion — accent on hover/active + the one deep CTA band only.

## ⛔ Anti-patterns to avoid (the "cheap exporter" tells)
- Headline-less auto-rotating hero carousel (Jain, Glee, OES, Field to Feed)
- Placeholder/Lorem copy & templated stock layouts (OES had visible Lorem Ipsum)
- Countdown timers / "LIMITED TIME 20% OFF" urgency (Field to Feed)
- Animated-GIF promo banners & discount-% badge spam (FGT, BigHaat)
- Flat clip-art certification logo dumps & generic benefit icons (Glee, OES)
- Dumping 150+ SKUs into one flat grid / single taxonomy (Agrobi 5-card won't scale)
- Cold abstract lab/corporate-blue/gradient-wave imagery (Synthite, ofi-blue, OES) — Traya differentiates with warm real food/origin photography
- Overusing red / strong color blocking — keep <2%
- Consumer "Shop Now / Add to Cart" & phone/video-chat framing (FGT) — wrong model
- High-density transactional walls with scarcity badges / star-rating spam (BigHaat)
- Decorative motion overload (parallax/GSAP/bounce)
- Burying certs/MOQ/spec sheets or omitting per-SKU spec docs (most competitors lack them) — **surfacing these is Traya's differentiator**
