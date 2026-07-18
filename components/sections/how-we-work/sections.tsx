import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { Photo } from "@/components/sections/home/photo";

// How We Work   built from the client's skeleton, in the Traya design system.
// Sections: 8-step process · How we ship · Global reach.
// The closing ask is the global enquiry form (rendered site-wide in the layout).

// ── 1. Our process   8 steps ───────────────────────────────────────────
// A connected flow, not a plain numbered list: each step gets a solid number
// pill overlapping a circular line-icon badge (one capsule shape), bridged to
// the next step by an arrow. Built as two explicit row-groups of 4 (rather
// than one flat 8-item grid) so a "continues" marker can sit cleanly between
// them — a precise curved path connecting exact circle positions would break
// across 17 locales of variable copy length and RTL, so this marks the
// hand-off without depending on pixel-perfect alignment.
const STEP_ICONS = [
  // s1 Inquiry — message
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
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>,
  // s2 Requirement discussion — two people
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // s3 Quotation — itemised receipt
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
    <path d="M4 2h16v19l-3-2-2.5 2-2.5-2-2.5 2-2.5-2-3 2Z" />
    <path d="M8 7h8M8 11h8M8 15h4" />
  </svg>,
  // s4 Order confirmation — clipboard check
  <svg
    key="3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
    <path d="m9 14 2 2 4-4" />
  </svg>,
  // s5 Quality assurance — award medal with check
  <svg
    key="4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="m9 8 2 2 4-4" />
    <path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" />
  </svg>,
  // s6 Documentation — document with lines
  <svg
    key="5"
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
  // s7 Shipping — ship
  <svg
    key="6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M2 21c1.6 1.2 3.4 1.2 5 0 1.6 1.2 3.4 1.2 5 0 1.6 1.2 3.4 1.2 5 0" />
    <path d="M4 18 3 12h18l-1 6" />
    <path d="M8 12V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5" />
    <path d="M12 3v3" />
  </svg>,
  // s8 Delivery — truck
  <svg
    key="7"
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
] as const;

// Connector visibility per index within a 4-item row, at sm:grid-cols-2 vs
// lg:grid-cols-4 — show / show-at-lg-only / show / none (last column never
// connects to a same-row neighbour).
const CONNECTOR_CLASS = [
  "hidden sm:block",
  "hidden lg:block",
  "hidden sm:block",
  "",
] as const;

const ROW_1 = ["s1", "s2", "s3", "s4"] as const;
const ROW_2 = ["s5", "s6", "s7", "s8"] as const;

