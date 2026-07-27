import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { primaryButton } from "@/lib/button-styles";
import { CategoryProductList } from "./category-products";
import { getCategories, type CatalogueCategory } from "@/lib/catalogue";
import { getSiteSettings } from "@/lib/site-settings";
import { CertMark } from "@/components/layout/cert-mark";
import { QuoteForm } from "@/components/sections/quote-form";
import { BreadcrumbSchema } from "@/components/seo/product-schema";
import { categoryCutout } from "@/lib/category-covers";
import { ChemicalShades, type SubRange } from "./chemical-shades";
import {
  CHEMICAL_CATEGORY_META,
  SUBCATEGORY_BLURB,
  orderSubcategories,
} from "@/lib/chemicals-meta";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.trayaexim.com";

// Rich category template   follows the playbook's Kanegrade pattern:
// Hero · Product grid · Sourcing story · Specs & packaging · Certs · Sibling links · CTA
export async function CategoryView({
  category,
}: {
  category: CatalogueCategory;
}) {
  const t = await getTranslations("Catalogue");
  const tl = await getTranslations("Links");
  const count = category.products.length;

  // Fetch sibling categories (same group)
  const allCategories = await getCategories();
  const siblings = allCategories
    .filter((c) => c.group === category.group && c.slug !== category.slug)
    .slice(0, 4);

  // Fetch certifications
  const s = await getSiteSettings();

  // Hero image floats on ivory (object-contain): a category's own transparent
  // cut-out if it has one, otherwise the shared transparent food image.
  const cutout = categoryCutout(category.slug);
  const imageIndex =
    (category.title
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      5) +
    1;
  const heroImageSrc = cutout ?? `/t${imageIndex}.webp`;

  // MOQ / packaging spec rows: Sanity override first, else group-aware defaults.
  // Per the client's final lists, chemicals carry a firm 500 kg MOQ + export
  // packaging + compliance docs on the category page; food stays quote-led
  // (its per-order specs live on each product, not the category header).
  const isChemicals = category.group === "chemicals";
  const specRows =
    category.moqPackaging && category.moqPackaging.length > 0
      ? category.moqPackaging.map((sp) => ({
          label: sp.label,
          value: sp.value,
        }))
      : isChemicals
        ? [
            {
              label: t("category.specOrigin"),
              value: t("category.specOriginVal"),
            },
            {
              label: t("category.specMoq"),
              value: t("category.specMoqValChem"),
            },
            {
              label: t("category.specPackaging"),
              value: t("category.specPackagingValChem"),
            },
            {
              label: t("category.specSample"),
              value: t("category.specSampleVal"),
            },
            { label: t("category.specDocs"), value: t("category.specDocsVal") },
          ]
        : [
            {
              label: t("category.specOrigin"),
              value: t("category.specOriginVal"),
            },
            { label: t("category.specMoq"), value: t("category.specMoqVal") },
            {
              label: t("category.specPackaging"),
              value: t("category.specPackagingVal"),
            },
          ];

  // Speciality chemicals browse as colour ranges: group the category's shades
  // by their `series` (the client's sub-range), in the approved reading order.
  const chemMeta = CHEMICAL_CATEGORY_META[category.slug];
  const subRanges: SubRange[] = (() => {
    if (!isChemicals) return [];
    const bySeries = new Map<string, SubRange["shades"]>();
    for (const p of category.products) {
      const key = p.series ?? "";
      if (!bySeries.has(key)) bySeries.set(key, []);
      bySeries.get(key)!.push({
        name: p.name,
        slug: p.slug,
        colourIndex: p.colourIndex,
      });
    }
    return orderSubcategories(category.slug, [...bySeries.keys()]).map((name) => ({
      name,
      blurb: SUBCATEGORY_BLURB[name],
      shades: bySeries.get(name) ?? [],
    }));
  })();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: tl("home"), url: siteUrl },
          { name: tl("products"), url: `${siteUrl}/products` },
          {
            name: category.title,
            url: `${siteUrl}/categories/${category.slug}`,
          },
        ]}
      />
      {/* 1. Category Hero */}
      <section className="border-b border-traya-border bg-background">
        <Container className="py-section-lg">
          <Breadcrumb
            items={[
              { label: tl("home"), href: "/" },
              {
                label: tl("products"),
                href: {
                  pathname: "/products",
                  query: { range: isChemicals ? "chemicals" : "food" },
                },
              },
              { label: category.title },
            ]}
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="max-w-3xl lg:col-span-7 xl:col-span-8">
              {chemMeta && <p className="section-label">{chemMeta.tagline}</p>}
              <h1
                className={`text-balance font-display text-display-lg text-foreground ${chemMeta ? "mt-3" : ""}`}
              >
                {category.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {count} {count === 1 ? t("product") : t("products")}
                {subRanges.length > 1 && (
                  <>
                    {" · "}
                    {subRanges.length} {t("category.subRanges")}
                  </>
                )}
              </p>
              {category.description && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              )}

              {/* Industries served   who actually buys this chemistry */}
              {chemMeta && (
                <div className="mt-7">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {t("category.industriesHeading")}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {chemMeta.industries.map((ind) => (
                      <li
                        key={ind}
                        className="rounded-full border border-traya-border bg-traya-surface px-3.5 py-1.5 text-xs font-medium text-foreground"
                      >
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-70 lg:block lg:col-span-5 lg:justify-self-center xl:col-span-4 xl:max-w-80">
              <Image
                src={heroImageSrc}
                alt={category.title}
                fill
                priority
                sizes="320px"
                className="object-contain transition-transform duration-700 ease-expo hover:scale-105 motion-reduce:transition-none"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. The range   speciality chemicals browse as sub-range tiles + colour
          swatch grids (a dye catalogue is read by eye); food keeps the
          spec-led expandable product list. */}
      <Reveal>
        <section className="bg-traya-surface">
          <Container className="py-section">
            {isChemicals ? (
              <ChemicalShades
                subRanges={subRanges}
                categoryTitle={category.title}
                categorySlug={category.slug}
                labels={{
                  subRangeHeading: t("category.subRangeHeading"),
                  allSubRanges: t("category.allSubRanges"),
                  // Resins are binders, not colours   count them as products.
                  unitOne:
                    category.slug === "paint-resins"
                      ? t("product")
                      : t("category.shade"),
                  unitMany:
                    category.slug === "paint-resins"
                      ? t("products")
                      : t("category.shades"),
                  search: t("category.search"),
                  noResults: t("category.noResults"),
                  add: t("list.add"),
                  added: t("list.added"),
                  addedToast: t("list.addedToast"),
                  quote: t("list.quote"),
                  sample: t("list.sample"),
                  ciLabel: t("category.shadeCiLabel"),
                  eecLabel: t("category.shadeEecLabel"),
                  fdcLabel: t("category.shadeFdcLabel"),
                  formLabel: t("list.form"),
                }}
              />
            ) : (
              <>
                <h2 className="font-display text-display-sm text-foreground">
                  {t("category.rangeHeading")}
                </h2>
                <CategoryProductList
                  products={category.products.map((p) => ({
                    name: p.name,
                    slug: p.slug,
                    shortDescription: p.shortDescription,
                    images: p.images,
                    series: p.series,
                    colourIndex: p.colourIndex,
                    packSizes: p.packSizes,
                    grade: p.grade,
                  }))}
                  labels={{
                    search: t("category.search"),
                    noResults: t("category.noResults"),
                  }}
                  categoryTitle={category.title}
                  specs={specRows}
                />
              </>
            )}
            <div className="mt-10">
              <a href="#inquiry" className={primaryButton}>
                {t("category.enquireCta")}
              </a>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* 3. Specifications & Packaging   full-width card (the "Sourcing &
          origin" intro that used to run alongside it has been removed). */}
      <Reveal>
        <section className="border-b border-traya-border bg-background">
          <Container className="py-section">
            <div className="mx-auto max-w-3xl rounded-2xl border border-traya-border bg-traya-surface p-6 sm:p-8">
              <h3 className="font-display text-lg text-foreground">
                {t("category.specsHeading")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("category.specsNote")}
              </p>
              {/* MOQ & Packaging — group-aware defaults (see specRows above) */}
              <dl className="mt-4 space-y-2">
                {specRows.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-traya-border pb-2 last:border-0"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {/* Private label   stated for food and for chemicals (the
                  chemicals list's shared specs confirm it applies there too).
                  Custom shades are a chemicals-only offer. */}
              <ul className="mt-4 space-y-2">
                {[
                  t("category.specPrivateLabel"),
                  ...(isChemicals ? [t("category.specCustomShades")] : []),
                ].map((claim) => (
                  <li
                    key={claim}
                    className="flex items-center gap-2 text-sm font-medium text-traya-forest"
                  >
                    <Check className="size-4 shrink-0" aria-hidden="true" />
                    {claim}
                  </li>
                ))}
              </ul>
              {/* Quality & Compliance from Sanity */}
              {category.qualityCompliance && (
                <div className="mt-6 rounded-xl border border-traya-border bg-card p-4">
                  <h3 className="font-display text-base text-foreground">
                    {t("category.certsHeading")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {category.qualityCompliance}
                  </p>
                </div>
              )}
            </div>

            {/* Applications from Sanity */}
            {category.applications && category.applications.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-lg text-foreground">
                  {t("category.applicationsHeading")}
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.applications.map((app, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-traya-border bg-card p-4"
                    >
                      <p className="font-display text-base text-foreground">
                        {app.title}
                      </p>
                      {app.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {app.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      </Reveal>

      {/* 4. Quality & Compliance (Cert Strip) */}
      {s.certifications.length > 0 && (
        <Reveal>
          <section className="bg-traya-surface">
            <Container className="py-section">
              <p className="section-label">{t("category.certsHeading")}</p>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                {t("category.certsNote")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {s.certifications.map((cert) => (
                  <div
                    key={cert.key}
                    className="flex items-center gap-3 rounded-xl border border-traya-border bg-card px-4 py-3"
                  >
                    <span className="flex h-10 w-12 items-center justify-center">
                      <CertMark
                        name={cert.name}
                        src={cert.file}
                        boost={cert.boost}
                      />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {cert.name}
                    </span>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </Reveal>
      )}

      {/* 5. Sibling Categories */}
      {siblings.length > 0 && (
        <Reveal>
          <section className="border-b border-traya-border bg-background">
            <Container className="py-section">
              <h2 className="font-display text-display-sm text-foreground">
                {t("category.siblingHeading")}
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {siblings.map((sib) => (
                  <li key={sib.slug}>
                    <Link
                      href={`/categories/${sib.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-traya-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-traya-saffron/40 hover:shadow-md"
                    >
                      <div>
                        <span className="font-display text-base text-foreground">
                          {sib.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {sib.products.length}{" "}
                          {sib.products.length === 1
                            ? t("product")
                            : t("products")}
                        </span>
                      </div>
                      <svg
                        className="size-4 shrink-0 text-traya-saffron-lo transition-transform duration-300 ease-expo group-hover:translate-x-1 rtl:-scale-x-100 motion-reduce:transition-none"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        </Reveal>
      )}

      {/* 6. Quote request form (icon form   self-contained heading + trust panel) */}
      <Reveal>
        <section
          id="inquiry"
          className="border-t border-traya-border bg-background scroll-mt-32"
        >
          <Container className="py-section">
            <QuoteForm
              productName={category.title}
              testimonials={s.testimonials}
            />
          </Container>
        </section>
      </Reveal>
    </>
  );
}
