import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {Badge} from '@/components/ui/badge';
import {secondaryBtn} from './styles';
import {Photo} from './photo';
import {SpecLine} from './spec-line';
import type {HomePage} from '@/sanity/lib/types';

type ProductsData = HomePage['productsSection'];

// The 6 groups as photo tiles (name overlaid on a real product shot) — the
// browsable catalogue is Traya's edge, so it gets the most visual weight.
const GROUPS = ['alliums', 'powders', 'spices', 'herbs', 'nutraceutical', 'wellness'] as const;
const GROUP_IMAGES: Record<(typeof GROUPS)[number], string> = {
  alliums: '/p-1.jpg',
  powders: '/p-2.jpg',
  spices: '/p-3.png',
  herbs: '/p-4.png',
  nutraceutical: '/p-5.png',
  wellness: '/p-6.png'
};

// The premium retail line gets a saffron highlight tag (demo of the Badge).
const FEATURED: (typeof GROUPS)[number] = 'wellness';

export async function ProductGroups({data}: {data?: ProductsData}) {
  const t = await getTranslations('Home.groups');

  const eyebrow = data?.eyebrow || t('eyebrow');
  const heading = data?.heading || t('heading');
  const sub = data?.sub || t('sub');
  const specLine = data?.specLine || t('spec');
  const cta = t('cta');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-label">{eyebrow}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {heading}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{sub}</p>
            <SpecLine items={specLine.split(' · ')} className="mt-5" />
          </div>
          <Link href="/products" className={`${secondaryBtn} hidden sm:inline-flex`}>
            {cta}
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <li key={g} data-stagger className="group relative overflow-hidden rounded-2xl bg-traya-surface p-2">
              <Link
                href="/products"
                className="relative block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-traya-surface"
              >
                <Photo
                  src={GROUP_IMAGES[g]}
                  alt={t(g)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-square w-full transition-transform duration-500 ease-expo group-hover:scale-[1.02] motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-traya-deep/85 via-traya-deep/20 to-transparent"
                />
                {g === FEATURED && (
                  <span className="absolute start-4 top-4 z-10">
                    <Badge>{t('badgePremium')}</Badge>
                  </span>
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-display text-xl text-traya-cream">{t(g)}</span>
                  <span
                    aria-hidden
                    className="mt-2 block h-0.5 w-10 origin-left rtl:origin-right scale-x-0 bg-traya-saffron transition-transform duration-300 ease-expo group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <span className="mt-2 block text-sm leading-snug text-traya-cream/75 line-clamp-2">
                    {t(`${g}Blurb`)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 sm:hidden">
          <Link href="/products" className={secondaryBtn}>
            {t('cta')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
