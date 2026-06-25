'use client';

import {useState, useMemo} from 'react';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {urlForImage} from '@/sanity/lib/image';
import type {SanityImage} from '@/sanity/lib/types';

type Product = {
  name: string;
  slug: string;
  shortDescription?: string;
  images?: SanityImage[];
};

export function CategoryProductList({
  products,
  labels
}: {
  products: Product[];
  labels: {search: string; noResults: string; view: string};
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q)
    );
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

      {/* Product grid */}
      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const imageUrl = p.images && p.images.length > 0
              ? urlForImage(p.images[0]).width(400).height(300).url()
              : null;

            return (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-traya-border bg-card shadow-sm transition-all duration-300 hover:border-traya-saffron/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {/* Product image */}
                  {imageUrl ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-traya-surface">
                      <Image
                        src={imageUrl}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-expo group-hover:scale-105 motion-reduce:transition-none"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-traya-surface">
                      <svg
                        className="size-12 text-muted-foreground/20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>
                  )}

                  {/* Product info */}
                  <span className="flex flex-1 flex-col gap-1 px-5 py-4">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-base leading-snug text-foreground">
                        {p.name}
                      </span>
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
                    </span>
                    {p.shortDescription && (
                      <span className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {p.shortDescription}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">{labels.noResults}</p>
        </div>
      )}
    </>
  );
}
