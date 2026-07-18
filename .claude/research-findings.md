# Traya — Deep Research Findings (IA, Conversion, Competitors, Design)

> Generated 2026-06-10 via deep-research harness (105 agents, 23 sources fetched, 102 claims extracted, 25 verified by 3-vote adversarial check → 23 confirmed, 2 killed). Use this to lock the site structure before building. Confidence levels and citations preserved.

## TL;DR
Build a **"company/solutions-first" IA with a genuinely browsable catalogue** — not a flat product dump. Peers (ofi, Jain Farm Fresh, Synthite, Kanegrade, Plant Lipids) all lead with Company/About (expanded), Products as grouped categories, Capabilities/Solutions, Quality/Certifications, Contact. For 150+ SKUs: **category landing pages with subcategory tiles above any hero**, grouped under section headings, polyhierarchy for cross-listed items, and a unified filter/sort/list system (Baymard: good product-list UX cuts abandonment 67–90% → 17–33%, ~4× more leads). Convert with **layered CTAs** — per-product "Enquire"/"Request sample", a cart-style **Enquiry List** (batch products into one RFQ), downloadable PDF catalogue + spec sheets, and a **prominent certification cluster**. A **warm-earth palette + a calligraphic display serif + Figtree body is validated** as "premium ingredient house" (medium confidence — design judgment from the verified industry register). *(The client's final pick within this register: **Vermilion `#B5341A`** + **Lora** + Figtree — see §4 and [design-system.md](./design-system.md).)*

---

## 1. Information Architecture & Routes

- **[HIGH] Category landing pages, subcategory tiles ABOVE the hero.** The single most damaging IA mistake is a hero that pushes navigation below the fold; 76% of sites fail this. Merge category + listing by showing subcategories above the product list. — *Baymard, NN/g*
- **[HIGH] No flat equal-weight grids.** 20+ same-weight tiles cause decision fatigue. Group the 18 categories under section headings with visual hierarchy. — *Baymard (Chernev 2015 choice-overload, N=7202)*
- **[HIGH] Unified product-list system.** Treat filtering + sorting + layout as one chain; tailor per category, not "one size fits all." Highest-ROI conversion lever for a big catalogue. — *Baymard*
- **[HIGH] Polyhierarchy.** Let cross-listed items (e.g. moringa powder under both Nutraceutical and Spray-Dried) live under multiple parents — matches split buyer mental models. — *NN/g*
- **[HIGH] Canonical sitemap:** Company/About (→ Founder, History, Quality, Awards, Global Footprint), Products (grouped categories), Solutions/Capabilities, Sustainability, Innovation, Contact. — *Jain Farm Fresh, Synthite, Plant Lipids*
- **[HIGH] Group the catalogue into ~6 top-level groupings**, each a tile → dedicated category page. ofi spices = ~10 tile cards (Onion, Garlic, Pepper, Chiles…); Jain = Dehydrated, Fruits, Spices, IQF, Culinary Pastes, Retail. — *ofi, Jain Farm Fresh*
- **[HIGH] Repeatable per-CATEGORY product template:** Overview, MOQs & packaging (qty table), technical specs (composition/stability/processing), quality/compliance, applications. Template at category level, not 150 bespoke pages. — *Kanegrade*
- **[MED] SEO-safe URLs via Sanity GROQ** nested slugs; **control faceted nav** — index only 1–2 filter levels, block deeper (facets can explode to 100k–1M URLs). — *Sanity, The Gray Company*
- **[KILLED 0-3] "Max 4 levels / 4 clicks deep"** — refuted; not a real Google rule. Don't over-constrain nesting depth.

## 2. B2B Buyer Conversion

- **[HIGH] Layered, specialized CTAs beat one generic contact form:** per-product/category "Enquire now", "Request samples", a **cart-style Enquiry List** that batches multiple products into one RFQ, plus a resource library (PDF brochures, spec sheets, request forms). — *Kanegrade, Synthite, ofi*
- **[HIGH] Prominent certification cluster + heritage/scale/traceability:** ISO 22000/14001/45001, BRCGS, HACCP, FSSC, Halal, Kosher, FDA, organic/NPOP/USDA + India's FSSAI/APEDA/Spices Board; testimonials; "documentation/traceability on every order." — *Jain (9-logo cluster, 50+ countries, 10,000+ farmers), Kanegrade ("45 years", traceability), ofi ("#1 dried onion & garlic")*
- **For an EMERGING exporter:** lead with **verifiable certs + traceability + founder story**, NOT decades-of-heritage or #1 rankings you can't claim. The cart-style enquiry list + per-product RFQ + downloadable spec sheets are the realistic high-impact subset.

## 3. Competitor Teardown (live as of June 2026)
- **ofi** — group nav, ~10 spice tile cards each → dedicated page; "Get started" shop portal (samples, real-time pricing, COA/tech docs). Self-reported "#1 dried onion & garlic."
- **Jain Farm Fresh** — About branches into Founder/History/Leadership/Quality/Awards/Global Footprints; 9-logo cert cluster; scale + sustainability signals.
- **Synthite** — Our Company / Ingredient Solutions / Capabilities / Innovation / Sustainability & ESG / Careers / Contact; "Ask Our Scientist", "Looking for a Partner, Not Just a Vendor."
- **Kanegrade** — the model for an emerging house: consistent category template (Overview, Portfolio, Packaging & MOQs, Applications, Composition/Stability, Quality/Compliance, FAQs), "Enquire now" + "Request samples" + cart-style "Your Enquiry List", /resources/ library.
- **Plant Lipids** — Who We Are / What We Offer / Capabilities / Sustainability / Contact.
- *Caveat: cert & ranking claims on these sites are self-reported marketing, not third-party audited.*

## 4. Design — Colors & Typography
> **FINAL OUTCOME (supersedes the research recommendations below):** the client chose **Vermilion `#B5341A`** (warm red) on **ivory `#FBF8F2`**, with **Lora** display + Figtree body. The findings below validated the broad *warm-earth* register and the *Figtree* body pairing (both held); the specific accent moved saffron→vermilion (red is category-agnostic as the firm diversifies) and the display serif moved Fraunces→Lora. Canonical: [design-system.md](./design-system.md).
- **[MED] Warm-earth register validated.** Warm cream + a warm spice accent + forest-green reads "premium ingredient house" (earthy/warm), not "cheap commodity exporter." Earth tones / spice-reds / greens dominate the premium register. *(Original research tested turmeric-saffron #C4820A; final accent is vermilion #B5341A — same warm-earth family.)* — *design judgment from verified competitor register + Paper Heart spice palette*
- **[MED] Fonts:** a warm display serif + Figtree body is the right pairing. *(Research tested Fraunces; final display is Lora — same calligraphic-serif intent.)* Figtree = clean humanist sans, validated as the body face. — *Undercase Type foundry, Google Fonts, Pimp My Type*

## Open Questions (need client/PM decisions)
1. **Pricing posture:** show FOB/real-time pricing (ofi) or gate behind RFQ? Varies by region (ME/EU/US/SEA).
2. **RFQ depth:** full transactional shop/sample portal (ofi) vs lighter cart-style Enquiry List (Kanegrade)? Kanegrade model fits launch-stage + Next.js/Sanity better.
3. **Multi-region:** geo/locale routing + per-market cert surfacing (Halal-forward ME, EU-Organic EU, FDA/non-GMO US) without fragmenting SEO.
4. **Granularity:** per-SKU pages vs category-level templates + per-SKU spec PDFs for 150+ products.

## Caveats
Most IA/conversion data is B2C usability research (Baymard/NN/g) transferred to B2B — directional principles hold, exact abandonment figures are B2C task data. NN/g hybrid-category article is 2018 (reaffirmed by 2025 Baymard). Palette/type conclusion is informed design direction, not a controlled study. Faceted-nav "1–2 levels" is a practitioner heuristic. Sanity GROQ slug pattern handles single-level nesting (deeper needs recursion). Killed claims: Synthite footer cert-badge list (1-2), "4-levels/4-clicks" rule (0-3).
