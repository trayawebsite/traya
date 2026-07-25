import { Check } from "lucide-react";
import { Fragment } from "react";
import { Container } from "@/components/ui/container";

// Shared legal-page scaffold (Privacy, Terms)   ONE structure so the two stay
// consistent with each other and with the site's centered inner-page headers.
// Each section renders EITHER a paragraph (`content`) or a ✓ bullet list
// (`items`). All content is data (i18n), passed in. No section numerals   a
// short saffron rule under each heading carries the rhythm instead, with a
// saffron diamond seam between sections (the same seam mark used in stats.tsx).
export function LegalLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: { title: string; content?: string; items?: string[] }[];
}) {
  return (
    <>
      <section className="border-b border-traya-border bg-background">
        <Container className="py-section-sm">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-display text-display-lg text-foreground">
              {title}
            </h1>
            <p className="mt-4 text-sm font-medium text-traya-saffron-lo">
              {lastUpdated}
            </p>
            {intro && (
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="max-w-3xl pt-section pb-section-lg">
          {sections.map((s, i) => (
            <Fragment key={s.title}>
              {i > 0 && (
                <div aria-hidden className="relative my-10 h-px bg-traya-border">
                  <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-traya-saffron" />
                </div>
              )}
              <section>
                <h2 className="font-display text-2xl text-foreground">
                  {s.title}
                </h2>
                <div aria-hidden className="mt-2 h-0.5 w-10 bg-traya-saffron" />
                {s.content && (
                  <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                    {s.content}
                  </p>
                )}
                {s.items && s.items.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80"
                      >
                        <Check
                          className="mt-1 size-4 shrink-0 text-traya-forest"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Fragment>
          ))}
        </Container>
      </section>
    </>
  );
}
