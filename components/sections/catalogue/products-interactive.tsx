'use client';

import {useState, useMemo} from 'react';
import {Link} from '@/i18n/navigation';
import {Photo} from '@/components/sections/home/photo';

type Category = {
  title: string;
  slug: string;
  group: string;
  description?: string;
  products: {name: string; slug: string}[];
};
type Group = {key: string; label: string; blurb: string; categories: Category[]};

// One representative photo per browse group (reused across the group's category
// cards). Uses the shared home-page product imagery.
const GROUP_IMAGE: Record<string, string> = {
  alliums: '/home/cover-food.webp',
  powders: '/home/tile-powders.webp',
  spices: '/home/tile-spices.webp',
  herbs: '/home/tile-herbs.webp',
  nutraceutical: '/home/tile-nutraceutical.webp',
  chemicals: '/home/cover-chemicals.webp'
};

export function ProductsInteractive({
  groups,
  labels
}: {
  groups: Group[];
  labels: {all: string; product: string; products: string; search: string; noResults: string};
}) {
  const [activeGroup, setActiveGroup] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let result = groups;
    if (activeGroup !== 'all') {
      result = groups.filter((g) => g.key === activeGroup);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.map((g) => ({
        ...g,
        categories: g.categories.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.products.some((p) => p.name.toLowerCase().includes(q))
        )
      })).filter((g) => g.categories.length > 0);
    }
    return result;
  }, [groups, activeGroup, query]);

  return (
    <>
      {/* Search + Filter tabs */}
      <div className="mt-12 space-y-6">
        {/* Search field */}
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="w-full rounded-full border border-traya-border bg-card py-2.5 ps-10 pe-4 text-sm text-foreground shadow-xs placeholder:text-muted-foreground/50 focus:border-traya-red/30 focus:outline-none focus:ring-2 focus:ring-traya-red/10"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2">
          <FilterPill active={activeGroup === 'all'} onClick={() => setActiveGroup('all')}>
            {labels.all}
          </FilterPill>
          {groups.map((g) => (
            <FilterPill
              key={g.key}
              active={activeGroup === g.key}
              onClick={() => setActiveGroup(g.key)}
            >
              {g.label}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
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
                          src={GROUP_IMAGE[g.key] ?? '/home/cover-food.webp'}
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
                          {cat.products.length}{' '}
                          {cat.products.length === 1 ? labels.product : labels.products}
                        </span>
                      </div>
                      <span className="flex flex-1 flex-col gap-1 px-5 py-4">
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-display text-lg leading-snug text-foreground">
                            {cat.title}
                          </span>
                          <svg
                            className="size-5 shrink-0 text-traya-saffron-lo transition-transform duration-300 ease-expo group-hover:translate-x-1 rtl:-scale-x-100 motion-reduce:transition-none"
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
          <p className="text-lg text-muted-foreground">{labels.noResults}</p>
        </div>
      )}
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-traya-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}
