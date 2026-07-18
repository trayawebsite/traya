import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { IconChip } from "@/components/ui/icon-chip";
import type { HomePage } from "@/sanity/lib/types";

type IntroData = HomePage["intro"];

// "How Traya helps"   split hero-style band: narrative on the left, the
// trade-route world map on the right, and the three service pillars in a
// divided row underneath.
const FEATURE_ICONS = [
  // Product sourcing   package (reads as "products" more directly than a globe)
  <svg
    key="0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>,
  // Export documentation   document with lines
  <svg
    key="1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>,
  // Shipment support   delivery truck (reads clearly at small size, unlike a
  // detailed ship silhouette)
  <svg
    key="2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>,
];

const FEATURE_KEYS = ["f1", "f2", "f3"] as const;

export async function Intro({ data }: { data?: IntroData }) {
  const t = await getTranslations("Home");

  const eyebrow = data?.eyebrow || t("intro.eyebrow");
  const body = data?.body || t("intro.body");

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        {/* Reference layout: narrative + pillar row stacked in the left column,
            the map filling the right column's full height */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <p className="section-label">{eyebrow}</p>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-display-sm text-foreground lg:text-display">
              {data?.heading ? (
                data.heading
              ) : (
                <>
                  {t("intro.heading")}{" "}
                  <span className="text-traya-red">
                    {t("intro.headingAccent")}
                  </span>
                </>
              )}
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {body}
            </p>

            {/* Service pillars   anchored under the narrative, reference-style */}
            <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-0">
              {FEATURE_KEYS.map((k, i) => (
                <li
                  key={k}
                  data-stagger
                  className={`flex flex-col items-start ${
                    i > 0 ? "sm:border-s sm:border-traya-border sm:ps-6" : ""
                  } ${i < FEATURE_KEYS.length - 1 ? "sm:pe-6" : ""}`}
                >
                  <IconChip className="size-11">{FEATURE_ICONS[i]}</IconChip>
                  <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                    {t(`intro.${k}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`intro.${k}Body`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Trade-route world map (decorative)   fills the right column */}
          <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center lg:self-stretch">
            <Image
              src="/trade-map-relief.webp"
              alt=""
              aria-hidden="true"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
