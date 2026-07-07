'use client';

import {useState, useMemo, Fragment} from 'react';
import {useTranslations} from 'next-intl';
import {toast} from 'sonner';
import {ChevronDown, Check, Plus} from 'lucide-react';
import {useEnquiry} from '@/lib/enquiry-context';
import type {SanityImage} from '@/sanity/lib/types';

type Product = {
  name: string;
  slug: string;
  shortDescription?: string;
  images?: SanityImage[];
  // Chemicals catalogue fields (undefined for food products)
  series?: string;
  colourIndex?: string;
  packSizes?: string;
};

type Spec = {label: string; value: string};

// Derive the product "form" from its name so the row can show it at a glance
// (Kibbled, Powder, Flakes, …) — the main thing that varies between variants.
const FORM_WORDS = [
  'Kibbled', 'Chopped', 'Minced', 'Granules', 'Powder', 'Flakes', 'Cloves', 'Cubes',
  'Whole Leaves', 'Seeds', 'Split', 'Broken', 'Husk', 'Roll', 'Crushed', 'Crispy', 'Blend', 'Stem', 'Whole'
];
function detectForm(name: string) {
  return FORM_WORDS.find((w) => name.includes(w)) ?? null;
}

// Products expand IN PLACE — clicking a row reveals its details inline instead
// of navigating to a separate page, so a whole category can be browsed and
// compared without leaving the page.
export function CategoryProductList({
  products,
  labels,
  specs,
  categoryTitle
}: {
  products: Product[];
  labels: {search: string; noResults: string};
  specs: Spec[];
  categoryTitle: string;
}) {
  const t = useTranslations('Catalogue.list');
  const {add, has} = useEnquiry();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.shortDescription?.toLowerCase().includes(q)
    );
  }, [products, query]);

  const toggle = (slug: string) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <>
      {/* Search */}
      <div className="relative mt-8 max-w-md">
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

      {/* Expandable product rows */}
      {filtered.length > 0 ? (
        <ul className="mt-6 max-w-3xl space-y-2.5">
          {filtered.map((p) => {
            const isOpen = open.has(p.slug);
            const isChem = !!(p.series || p.colourIndex || p.packSizes);
            const form = detectForm(p.name);
            const added = has(p.slug);
            return (
              <li
                key={p.slug}
                className={`overflow-hidden rounded-xl border bg-card transition-colors ${
                  isOpen ? 'border-traya-red/30' : 'border-traya-border'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(p.slug)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground">{p.name}</span>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {isChem ? (
                        <>
                          {p.series && (
                            <span className="rounded bg-traya-forest/10 px-2 py-0.5 text-[10px] font-semibold text-traya-forest">
                              {p.series}
                            </span>
                          )}
                          {p.colourIndex && (
                            <span className="rounded bg-traya-surface px-2 py-0.5 text-[10px] font-semibold text-traya-slate">
                              {p.colourIndex}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {form && (
                            <span className="rounded bg-traya-forest/10 px-2 py-0.5 text-[10px] font-semibold text-traya-forest">
                              {form}
                            </span>
                          )}
                          <span className="rounded bg-traya-surface px-2 py-0.5 text-[10px] font-semibold text-traya-slate">
                            {t('gradeValue')}
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-traya-border px-4 pb-4 pt-3">
                    {p.shortDescription && (
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{p.shortDescription}</p>
                    )}
                    <dl className="grid grid-cols-[104px_1fr] gap-x-4 gap-y-1.5 text-sm">
                      {isChem ? (
                        <>
                          {p.series && (
                            <Fragment>
                              <dt className="text-muted-foreground">{t('series')}</dt>
                              <dd className="text-foreground">{p.series}</dd>
                            </Fragment>
                          )}
                          {p.colourIndex && (
                            <Fragment>
                              <dt className="text-muted-foreground">{t('colourIndex')}</dt>
                              <dd className="text-foreground">{p.colourIndex}</dd>
                            </Fragment>
                          )}
                          {p.packSizes && (
                            <Fragment>
                              <dt className="text-muted-foreground">{t('packSizes')}</dt>
                              <dd className="text-foreground">{p.packSizes}</dd>
                            </Fragment>
                          )}
                        </>
                      ) : (
                        <>
                          {form && (
                            <Fragment>
                              <dt className="text-muted-foreground">{t('form')}</dt>
                              <dd className="text-foreground">{form}</dd>
                            </Fragment>
                          )}
                          <dt className="text-muted-foreground">{t('grade')}</dt>
                          <dd className="text-foreground">{t('gradeValue')}</dd>
                        </>
                      )}
                      {specs.map((s) => (
                        <Fragment key={s.label}>
                          <dt className="text-muted-foreground">{s.label}</dt>
                          <dd className="text-foreground">{s.value}</dd>
                        </Fragment>
                      ))}
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (!added) {
                            add({slug: p.slug, name: p.name, category: categoryTitle});
                            toast.success(t('addedToast'));
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-medium transition-colors ${
                          added
                            ? 'border border-traya-forest/30 bg-traya-forest/10 text-traya-forest'
                            : 'border border-traya-border bg-background text-foreground hover:border-traya-red/30'
                        }`}
                      >
                        {added ? <Check className="size-3.5" aria-hidden="true" /> : <Plus className="size-3.5" aria-hidden="true" />}
                        {added ? t('added') : t('add')}
                      </button>
                      <a
                        href="#enquiry"
                        className="inline-flex items-center justify-center rounded-md bg-traya-red px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-traya-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {t('quote')}
                      </a>
                      <a
                        href="?intent=sample#enquiry"
                        className="rounded-md border border-traya-border bg-background px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-traya-red/30"
                      >
                        {t('sample')}
                      </a>
                    </div>
                  </div>
                )}
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
