import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

// Centered inner-page header   the ONE shared recipe for every sub-page
// (/about, /capabilities, /certifications, /contact, /products), so they read as
// a consistent system that's deliberately distinct from the immersive, left-
// aligned home hero. A centered header is self-balancing (no dead right half),
// which is exactly what the image-less inner pages need.
//
// Recipe: eyebrow → Lora heading → optional gold tagline → one tight sub, all
// centered. `children` render as a centered band BELOW the header (image banner,
// credentials row) so any extra content sits as evidence under the statement.
export function PageHero({
  eyebrow,
  heading,
  tagline,
  sub,
  children,
}: {
  eyebrow: string;
  heading: string;
  tagline?: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section-sm">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label">{eyebrow}</p>
          <h1 className="mt-3 text-balance font-display text-display-lg text-foreground">
            {heading}
          </h1>
          {tagline && (
            <p className="mt-3 font-display text-lg italic text-traya-saffron-lo">
              {tagline}
            </p>
          )}
          {sub && (
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {sub}
            </p>
          )}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </Container>
    </section>
  );
}
