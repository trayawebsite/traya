import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/site-settings";
import type { HomePage } from "@/sanity/lib/types";

type TestimonialsData = HomePage["testimonialsSection"];

// Social proof   editorial quote cards under a small "What buyers say" label.
export async function Testimonials({ data }: { data?: TestimonialsData }) {
  const t = await getTranslations("Home.testimonials");
  const s = await getSiteSettings();
  if (s.testimonials.length === 0) return null;

  const eyebrow = data?.eyebrow || t("eyebrow");

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <p className="section-label">{eyebrow}</p>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {s.testimonials.map((q, i) => (
            <li
              key={i}
              data-stagger
              className="flex flex-col rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <span
                aria-hidden
                className="font-display text-5xl leading-[0.5] text-traya-saffron/40"
              >
                &ldquo;
              </span>
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-foreground/90">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-traya-border pt-4">
                <p className="font-display text-sm font-medium text-foreground">
                  {q.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {q.role}
                  {q.location ? ` · ${q.location}` : ""}
                </p>
              </figcaption>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
