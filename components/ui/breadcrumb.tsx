import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Breadcrumb trail   Home › Products › Category › Product. Pass items in order;
// the last (no href) is the current page. An href may be a plain path or an
// object with a query (next-intl drops the query from a string href, so a
// range-linked crumb must use the object form).
type Href = string | { pathname: string; query?: Record<string, string> };
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: Href }[];
}) {
  const t = useTranslations("Links");
  return (
    <nav aria-label={t("breadcrumb")}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
            {i > 0 && (
              <span aria-hidden className="text-traya-border">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-sm transition-colors hover:text-traya-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/70" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
