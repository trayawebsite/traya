import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { secondaryBtn } from "./styles";
import type { HomePage, FeatureItem } from "@/sanity/lib/types";

type WhyData = HomePage["why"];

// Six differentiators in a framed hairline matrix (border-gap grid)   structured
// and editorial rather than floaty. Line icons only, never emoji. Uses Sanity
// items when available, falls back to i18n.
const ICON = "size-5";
const WHY_ICONS: React.ReactNode[] = [
  // Trusted relationships   handshake
  <svg
    key="0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>,
  // Quality commitment   award rosette
  <svg
    key="1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>,
  // Professional execution   gear
  <svg
    key="2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Responsive communication   chat with dots
  <svg
    key="3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
  </svg>,
  // Global perspective   globe
  <svg
    key="4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>,
  // Growing together   trending up
  <svg
    key="5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>,
];
const WHY_KEYS = [
  "trusted",
  "quality",
  "execution",
  "communication",
  "global",
  "growth",
] as const;

export async function WhyTraya({ data }: { data?: WhyData }) {
  const t = await getTranslations("Home.why");

  const eyebrow = data?.eyebrow || t("eyebrow");
  const heading = data?.heading || t("heading");
  const sub = t("sub");
  const cta = t("cta");

  // Use Sanity items if provided, otherwise fall back to i18n
  const items =
    data?.items && data.items.length > 0
      ? data.items.map((item: FeatureItem, i: number) => ({
          title: item.title,
          description: item.description || "",
          icon: WHY_ICONS[i % WHY_ICONS.length],
        }))
      : WHY_KEYS.map((key, i) => ({
          title: t(key),
          description: t(`${key}Body`),
          icon: WHY_ICONS[i],
        }));

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {heading}{" "}
            <span className="text-traya-red">
              {t("headingAccent")}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {sub}
          </p>
        </div>

        {/* Framed hairline matrix: the 1px gaps over a border-toned backdrop read
            as dividers, giving the six cells structure instead of floating. */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-traya-border bg-traya-border/70">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col bg-card p-7 transition-colors duration-200 ease-expo hover:bg-background sm:p-8"
              >
                <span className="grid size-11 place-items-center rounded-xl border border-traya-border bg-traya-saffron-soft text-traya-saffron-lo transition-colors duration-200 ease-expo group-hover:border-traya-saffron/40">
                  {item.icon}
                </span>
                <h3 className="mt-5 font-display text-lg text-foreground">
                  {item.title}
                </h3>
                <span
                  aria-hidden
                  className="mt-3 block h-px w-8 bg-traya-saffron/70"
                />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/capabilities" className={secondaryBtn}>
            {cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
