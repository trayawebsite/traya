import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { InquiryListView } from "@/components/sections/inquiry-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inquiry.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/inquiry"),
    // Thin client-side RFQ utility page   keep it out of the index.
    robots: { index: false, follow: true },
  };
}

export default async function InquiryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div id="inquiry">
      <InquiryListView />
    </div>
  );
}
