// Transforms content/product-catalogue.json into a Sanity-importable NDJSON file.
// Run:  node scripts/generate-seed.mjs
// Import later (once the project is connected):
//   pnpm dlx sanity@latest dataset import content/seed.ndjson production
//
// Every product is seeded as its own document — the category page lists each one
// as an expand-in-place accordion row, so no collapsing into forms[]. Category
// `group` + `description` and per-product `hsCode` come straight from the JSON
// (generated from public/Traya_Food Product_List_By_Category.xlsx).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogue = JSON.parse(
  readFileSync(join(root, "content/product-catalogue.json"), "utf8"),
);

const docs = [];

for (const cat of catalogue.categories) {
  // NOTE: dashes, not dots — Sanity silently drops documents whose _id contains
  // a dot (they import "ok" but aren't queryable). Learned the hard way.
  const categoryId = `category-${cat.slug}`;

  docs.push({
    _id: categoryId,
    _type: "category",
    title: cat.title,
    slug: { _type: "slug", current: cat.slug },
    order: cat.order,
    group: cat.group ?? "spices",
    ...(cat.description ? { description: cat.description } : {}),
  });

  const categoryRef = { _type: "reference", _ref: categoryId };

  for (const p of cat.products) {
    docs.push({
      _id: `product-${p.slug}`,
      _type: "product",
      title: p.name,
      slug: { _type: "slug", current: p.slug },
      category: categoryRef,
      origin: "India",
      forms: [],
      ...(p.hsCode ? { hsCode: p.hsCode } : {}),
      ...(p.series ? { series: p.series } : {}),
      ...(p.colourIndex ? { colourIndex: p.colourIndex } : {}),
      ...(p.packSizes ? { packSizes: p.packSizes } : {}),
    });
  }
}

// ── Company profile content (from .claude/company-profile.md) ───────────────
function block(text, i) {
  return {
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  };
}
function feat(title, description) {
  return {
    _type: "featureItem",
    _key: title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    title,
    description,
  };
}

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  companyName: "Traya International Exim LLP",
  tagline: "Building Partnerships Across Continents",
  secondaryTagline: "A Refined Approach to Global Trade",
  emails: ["info@trayaexim.com"],
  phone: "+91 99989 16679",
  whatsappNumber: "919998916679",
  address:
    "Shantakaaram, Shivranjani Society, Satellite, Ahmedabad, Gujarat 380015, India",
  social: {
    _type: "object",
    linkedin: "",
    instagram: "",
  },
});

// ── Certifications ──────────────────────────────────────────────────────
docs.push({
  _id: "fssai",
  _type: "certification",
  title: "FSSAI",
  issuedBy: "Food Safety & Standards Authority of India",
  description:
    "Confirms our products meet India's statutory food-safety standards before they clear for export.",
  order: 1,
});
docs.push({
  _id: "apeda",
  _type: "certification",
  title: "APEDA",
  issuedBy:
    "Agricultural & Processed Food Products Export Development Authority",
  description:
    "Registered with India's agri-food export authority, aligned with the national framework for export quality and compliance.",
  order: 2,
});
docs.push({
  _id: "fieo",
  _type: "certification",
  title: "FIEO",
  issuedBy: "Federation of Indian Export Organisations",
  description:
    "A member of India's apex export-promotion body, a vetted part of the country's official export community.",
  order: 3,
});
docs.push({
  _id: "spice-board",
  _type: "certification",
  title: "Spice Board",
  issuedBy: "Spices Board of India",
  description:
    "Our spice exports meet the Spices Board of India's grading and quality standards for international markets.",
  order: 4,
});
docs.push({
  _id: "msme",
  _type: "certification",
  title: "MSME India",
  issuedBy: "Micro, Small & Medium Enterprises",
  description:
    "A registered Indian enterprise, an accountable, recognised legal entity behind every contract.",
  order: 5,
});

// ── Testimonials ────────────────────────────────────────────────────────
// Intentionally NOT seeded. Honesty rule: do not publish invented buyer quotes.
// The client adds real, attributable testimonials in Sanity Studio; until then
// the home Testimonials section self-hides (renders nothing when the list is
// empty), so an empty seed is the correct, honest default.

