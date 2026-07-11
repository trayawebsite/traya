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

// Products hub (/products)   the catalogue entry point. Global Enquiry + Footer
// from the layout.
export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsHub />;
}
