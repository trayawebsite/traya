'use client';

import {useState, useMemo, type ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Photo} from '@/components/sections/home/photo';
import {IconChip} from '@/components/ui/icon-chip';
import {CATEGORY_COVERS} from '@/lib/category-covers';

type Category = {
  title: string;
  slug: string;
  group: string;
  description?: string;
  products: {name: string; slug: string}[];
};
type Group = {key: string; label: string; blurb: string; categories: Category[]};

// One representative photo per browse group (fallback for categories without a
// dedicated cover). Uses the shared home-page product imagery.
const GROUP_IMAGE: Record<string, string> = {
  alliums: '/home/cover-food.webp',
  powders: '/home/tile-powders.webp',
  spices: '/home/tile-spices.webp',
  herbs: '/home/tile-herbs.webp',
  nutraceutical: '/home/tile-nutraceutical.webp',
  chemicals: '/home/cover-chemicals.webp'
};

// Prefer a category's own cover (CATEGORY_COVERS); fall back to its group photo.
function categoryImage(cat: Category): string {
  if (CATEGORY_COVERS.has(cat.slug)) return `/categories/${cat.slug}.webp`;
  return GROUP_IMAGE[cat.group] ?? '/home/cover-food.webp';
}

// The 6 underlying browse groups are presented to buyers as 2 top-level ranges
// (Food & Agro, Chemicals), so the hub opens on a simple choice instead of a
// 30-category wall  scales cleanly as more categories/groups are added later.
const SUPER_GROUPS = [
  {key: 'food', groupKeys: ['alliums', 'powders', 'spices', 'herbs', 'nutraceutical'], dot: 'bg-traya-red'},
  {key: 'chemicals', groupKeys: ['chemicals'], dot: 'bg-traya-slate'}
] as const;
type SuperKey = 'all' | (typeof SUPER_GROUPS)[number]['key'];

const SUPER_ICON: Record<(typeof SUPER_GROUPS)[number]['key'], ReactNode> = {
  food: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  chemicals: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M9 2v6.5L4 18a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3l-5-9.5V2" />
      <path d="M7 2h10" />
      <path d="M8.5 12h7" />
    </svg>
  )
};

