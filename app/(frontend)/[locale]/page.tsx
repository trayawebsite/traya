import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Hero } from "@/components/sections/home/hero";
import { Intro } from "@/components/sections/home/intro";
import { Stats } from "@/components/sections/home/stats";
import { ProductGroups } from "@/components/sections/home/product-groups";
import { WhyTraya } from "@/components/sections/home/why-traya";
import { Testimonials } from "@/components/sections/home/testimonials";
import { CertBand } from "@/components/sections/home/cert-band";
import { Faq } from "@/components/sections/home/faq";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Reveal } from "@/components/ui/reveal";
import {
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo/organization-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/"),
  };
}

// Home flow (Who → What → Why → Proof → Act). Page COPY comes from i18n
// (messages/*.json) so it scales to many locales; product/cert/settings DATA
// comes from the catalogue + site-settings seams the sections fetch themselves.
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <Hero />
      <Reveal>
        <Intro />
      </Reveal>
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <ProductGroups />
      </Reveal>
      <Reveal>
        <WhyTraya />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <CertBand />
      </Reveal>
      {/* NOTE: the 3-step HowItWorks section was removed from the home flow  
          it triple-covered ground already held by the Intro pillars and the
          dedicated /how-we-work page. Component kept for reuse. */}
      <Reveal>
        <Faq />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
