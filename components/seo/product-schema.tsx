import { jsonLd } from "./json-ld";

// ─────────────────────────────────────────────────────────────────────────
// DELIBERATELY NO `Product` SCHEMA   do not re-add it.
//
// Google's Product type requires one of `offers` (with a real price),
// `review`, or `aggregateRating`. This is a quote-only (RFQ) B2B export
// catalogue: there is no public price, and there are no per-product reviews or
// ratings. Emitting Product without those made every SKU an "invalid item" in
// Search Console (reported 2026-08-06) with no upside   the price/stars rich
// result was never attainable.
//
// The dishonest workarounds are off the table: `price: "0"` renders as "Free",
// and a fabricated `aggregateRating` is exactly the spammy structured markup
// Google issues manual actions for.
//
// If the client ever publishes real prices or collects real product reviews,
// Product + a truthful Offer can come back. Until then, BreadcrumbList is the
// only structured data these pages can honestly claim   and it is the one that
// actually earns a rich result (the breadcrumb trail under the listing).
// ─────────────────────────────────────────────────────────────────────────

// BreadcrumbList structured data
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
    />
  );
}
