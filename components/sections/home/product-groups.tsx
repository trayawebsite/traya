import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {Badge} from '@/components/ui/badge';
import {secondaryBtn} from './styles';
import {Photo} from './photo';
import {SpecLine} from './spec-line';

// The 6 groups as photo tiles (name overlaid on a real product shot) — the
// browsable catalogue is Traya's edge, so it gets the most visual weight.
const GROUPS = ['alliums', 'powders', 'spices', 'herbs', 'nutraceutical', 'wellness'] as const;

// The premium retail line gets a saffron highlight tag (demo of the Badge).
const FEATURED: (typeof GROUPS)[number] = 'wellness';

export async function ProductGroups() {
  const t = await getTranslations('Home.groups');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-label">{t('eyebrow')}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {t('heading')}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t('sub')}</p>
            <SpecLine items={t('spec').split(' · ')} className="mt-5" />
          </div>
          <Link href="/products" className={`${secondaryBtn} hidden sm:inline-flex`}>
            {t('cta')}
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <li key={g} data-stagger className="group relative overflow-hidden rounded-2xl">
              <Link
                href="/products"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-traya-surface"
              >
                <Photo
                  src={`/home/group-${g}.png`}
                  alt={t(g)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-4/5 w-full transition-transform duration-500 ease-expo group-hover:scale-105 motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-traya-deep/85 via-traya-deep/20 to-transparent"
                />
                {g === FEATURED && (
                  <span className="absolute left-4 top-4">
                    <Badge>{t('badgePremium')}</Badge>
                  </span>
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-display text-xl text-traya-cream">{t(g)}</span>
                  <span
                    aria-hidden
                    className="mt-2 block h-0.5 w-10 origin-left scale-x-0 bg-traya-saffron transition-transform duration-300 ease-expo group-hover:scale-x-100 motion-reduce:transition-none"
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
