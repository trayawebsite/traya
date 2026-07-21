import { getTranslations } from "next-intl/server";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.trayaexim.com";

// Rich category template   follows the playbook's Kanegrade pattern:
// Hero · Product grid · Sourcing story · Specs & packaging · Certs · Sibling links · CTA
export async function CategoryView({
  category,
}: {
  category: CatalogueCategory;
}) {
  const t = await getTranslations("Catalogue");
  const tg = await getTranslations("Home.groups");
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
      ? category.moqPackaging.map((sp) => ({ label: sp.label, value: sp.value }))
      : isChemicals
        ? [
            { label: t("category.specOrigin"), value: t("category.specOriginVal") },
            { label: t("category.specMoq"), value: t("category.specMoqValChem") },
            { label: t("category.specPackaging"), value: t("category.specPackagingValChem") },
            { label: t("category.specDocs"), value: t("category.specDocsVal") },
          ]
        : [
            { label: t("category.specOrigin"), value: t("category.specOriginVal") },
            { label: t("category.specMoq"), value: t("category.specMoqVal") },
            { label: t("category.specPackaging"), value: t("category.specPackagingVal") },
            { label: t("category.specIncoterms"), value: t("category.specIncotermsVal") },
          ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: tl("home"), url: siteUrl },
          { name: tl("products"), url: `${siteUrl}/products` },
          { name: category.title, url: `${siteUrl}/categories/${category.slug}` },
        ]}
      />
      {/* 1. Category Hero */}
      <section className="border-b border-traya-border bg-background">
        <Container className="py-section-lg">
          <Breadcrumb
            items={[
              { label: tl("home"), href: "/" },
              { label: tl("products"), href: "/products" },
              { label: category.title },
            ]}
          />
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="max-w-3xl lg:col-span-7 xl:col-span-8">
              <p className="section-label">{tg(category.group)}</p>
              <h1 className="mt-4 text-balance font-display text-display-lg text-foreground">
                {category.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {count} {count === 1 ? t("product") : t("products")}
              </p>
              {category.description && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              )}
            </div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-70 lg:block lg:col-span-5 lg:justify-self-center xl:col-span-4 xl:max-w-80">
              <Image
                src={heroImageSrc}
                alt={category.title}
                fill
                priority
                sizes="320px"
                className="object-contain transition-transform duration-700 ease-expo hover:scale-105"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Product Grid */}
      <Reveal>
        <section className="bg-traya-surface">
          <Container className="py-section">
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
              }))}
              labels={{
                search: t("category.search"),
                noResults: t("category.noResults"),
              }}
              categoryTitle={category.title}
              specs={specRows}
            />
            <div className="mt-10">
              <a href="#enquiry" className={primaryButton}>
                {t("category.enquireCta")}
              </a>
            </div>
          </Container>
        </section>
      </Reveal>

      {/* 3. Sourcing & Origin Story + Specs */}
      <Reveal>
        <section className="border-b border-traya-border bg-background">
          <Container className="py-section">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="section-label">{t("category.sourcingHeading")}</p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {t("category.sourcingBody")}
                </p>
                {/* Quality & Compliance from Sanity */}
                {category.qualityCompliance && (
                  <div className="mt-6 rounded-xl border border-traya-border bg-traya-surface p-4">
                    <h3 className="font-display text-base text-foreground">
                      {t("category.certsHeading")}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {category.qualityCompliance}
                    </p>
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-traya-border bg-traya-surface p-6">
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
              </div>
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
                        className="size-4 shrink-0 text-traya-saffron-lo transition-transform duration-300 ease-expo group-hover:translate-x-1 rtl:-scale-x-100"
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
          id="enquiry"
          className="border-t border-traya-border bg-background scroll-mt-24"
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
