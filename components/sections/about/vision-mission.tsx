import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { IconChip } from "@/components/ui/icon-chip";
import type { AboutPage } from "@/sanity/lib/types";

const MISSION_KEYS = ["m1", "m2", "m3", "m4"] as const;

// One icon per mission point, matched to its copy: m1 premium quality → badge
// check, m2 partnerships → handshake, m3 reliable execution/logistics →
// clipboard check, m4 expansion/opportunity → trending-up. Reuses the exact
// stroke paths already established elsewhere on the site (stats band, the
// how-we-work process steps) so the icon language stays consistent.
const MISSION_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
    <path d="m9 14 2 2 4-4" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>,
] as const;

// Vision & Mission section. Uses Sanity data when available.
export async function VisionMission({ data }: { data?: AboutPage | null }) {
  const t = await getTranslations("About.vision");

  const vision = data?.vision || t("vision");
  const commitment = data?.commitment || t("commitment");

  // Use Sanity mission points if provided, otherwise fall back to i18n
  const missionPoints =
    data?.mission && data.mission.length > 0
      ? data.mission
      : MISSION_KEYS.map((k) => t(k));

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section-lg">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Vision   left */}
          <div>
            <h2 className="font-display text-display-sm text-traya-saffron lg:text-display">
              {t("visionLabel")}
            </h2>
            <p className="mt-5 text-balance font-display text-xl italic leading-tight text-foreground lg:text-2xl">
              {vision}
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              {commitment}
            </p>
            <Image
              src="/vision.png"
              alt=""
              aria-hidden="true"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="mt-8 h-auto w-full max-w-md"
            />
          </div>

          {/* Mission   right */}
          <div>
            <h2 className="font-display text-display-sm text-traya-saffron lg:text-display">
              {t("missionLabel")}
            </h2>
            <div className="mt-6 space-y-6">
              {missionPoints.map((m, i) => (
                <div
                  key={i}
                  data-stagger
                  className="flex gap-4 border-t border-traya-border pt-5"
                >
                  <IconChip className="size-9">
                    {MISSION_ICONS[i % MISSION_ICONS.length]}
                  </IconChip>
                  <div>
                    <span className="font-mono text-xs text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 leading-relaxed text-foreground/90">{m}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
