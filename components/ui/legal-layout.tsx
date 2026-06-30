import {Container} from '@/components/ui/container';

// Shared legal-page scaffold (Privacy, Terms) — ONE structure so the two stay
// consistent with each other and with the site's centered inner-page headers.
// Header: centered title + a small last-updated meta, on the same `section-sm`
// rhythm as the other pages. Body: a left-aligned, numbered document at a
// readable measure. All content is data (i18n), passed in.
export function LegalLayout({
  title,
  lastUpdated,
  sections
}: {
  title: string;
  lastUpdated: string;
  sections: {title: string; content: string}[];
}) {
  return (
    <>
      <section className="border-b border-traya-border bg-background">
        <Container className="py-section-sm">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-display text-display-lg text-foreground">{title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{lastUpdated}</p>
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
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{s.content}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
