import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { IconChip } from "@/components/ui/icon-chip";

// "What We Offer"   8-item icon list (icon + vertical divider + title/body),
// matched to the client's reference. Line icons (never the reference's emoji
// style) to stay consistent with the rest of the site's icon language; several
// are reused verbatim from elsewhere (ship, clipboard-check, package, globe,
// handshake) so the same concept always reads as the same shape.
const ICON = "size-6";
const ICONS: React.ReactNode[] = [
  // Global Sourcing   globe with magnifier
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
    <circle cx="10" cy="10" r="7" />
    <path d="M10 3a13 13 0 0 1 0 14 13 13 0 0 1 0-14z" />
    <path d="M3.5 7.5h13M3.5 12.5h13" />
    <path d="m20.5 20.5-4.3-4.3" />
  </svg>,
  // Quality Assurance   shield check
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // Export Documentation   clipboard check
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
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
    <path d="m9 14 2 2 4-4" />
  </svg>,
  // Freight & Logistics   ship
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
    <path d="M2 21c1.6 1.2 3.4 1.2 5 0 1.6 1.2 3.4 1.2 5 0 1.6 1.2 3.4 1.2 5 0" />
    <path d="M4 18 3 12h18l-1 6" />
    <path d="M8 12V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5" />
    <path d="M12 3v3" />
  </svg>,
  // Packaging Solutions   package
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
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>,
  // Worldwide Reach   globe
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>,
  // Flexible Trade Terms   handshake
  <svg
    key="6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
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
  // Dedicated Support   headset
  <svg
    key="7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3ZM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" />
  </svg>,
];

const KEYS = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"] as const;

export async function CoreCapabilities() {
  const t = await getTranslations("Capabilities.core");

  return (
    <section className="border-b border-traya-border bg-card">
      <Container className="py-section">
        <div className="relative">
          <div className="max-w-2xl">
            <p className="section-label">{t("eyebrow")}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {t("heading")}
            </h2>
          </div>
          <Image
            src="/home/global-reach.webp"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            sizes="320px"
            className="pointer-events-none absolute inset-e-0 top-0 hidden h-auto w-72 opacity-70 lg:block xl:w-80"
          />
        </div>

        <ul className="relative mt-12">
          {KEYS.map((k, i) => (
            <li
              key={k}
              data-stagger
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-traya-border py-7 first:border-t-0"
            >
              <div className="flex items-stretch gap-6">
                <IconChip className="size-14">{ICONS[i]}</IconChip>
                <span aria-hidden className="w-px bg-traya-border" />
              </div>
              <div className="self-center">
                <h3 className="font-display text-xl text-foreground">
                  {t(`${k}Title`)}
                </h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  {t(`${k}Body`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
