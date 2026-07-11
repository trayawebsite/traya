import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";

// Capabilities header   the "solutions house" signal: Traya runs the full trade
// cycle, not just supply. Centered page header (shared PageHero recipe).
export async function CapabilitiesHero() {
  const t = await getTranslations("Capabilities.hero");
  return (
    <PageHero eyebrow={t("eyebrow")} heading={t("heading")} sub={t("body")} />
  );
}