// ── Home Page singleton ─────────────────────────────────────────────────
docs.push({
  _id: "homePage",
  _type: "homePage",
  hero: {
    _type: "object",
    eyebrow: "Indian food-ingredient exports",
    heading: "A trusted bridge between Indian growers and global buyers.",
    sub: "Premium agricultural and food ingredients, sourced and processed in India, exported with the documentation and care global trade demands.",
    ctaPrimaryLabel: "Request a sample",
    ctaSecondaryLabel: "Browse the range",
    statLine: "499 products · 30 categories · India origin",
  },
  intro: {
    _type: "object",
    eyebrow: "Who we are",
    heading: "A broad-spectrum food-ingredient partner, built on trust.",
    body: "Traya International Exim LLP is a dynamic, globally oriented export house delivering premium agricultural and food-processing products from India to international markets.",
    specLine: "India origin · Bulk & custom packaging · Global export",
  },
  stats: [
    {
      _type: "stat",
      _key: "products",
      value: "499",
      label: "Products in the catalogue",
    },
    {
      _type: "stat",
      _key: "categories",
      value: "30",
      label: "Browsable categories",
    },
    {
      _type: "stat",
      _key: "origin",
      value: "100%",
      label: "Single origin, India",
    },
    {
      _type: "stat",
      _key: "sectors",
      value: "5",
      label: "Registrations & memberships",
    },
  ],
  productsSection: {
    _type: "object",
    eyebrow: "What we export",
    heading: "Thirty categories, one accountable partner.",
    sub: "From dehydrated alliums to spray-dried powders, whole and ground spices, culinary herbs, herbal & nutraceutical powders, and industrial chemicals, dyes and colours. Browse by what you make.",
    specLine: "6 groups · 30 categories · 499 SKUs",
  },
  why: {
    _type: "object",
    eyebrow: "Why Traya",
    heading: "The discipline of a trading house, the care of a founder.",
  },
  process: {
    _type: "object",
    eyebrow: "How it works",
    heading: "From first enquiry to delivered cargo.",
    sub: "A simple, transparent path. No guesswork, no surprises.",
  },
  finalCta: {
    _type: "object",
    heading: "Ready to source from India?",
    sub: "Bulk volumes, custom packaging, full documentation. Tell us what you need and we will usually respond within one business day.",
    ctaLabel: "Start an enquiry",
  },
});

docs.push({
  _id: "aboutPage",
  _type: "aboutPage",
  heading: "About Us",
  tagline: "A Refined Approach to Global Trade",
  intro: [
    block(
      "Traya International EXIM is a global trade firm built on precision, structure, and disciplined execution. We operate across international markets with a clear focus — to facilitate seamless import and export operations while building long-term, high-value global relationships.",
      1,
    ),
    block(
      "We are a modern, forward-looking trade enterprise that combines operational strength with a global outlook, facilitating both exports and imports across diverse product categories aligned with international standards.",
      2,
    ),
  ],
  vision:
    "To become the most trusted and largest trading partner for businesses expanding across borders.",
  mission: [
    "To facilitate efficient and well-structured export and import operations across global markets",
    "To build and strengthen long-term international trade partnerships and provide sustainable solutions",
    "To ensure seamless execution through disciplined systems and operational clarity",
    "To expand our global presence through strategic market engagement",
    "To uphold the highest standards of professionalism, reliability, quality, transparency and consistency",
  ],
  philosophy: [
    feat("Clarity", "Knowing where and how to operate."),
    feat("Structure", "Having systems that support execution."),
    feat("Reliability", "Delivering consistently across transactions."),
    feat("Scalability", "Creating pathways for long-term expansion."),
  ],
  capabilities: [
    feat(
      "Export & Import Operations",
      "A comprehensive, end-to-end approach — from initial planning to final delivery, every stage handled with attention to detail and operational control.",
    ),
    feat(
      "Global Market Positioning",
      "Aligning products with the right regions, demand cycles, and trade environments to enable entry and expansion across international markets.",
    ),
    feat(
      "International Client & Partner Network",
      "A network spanning multiple geographies, built on credibility and long-term, growth-oriented association.",
    ),
    feat(
      "Trade Execution & Coordination",
      "Overseeing the entire execution cycle — documentation, regulatory alignment, and logistics coordination — so transactions move efficiently across borders.",
    ),
    feat(
      "Strategic Trade Direction",
      "Structured thinking in every aspect of trade, enabling clear decision-making and consistent global positioning.",
    ),
  ],
  whyTraya: [
    feat(
      "Structured Systems",
      "Ensuring efficiency and clarity at every stage.",
    ),
    feat(
      "Global Network Strength",
      "Enabling reliable international connections.",
    ),
    feat("Execution Excellence", "Maintaining precision across operations."),
    feat(
      "Professional Integrity",
      "Building trust through consistent delivery.",
    ),
  ],
});

const ndjson = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
writeFileSync(join(root, "content/seed.ndjson"), ndjson);

const categories = docs.filter((d) => d._type === "category").length;
const products = docs.filter((d) => d._type === "product").length;
console.log(
  `Wrote content/seed.ndjson — ${categories} categories, ${products} products, + siteSettings & aboutPage (${docs.length} docs total).`,
);
