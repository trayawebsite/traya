import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { secondaryBtn } from "./styles";
import { Photo } from "./photo";
import type { HomePage } from "@/sanity/lib/types";

type ProductsData = HomePage["productsSection"];

// "What We Export"   two headline photo cards (Food & Agro + Chemicals, both on
// the brand red), then a selection across the range in a duo-tone checkerboard:
// dehydrated/spice/herb/nutraceutical + two flagship Chemicals categories. Food
// tiles link to the hub; the two Chemicals tiles link to their category pages.
const FEATURED = [
  { key: "powders", img: "/home/tile-powders.webp", href: "/products" },
  { key: "spices", img: "/home/tile-spices.webp", href: "/products" },
  { key: "herbs", img: "/home/tile-herbs.webp", href: "/products" },
  {
    key: "nutraceutical",
    img: "/home/tile-nutraceutical.webp",
    href: "/products",
  },
  {
    key: "catFoodColours",
    img: "/home/tile-food-colours.webp",
    href: "/categories/food-colours",
  },
  {
    key: "catReactiveDyes",
    img: "/home/tile-reactive-dyes.webp",
    href: "/categories/reactive-dyes",
  },
] as const;

export async function ProductGroups({ data }: { data?: ProductsData }) {
  const t = await getTranslations("Home.groups");

  const eyebrow = data?.eyebrow || t("eyebrow");
  const heading = data?.heading || t("heading");
  const sub = data?.sub || t("sub");

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            headingAccent={t("headingAccent")}
            sub={sub}
          />
        </div>

        {/* Two headline ranges   matched photo cards on the brand red */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <HeadlineCard
            href="/products"
            img="/home/cover-food.webp"
            title={t("foodTitle")}
            body={t("foodBody")}
            cta={t("foodCta")}
          />
          <HeadlineCard
            href="/products"
            img="/home/cover-chemicals.webp"
            title={t("chemTitle")}
            body={t("chemBody")}
            cta={t("chemCta")}
          />
        </div>

        {/* A selection across the range   duo-tone bowl photos, food + chemicals */}
        <div className="mt-10">
          <p className="section-label">{t("selection")}</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURED.map((g) => (
              <li key={g.key} data-stagger>
                <Link
                  href={g.href}
                  className="group relative block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Photo
                    src={g.img}
                    alt={t(g.key)}
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="aspect-4/3 w-full transition-transform duration-500 ease-expo group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-traya-deep/85 via-traya-deep/15 to-transparent"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <span className="font-display text-sm leading-snug text-traya-cream sm:text-base">
                      {t(g.key)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing note   the range keeps expanding; invite off-catalogue asks. */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-traya-border bg-traya-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {t("note")}{" "}
            <span className="font-medium text-foreground">{t("noteAsk")}</span>
          </p>
          <a href="#enquiry" className={`${secondaryBtn} shrink-0`}>
            {t("cta")}
          </a>
        </div>
      </Container>
    </section>
  );
}

// Large headline card   full-bleed photo, dark gradient, bottom-anchored copy.
function HeadlineCard({
  href,
  img,
  title,
  body,
  cta,
}: {
  href: string;
  img: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      data-stagger
      className="group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-96"
    >
      <div className="absolute inset-0">
        <Photo
          src={img}
          alt={title}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="size-full transition-transform duration-500 ease-expo group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-traya-deep/92 via-traya-deep/45 to-transparent"
      />
      <div className="relative p-6 sm:p-8">
        <h3 className="font-display text-2xl text-traya-cream">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-traya-cream/80">
          {body}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-traya-cream">
          {cta}
          <span
            aria-hidden
            className="transition-transform duration-150 ease-expo group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
