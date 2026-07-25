import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { ProductsHub } from "@/components/sections/catalogue/products-hub";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Catalogue.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/products"),
  };
}

// Products hub (/products)   the catalogue entry point. Global inquiry + Footer
// from the layout. The optional ?range=food|chemicals opens the hub straight on
// that range's list (used by category/product breadcrumbs); read on the server
// so the initial HTML already shows the right tab   no hydration mismatch.
export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ range?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { range } = await searchParams;
  const initialRange = range === "food" || range === "chemicals" ? range : "all";
  return <ProductsHub initialRange={initialRange} />;
}