function ArrowIcon({className = 'text-traya-saffron-lo'}: {className?: string}) {
  return (
    <svg
      className={`size-4 shrink-0 transition-transform duration-300 ease-expo group-hover:translate-x-1 rtl:-scale-x-100 motion-reduce:transition-none ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ProductsInteractive({groups}: {groups: Group[]}) {
  const t = useTranslations('Catalogue');
  const tg = useTranslations('Home.groups');
  const [activeSuper, setActiveSuper] = useState<SuperKey>('all');
  const [query, setQuery] = useState('');

  const superStats = useMemo(() => {
    const stats: Record<string, {categories: number; products: number}> = {};
    for (const sg of SUPER_GROUPS) {
      const keys: readonly string[] = sg.groupKeys;
      const cats = groups.filter((g) => keys.includes(g.key));
      stats[sg.key] = {
        categories: cats.reduce((n, g) => n + g.categories.length, 0),
        products: cats.reduce((n, g) => n + g.categories.reduce((m, c) => m + c.products.length, 0), 0)
      };
    }
    return stats;
  }, [groups]);

  const scopedGroups = useMemo(() => {
    if (activeSuper === 'all') return groups;
    const sg = SUPER_GROUPS.find((s) => s.key === activeSuper);
    const keys: readonly string[] = sg?.groupKeys ?? [];
    return groups.filter((g) => keys.includes(g.key));
  }, [groups, activeSuper]);

  // Search always looks across every group, not just the active tab's scope —
  // otherwise a query typed while "Chemicals" is selected would silently miss
  // Food & Agro matches with no indication why.
  const filtered = useMemo(() => {
    if (!query.trim()) return scopedGroups;
    const q = query.toLowerCase().trim();
    return groups
      .map((g) => ({
        ...g,
        categories: g.categories.filter(
          (c) => c.title.toLowerCase().includes(q) || c.products.some((p) => p.name.toLowerCase().includes(q))
        )
      }))
      .filter((g) => g.categories.length > 0);
  }, [groups, scopedGroups, query]);

  // The 2-card overview only shows on the unfiltered "All Categories" view;
  // any search, or picking a specific range, drills straight into the grid.
  const showOverview = activeSuper === 'all' && !query.trim();
  const catWord = (n: number) => (n === 1 ? t('hub.category') : t('hub.categories'));
  const prodWord = (n: number) => (n === 1 ? t('product') : t('products'));

  const cardCopy: Record<(typeof SUPER_GROUPS)[number]['key'], {title: string; body: string; cta: string}> = {
    food: {title: tg('foodTitle'), body: tg('foodBody'), cta: tg('foodCta')},
    chemicals: {title: tg('chemTitle'), body: tg('chemBody'), cta: tg('chemCta')}
  };

  return (
    <>
      {/* Search + range tabs */}
      <div className="space-y-6">
        <div className="relative mx-auto max-w-md">
          <svg
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) setActiveSuper('all');
            }}
            placeholder={t('hub.search')}
            className="w-full rounded-full border border-traya-border bg-card py-2.5 ps-10 pe-4 text-sm text-foreground shadow-xs placeholder:text-muted-foreground/50 focus:border-traya-red/30 focus:outline-none focus:ring-2 focus:ring-traya-red/10"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <TabCard
            active={activeSuper === 'all'}
            dotClassName="bg-foreground"
            title={t('hub.allCategories')}
            count={t('hub.allCategoriesSub')}
            onClick={() => setActiveSuper('all')}
          />
          {SUPER_GROUPS.map((sg) => (
            <TabCard
              key={sg.key}
              active={activeSuper === sg.key}
              dotClassName={sg.dot}
              title={cardCopy[sg.key].title}
              count={`${superStats[sg.key].categories} ${catWord(superStats[sg.key].categories)}`}
              onClick={() => setActiveSuper(sg.key)}
            />
          ))}
        </div>
      </div>

      {/* Overview: 2 range cards (only on the unfiltered "All Categories" view).
          Icon chip + eyebrow + title + description + stats, in the same
          language as the rest of the site's icon cards (vision/mission,
          why-traya, capabilities) rather than a one-off treatment. */}
      {showOverview && (
        <ul className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
          {SUPER_GROUPS.map((sg, i) => {
            const copy = cardCopy[sg.key];
            const stats = superStats[sg.key];
            return (
              <li key={sg.key}>
                <button
                  type="button"
                  onClick={() => setActiveSuper(sg.key)}
                  data-stagger
                  className="group relative flex h-full w-full flex-col rounded-2xl border border-traya-border bg-card p-6 text-start shadow-sm transition-all duration-300 hover:border-traya-saffron/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <IconChip className="size-11">{SUPER_ICON[sg.key]}</IconChip>
                    <span className="flex items-center gap-2">
                      <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${sg.dot}`} />
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {t('hub.groupLabel')} {String(i + 1).padStart(2, '0')}
                      </span>
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-display-sm text-foreground">{copy.title}</h3>
                  <p className="mt-2.5 max-w-md text-pretty leading-relaxed text-muted-foreground">{copy.body}</p>

                  <span className="mt-5 font-mono text-xs font-medium uppercase tracking-[0.08em] text-traya-saffron-lo">
                    {stats.categories} {catWord(stats.categories)} · {stats.products}+ {prodWord(stats.products)}
                  </span>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-traya-red-deep">
                    {copy.cta}
                    <ArrowIcon />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Category grid: shown when a range is selected, or when searching */}
      {!showOverview &&
        (filtered.length > 0 ? (
          <div className="mt-14 space-y-14">
            {filtered.map((g) => (
              <div key={g.key}>
                <div className="max-w-2xl border-b border-traya-border pb-5">
                  <h2 className="font-display text-display-sm text-foreground">{g.label}</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{g.blurb}</p>
                </div>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-traya-border bg-card shadow-sm transition-all duration-300 hover:border-traya-saffron/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Photo
                            src={categoryImage(cat)}
                            alt={cat.title}
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="h-full w-full"
                            imgClassName="transition-transform duration-500 ease-expo group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"
                          />
                          <span className="absolute top-3 end-3 inline-flex items-center rounded-full bg-traya-cream/90 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-traya-forest backdrop-blur-sm">
                            {cat.products.length} {prodWord(cat.products.length)}
                          </span>
                        </div>
                        <span className="flex flex-1 flex-col gap-1 px-5 py-4">
                          <span className="flex items-center justify-between gap-3">
                            <span className="font-display text-lg leading-snug text-foreground">
                              {cat.title}
                            </span>
                            <ArrowIcon />
                          </span>
                          {cat.description && (
                            <span className="text-sm leading-relaxed text-muted-foreground">
                              {cat.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground">{t('hub.noResults')}</p>
          </div>
        ))}
    </>
  );
}

// Underline tabs   plain text + a bottom-border indicator on the active tab,
// Pill tab   a clear, single-line clickable chip (filled when active,
// bordered when not), simpler than the original boxed two-line pill but
// still unmistakably a button rather than plain text.
function TabCard({
  active,
  dotClassName,
  title,
  count,
  onClick
}: {
  active: boolean;
  dotClassName: string;
  title: string;
  count: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active
          ? 'border-traya-deep bg-traya-deep text-traya-cream'
          : 'border-traya-border bg-card text-foreground hover:border-traya-saffron/40 hover:bg-traya-surface'
      }`}
    >
      <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${dotClassName}`} />
      {title}
      <span className={active ? 'text-traya-cream/60' : 'text-muted-foreground'}>({count})</span>
    </button>
  );
}
