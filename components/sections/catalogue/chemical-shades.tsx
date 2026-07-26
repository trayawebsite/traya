"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Plus, Search } from "lucide-react";
import { useInquiry } from "@/lib/inquiry-context";
import { shadeHex } from "@/lib/chemical-shades";

export type Shade = {
  name: string;
  slug: string;
  colourIndex?: string;
  packSizes?: string;
};

export type SubRange = {
  name: string;
  blurb?: string;
  shades: Shade[];
};

type Labels = {
  subRangeHeading: string;
  allSubRanges: string;
  /** Unit noun for one / many items   "shade(s)" for colour ranges, but
      "product(s)" for resins, which have no shade. */
  unitOne: string;
  unitMany: string;
  search: string;
  noResults: string;
  add: string;
  added: string;
  addedToast: string;
  quote: string;
  sample: string;
  refLabel: string;
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Speciality-chemicals browsing: sub-range tiles → per-sub-range shade grids.
// A dye category is a *colour* catalogue, so the shade itself has to be the
// primary visual   a flat text list of 79 near-identical product names is
// unreadable. Tiles give the category structure at a glance; the grids let a
// buyer scan a whole sub-range by eye, then open one shade for its reference
// number and actions.
export function ChemicalShades({
  subRanges,
  categoryTitle,
  categorySlug,
  labels,
}: {
  subRanges: SubRange[];
  categoryTitle: string;
  categorySlug: string;
  labels: Labels;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");
  const [openShade, setOpenShade] = useState<string | null>(null);

  const total = useMemo(
    () => subRanges.reduce((n, s) => n + s.shades.length, 0),
    [subRanges],
  );

  // Search spans every sub-range (name + reference), so a query typed while one
  // sub-range is selected can never silently hide matches elsewhere.
  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    const scoped =
      !q && active !== "all"
        ? subRanges.filter((s) => slugify(s.name) === active)
        : subRanges;
    if (!q) return scoped;
    return subRanges
      .map((s) => ({
        ...s,
        shades: s.shades.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.colourIndex?.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.shades.length > 0);
  }, [subRanges, query, active]);

  const found = visible.reduce((n, s) => n + s.shades.length, 0);
  const word = (n: number) => (n === 1 ? labels.unitOne : labels.unitMany);

  return (
    <>
      {/* Sub-range tiles   the category's structure, stated once and up front */}
      {subRanges.length > 1 && (
        <div className="mt-10">
          <h3 className="font-display text-display-sm text-foreground">
            {labels.subRangeHeading}
          </h3>
          {/* 2 sub-ranges sit as a balanced pair; 3+ use three columns rather
              than leaving a conspicuous hole in the row. */}
          <ul
            className={`mt-6 grid gap-4 sm:grid-cols-2 ${
              subRanges.length === 2 ? "" : "lg:grid-cols-3"
            }`}
          >
            {subRanges.map((sr) => (
              <li key={sr.name}>
                <a
                  href={`#sr-${slugify(sr.name)}`}
                  data-stagger
                  onClick={() => {
                    setActive("all");
                    setQuery("");
                  }}
                  className="group flex h-full flex-col rounded-2xl border border-traya-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-traya-saffron/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {/* Shade preview strip   what this sub-range looks like */}
                  <span aria-hidden className="flex gap-1">
                    {sr.shades.slice(0, 10).map((p) => (
                      <span
                        key={p.slug}
                        className="h-6 flex-1 rounded-sm ring-1 ring-inset ring-black/10"
                        style={{ background: shadeHex(p.name, p.colourIndex) }}
                      />
                    ))}
                  </span>
                  <span className="mt-4 font-display text-lg leading-snug text-foreground">
                    {sr.name}
                  </span>
                  <span className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-traya-saffron-lo">
                    {sr.shades.length} {word(sr.shades.length)}
                  </span>
                  {sr.blurb && (
                    <span className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {sr.blurb}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search + sub-range filter */}
      <div className="mt-12 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="w-full rounded-full border border-traya-border bg-card py-2.5 ps-10 pe-4 text-sm text-foreground shadow-xs placeholder:text-muted-foreground/50 focus:border-traya-red/30 focus:outline-none focus:ring-2 focus:ring-traya-red/10"
          />
        </div>

        {subRanges.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={active === "all" && !query}
              label={`${labels.allSubRanges} (${total})`}
              onClick={() => {
                setActive("all");
                setQuery("");
              }}
            />
            {subRanges.map((sr) => (
              <FilterPill
                key={sr.name}
                active={active === slugify(sr.name) && !query}
                label={`${sr.name} (${sr.shades.length})`}
                onClick={() => {
                  setActive(slugify(sr.name));
                  setQuery("");
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Shade grids, one block per sub-range */}
      {found > 0 ? (
        <div className="mt-10 space-y-14">
          {visible.map((sr) => (
            <section key={sr.name} id={`sr-${slugify(sr.name)}`} className="scroll-mt-32">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-traya-border pb-3">
                <h3 className="font-display text-xl text-foreground">
                  {sr.name}
                </h3>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-traya-saffron-lo">
                  {sr.shades.length} {word(sr.shades.length)}
                </span>
              </div>
              {sr.blurb && (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {sr.blurb}
                </p>
              )}

              {/* Capped at 4 across   wider cards keep the shade name, the
                  reference number and the swatch all comfortably readable. */}
              <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {sr.shades.map((p) => (
                  <ShadeCard
                    key={p.slug}
                    shade={p}
                    categoryTitle={categoryTitle}
                    categorySlug={categorySlug}
                    labels={labels}
                    open={openShade === p.slug}
                    onToggle={() =>
                      setOpenShade((s) => (s === p.slug ? null : p.slug))
                    }
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">
          {labels.noResults}
        </p>
      )}
    </>
  );
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active
          ? "border-traya-deep bg-traya-deep text-traya-cream"
          : "border-traya-border bg-card text-foreground hover:border-traya-saffron/40 hover:bg-traya-surface"
      }`}
    >
      {label}
    </button>
  );
}

// One shade. Collapsed it is a swatch + name + reference (all a buyer needs to
// scan); expanded it reveals the reference detail and the actions, so a 79-shade
// grid stays readable instead of repeating three buttons 79 times.
function ShadeCard({
  shade,
  categoryTitle,
  categorySlug,
  labels,
  open,
  onToggle,
}: {
  shade: Shade;
  categoryTitle: string;
  categorySlug: string;
  labels: Labels;
  open: boolean;
  onToggle: () => void;
}) {
  const { add, has } = useInquiry();
  const added = has(shade.slug);
  const hex = shadeHex(shade.name, shade.colourIndex);
  const isResin = categorySlug === "paint-resins";

  return (
    <li
      data-stagger
      className={`overflow-hidden rounded-xl border bg-card transition-colors ${
        open ? "border-traya-red/30" : "border-traya-border"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        {/* Resins are colourless binders   a colour chip there would be a lie,
            so they render as a plain spec card instead of a swatch. */}
        {!isResin && (
          <span
            aria-hidden
            className="block h-14 w-full ring-1 ring-inset ring-black/10"
            style={{ background: hex }}
          />
        )}
        <span className={`block px-3 ${isResin ? "py-4" : "py-2.5"}`}>
          <span className="block text-[13px] font-medium leading-snug text-foreground">
            {shade.name}
          </span>
          {(shade.colourIndex || !isResin) && (
            <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground">
              {shade.colourIndex || "—"}
            </span>
          )}
        </span>
      </button>

      {open && (
        <div className="border-t border-traya-border px-3 pb-3 pt-2.5">
          <dl className="space-y-1 text-[11px]">
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">{labels.refLabel}</dt>
              <dd className="text-end font-mono text-foreground">
                {shade.colourIndex || "—"}
              </dd>
            </div>
            {shade.packSizes && (
              <div className="flex justify-between gap-2">
                <dt className="shrink-0 text-muted-foreground">Pack</dt>
                <dd className="text-end text-foreground">{shade.packSizes}</dd>
              </div>
            )}
          </dl>

          <div className="mt-3 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (!added) {
                  add({
                    slug: shade.slug,
                    name: shade.name,
                    category: categoryTitle,
                  });
                  toast.success(labels.addedToast);
                }
              }}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                added
                  ? "border border-traya-forest/30 bg-traya-forest/10 text-traya-forest"
                  : "border border-traya-border bg-background text-foreground hover:border-traya-red/30"
              }`}
            >
              {added ? (
                <Check className="size-3" aria-hidden="true" />
              ) : (
                <Plus className="size-3" aria-hidden="true" />
              )}
              {added ? labels.added : labels.add}
            </button>
            <a
              href={`?product=${encodeURIComponent(shade.name)}#inquiry`}
              className="inline-flex items-center justify-center rounded-md bg-traya-red px-2.5 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-traya-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {labels.quote}
            </a>
            <a
              href={`?intent=sample&product=${encodeURIComponent(shade.name)}#inquiry`}
              className="inline-flex items-center justify-center rounded-md border border-traya-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-traya-red/30"
            >
              {labels.sample}
            </a>
          </div>
        </div>
      )}
    </li>
  );
}
