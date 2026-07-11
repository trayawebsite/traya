import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { AboutHero } from "@/components/sections/about/about-hero";
import { FounderLetter } from "@/components/sections/about/founder-letter";
import { WhyAbout } from "@/components/sections/about/why-about";
import { VisionMission } from "@/components/sections/about/vision-mission";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/about"),
  };
}

// About page   COPY from i18n (messages/*.json) so it scales to many locales.
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Reveal>
        <FounderLetter />
      </Reveal>
      <Reveal>
        <WhyAbout />
      </Reveal>
      <Reveal>
        <VisionMission />
      </Reveal>
      <Reveal>
        <section
          id="enquiry"
          className="border-b border-traya-border bg-traya-surface"
        >
          <Container className="py-section">
            <ContactForm />
          </Container>
        </section>
      </Reveal>
    </>
  );
}
