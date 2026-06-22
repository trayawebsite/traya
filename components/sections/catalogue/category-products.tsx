'use client';

import {useState, useMemo} from 'react';
import {Link} from '@/i18n/navigation';

type Product = {name: string; slug: string};

export function CategoryProductList({
  products,
  labels
}: {
  products: Product[];
  labels: {search: string; noResults: string};
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <>
      {/* Search */}
      <div className="relative mt-8 max-w-md">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50"
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
          className="w-full rounded-full border border-traya-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground shadow-xs placeholder:text-muted-foreground/50 focus:border-traya-red/30 focus:outline-none focus:ring-2 focus:ring-traya-red/10"
        />
      </div>

      {/* Product list */}
      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-traya-border bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="font-medium text-foreground">{p.name}</span>
                <svg
                  className="size-4 shrink-0 text-traya-saffron-lo transition-transform duration-300 ease-expo group-hover:translate-x-1 motion-reduce:transition-none"
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
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">{labels.noResults}</p>
        </div>
      )}
    </>
  );
}
