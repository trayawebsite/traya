import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/site-settings";
import { Photo } from "@/components/sections/home/photo";
import type { Founder } from "@/sanity/lib/types";

// The founder's letter   the emotional centerpiece of the About page.
// Uses Sanity founder data when available, falls back to i18n.
export async function FounderLetter({ data }: { data?: Founder }) {
  const t = await getTranslations("About.founder");
  const s = await getSiteSettings();

  const name = data?.name || t("name");
  const title = data?.title || t("role");
  const letter =
    data?.letter || [t("p1"), t("p2"), t("p3"), t("p4"), t("p5")].join("\n\n");
  const paragraphs = data?.letter
    ? letter.split("\n\n").filter(Boolean)
    : [t("p1"), t("p2"), t("p3"), t("p4"), t("p5")];

  // Photo: use site-settings founderPhoto (already a URL string), or fallback
  const photoSrc = s.founderPhoto || "/team/neha-pardeshi.jpg";

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
          <Photo
            src={photoSrc}
            alt={name}
            dark
            sizes="(min-width: 1024px) 20rem, 100vw"
            className="mx-auto aspect-4/5 w-full max-w-xs rounded-2xl"
          />

          <div>
            <h2 className="text-balance font-display text-display-sm text-traya-cream lg:text-display">{t("eyebrow")}</h2>

            <div className="mt-6 space-y-4 leading-relaxed text-traya-cream/75">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Signature block   name as the byline, role as a small tracked
                caption beneath (an editorial signature, not a repeated label) */}
            <div className="mt-8 border-t border-traya-cream/15 pt-6">
              <p className="font-display text-2xl text-traya-cream sm:text-3xl">{name}</p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-traya-saffron">{title}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
