import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import type { AboutPage } from "@/sanity/lib/types";

const MISSION_KEYS = ["m1", "m2", "m3", "m4"] as const;

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
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Vision   left */}
          <div>
            <h2 className="font-display text-display-sm text-traya-saffron lg:text-display">
              {t("visionLabel")}
            </h2>
            <p className="mt-5 text-balance font-display text-xl italic leading-tight text-traya-cream lg:text-2xl">
              {vision}
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-traya-cream/60">
              {commitment}
            </p>
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
                  className="flex gap-4 border-t border-traya-cream/15 pt-5"
                >
                  <span className="font-mono text-xs text-traya-cream/50">
                    0{i + 1}
                  </span>
                  <p className="leading-relaxed text-traya-cream/80">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
