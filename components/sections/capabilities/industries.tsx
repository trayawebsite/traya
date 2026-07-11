import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { IconChip } from "@/components/ui/icon-chip";

// "Industries We Serve"   the eight sectors Traya's portfolio supports. Bordered
// cards, centred line icons (never emoji), matched to the client's reference.
const ICON = "size-6";
const ICONS: React.ReactNode[] = [
  // Pharmaceuticals & Nutraceuticals   pill
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
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </svg>,
  // Food & Beverage   fork & knife
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
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>,
  // Food Processing   factory
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
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>,
  // Textile & Dyeing   shirt
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
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  </svg>,
  // Paints & Coatings   paint roller
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
    <rect width="16" height="6" x="2" y="2" rx="2" />
    <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect width="4" height="6" x="8" y="16" rx="1" />
  </svg>,
  // Water Treatment   droplet
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
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>,
  // Health & Wellness   heart with pulse line
  <svg
    key="6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={ICON}
    aria-hidden="true"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>,
  // Industrial Manufacturing   gear
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
];

const KEYS = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8"] as const;

export async function IndustriesWeServe() {
  const t = await getTranslations("Capabilities.industries");

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">{t("eyebrow")}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("sub")}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KEYS.map((k, i) => (
            <li
              key={k}
              data-stagger
              className="flex flex-col items-center rounded-2xl border border-traya-border bg-card p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <IconChip>{ICONS[i]}</IconChip>
              <h3 className="mt-4 font-display text-lg leading-snug text-foreground">
                {t(`${k}Title`)}
              </h3>
              <span
                aria-hidden
                className="mt-3 block h-px w-8 bg-traya-saffron/60"
              />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`${k}Body`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
