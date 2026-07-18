import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { HeroCarousel } from "./hero-carousel";
import { primaryBtn, secondaryBtn } from "./styles";
import type { HomePage } from "@/sanity/lib/types";

type HeroData = HomePage["hero"];

// Full-bleed hero on a light ingredient photograph (visual weight on the right,
// filling the section's full height). Uses Sanity data when available, falls
// back to i18n.
export async function Hero({ data }: { data?: HeroData }) {
  const t = await getTranslations("Home.hero");

  const eyebrow = data?.eyebrow || t("eyebrow");
  const heading = data?.heading || t("heading");
  const sub = data?.sub || t("sub");
  const cta = data?.ctaPrimaryLabel || t("cta");
  const ctaEnquiry = data?.ctaSecondaryLabel || t("ctaEnquiry");

  return (
    <section className="relative isolate overflow-hidden border-b border-traya-border bg-background">
      {/* Background image carousel   fills the hero's full height */}
      <HeroCarousel />
      {/* Left ivory gradient   keeps the left-side headline legible over the image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/95 via-48% to-background/10 lg:via-background/80 lg:via-58% lg:to-transparent"
      />

      <Container className="relative z-20 flex min-h-112 flex-col justify-center py-12 lg:min-h-120 lg:py-14">
        <div className="max-w-2xl">
          <p className="section-label">{eyebrow}</p>
          <h1 className="mt-5 text-balance font-display text-display-lg text-foreground">
            {heading}{" "}
            <span className="text-traya-red">
              {t("headingAccent")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/products" className={primaryBtn}>
              {cta}
            </Link>
            <a href="#enquiry" className={secondaryBtn}>
              {ctaEnquiry}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
