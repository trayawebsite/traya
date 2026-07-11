import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { FeatureItem } from "@/sanity/lib/types";

// The 4 operating foundations on a dark espresso band   "the standards behind
// the capabilities". Gold top-rules tie the accent in; the page's one dark
// chapter for tonal rhythm. (Re-homes the Philosophy content cut from About.)
const FOUNDATIONS = ["f1", "f2", "f3", "f4"] as const;

export async function Foundations({ data }: { data?: FeatureItem[] }) {
  const t = await getTranslations("Capabilities.foundations");
  const items =
    data && data.length > 0
      ? data.map((item) => ({
          title: item.title,
          description: item.description ?? "",
        }))
      : FOUNDATIONS.map((f) => ({
          title: t(`${f}Title`),
          description: t(`${f}Body`),
        }));

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            sub={t("body")}
            dark
          />
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              data-stagger
              className="border-t-2 border-traya-saffron/40 pt-5"
            >
              <h3 className="font-display text-lg text-traya-cream">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-traya-cream/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
