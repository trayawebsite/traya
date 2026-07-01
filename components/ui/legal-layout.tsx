import {Check} from 'lucide-react';
import {Container} from '@/components/ui/container';

// Shared legal-page scaffold (Privacy, Terms) — ONE structure so the two stay
// consistent with each other and with the site's centered inner-page headers.
// Each section renders EITHER a paragraph (`content`) or a ✓ bullet list
// (`items`). All content is data (i18n), passed in.
export function LegalLayout({
  title,
  lastUpdated,
  intro,
  sections
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: {title: string; content?: string; items?: string[]}[];
}) {
  return (
    <>
      <section className="border-b border-traya-border bg-background">
        <Container className="py-section-sm">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-display text-display-lg text-foreground">{title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{lastUpdated}</p>
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
          <div className="space-y-12">
            {sections.map((s, i) => (
              <section key={s.title}>
                <h2 className="font-display text-2xl text-foreground">
                  <span className="me-3 font-mono text-base font-medium text-traya-saffron-lo">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.title}
                </h2>
                {s.content && (
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{s.content}</p>
                )}
                {s.items && s.items.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80"
                      >
                        <Check className="mt-1 size-4 shrink-0 text-traya-forest" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