function StepRow({
  steps,
  startIndex,
  t,
}: {
  steps: readonly string[];
  startIndex: number;
  t: (key: string) => string;
}) {
  return (
    <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((k, i) => {
        const n = startIndex + i;
        const connectorClass = CONNECTOR_CLASS[i];
        return (
          <li key={k} data-stagger className="relative">
            <div className="flex items-center">
              <span className="flex h-12 shrink-0 items-center rounded-full bg-traya-red ps-4 pe-5 font-mono text-base font-bold text-traya-cream">
                {String(n + 1).padStart(2, "0")}
              </span>
              <span className="-ms-5 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-traya-clay/35 bg-background text-traya-clay">
                {STEP_ICONS[n]}
              </span>
              {connectorClass && (
                <span
                  aria-hidden
                  className={`${connectorClass} relative ml-3 h-px max-w-10 flex-1 rounded-full bg-traya-red/35 rtl:mr-3 rtl:ml-0`}
                >
                  <svg
                    className="absolute top-1/2 right-0 size-3 -translate-y-1/2 text-traya-red/70 rtl:right-auto rtl:left-0 rtl:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </span>
              )}
            </div>
            <h3 className="mt-5 font-display text-lg text-foreground">
              {t(`${k}Title`)}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t(`${k}Body`)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export async function Process() {
  const t = await getTranslations("HowWeWork.process");

  return (
    <Reveal>
      <section className="border-b border-traya-border bg-card sm:px-4 px-8">
        <Container className="py-section">
          <div className="max-w-2xl">
            <SectionHeader
              eyebrow={t("eyebrow")}
              heading={t("heading")}
              sub={t("sub")}
            />
          </div>

          <div className="mt-14">
            <StepRow steps={ROW_1} startIndex={0} t={t} />

            {/* Row hand-off   marks the sequence continuing into row 2
                without depending on exact circle-to-circle alignment. The
                py-6 keeps the same vertical rhythm at mobile too, even though
                the visual indicator itself only shows once rows actually
                wrap (sm+) — a single mobile column already reads continuous. */}
            <div aria-hidden className="flex items-center gap-3 py-6">
              <span className="hidden size-1.5 shrink-0 rounded-full bg-traya-red/60 sm:block" />
              <span className="hidden h-px flex-1 bg-traya-red/20 sm:block" />
              <svg
                className="hidden size-4 shrink-0 rotate-90 text-traya-red/60 sm:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </div>

            <StepRow steps={ROW_2} startIndex={4} t={t} />
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-pretty text-center text-sm italic leading-relaxed text-muted-foreground">
            {t("note")}
          </p>
        </Container>
      </section>
    </Reveal>
  );
}

// Freight-mode photos — each already carries its own branded caption baked
// into the image (e.g. "FCL AND LCL AVAILABLE"), so the card no longer needs
// a separate pill-badge overlay on top.
const SHIP_IMAGE: Record<"sea" | "air" | "courier", string> = {
  sea: "/sea.webp",
  air: "/air.webp",
  courier: "/delivery.webp",
};

// ── 2. How we ship   freight modes (deep band) ─────────────────────────
export async function HowWeShip() {
  const t = await getTranslations("HowWeWork.ship");
  const modes = ["sea", "air", "courier"] as const;

  return (
    <Reveal>
      <section className="relative isolate overflow-hidden bg-traya-deep text-traya-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-traya-red/60 to-transparent"
        />
        <Container className="py-section">
          <div className="max-w-2xl">
            <SectionHeader
              eyebrow={t("eyebrow")}
              heading={t("heading")}
              sub={t("sub")}
              dark
            />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {modes.map((key) => (
              <div
                key={key}
                data-stagger
                className="overflow-hidden rounded-2xl border border-traya-cream/12"
              >
                <div className="relative aspect-3/2 overflow-hidden">
                  <Photo
                    src={SHIP_IMAGE[key]}
                    alt={t(`${key}Title`)}
                    dark
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="size-full"
                  />
                </div>
                <div className="px-6 py-6 sm:px-7">
                  <h3 className="font-display text-lg text-traya-cream">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-traya-cream/60">
                    {t(`${key}Body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-traya-cream/10 bg-traya-cream/5 p-6">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-traya-red-hi/40 text-traya-red-hi">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </span>
            <p className="text-sm leading-relaxed text-traya-cream/60">
              {t("incoterms")}
            </p>
          </div>
        </Container>
      </section>
    </Reveal>
  );
}

// ── 3. Global reach   copy + world map ─────────────────────────────────
export async function GlobalReach() {
  const t = await getTranslations("HowWeWork.reach");
  const pillars = ["pillar1", "pillar2", "pillar3", "pillar4"] as const;

  return (
    <Reveal>
      <section className="border-b border-traya-border bg-card">
        <Container className="py-section">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <p className="section-label">{t("eyebrow")}</p>
              <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
                {t("heading")}{" "}
                <span className="text-traya-red">{t("headingAccent")}</span>
              </h2>
              <div className="mt-5 h-0.5 w-10 bg-traya-red" aria-hidden />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {t("p1")}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t("p2")}
              </p>
              <ul className="mt-7 space-y-3.5">
                {pillars.map((k) => (
                  <li
                    key={k}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-traya-red"
                      aria-hidden
                    />
                    {t(k)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-lg lg:self-center">
              <Image
                src="/home/global-reach.webp"
                alt={t("mapLabel")}
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="h-auto w-full"
              />
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {t("mapCaption")}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Reveal>
  );
}
