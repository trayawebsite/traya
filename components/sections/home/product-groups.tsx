import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {SectionHeader} from '@/components/ui/section-header';
import {secondaryBtn} from './styles';
import {Photo} from './photo';
import type {HomePage} from '@/sanity/lib/types';

type ProductsData = HomePage['productsSection'];

// "What We Export" — two honest headline cards (Food & Agro + Chemicals), then a
// selection of real Food & Agro sub-groups. No product-tag chips (nothing implied
// that isn't showcased). Chemicals has no product photo yet, so it's a branded
// card rather than a mislabelled food image.
const FEATURED = [
  {key: 'alliums', img: '/home/group-alliums.png'},
  {key: 'powders', img: '/home/group-powders.png'},
  {key: 'spices', img: '/home/group-spices.png'},
  {key: 'herbs', img: '/home/group-herbs.png'},
  {key: 'nutraceutical', img: '/home/group-nutraceutical.png'},
  {key: 'wellness', img: '/home/group-wellness.png'}
] as const;

const FlaskIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
    <path d="M6.453 15h11.094" />
    <path d="M8.5 2h7" />
  </svg>
);

export async function ProductGroups({data}: {data?: ProductsData}) {
  const t = await getTranslations('Home.groups');

  const eyebrow = data?.eyebrow || t('eyebrow');
  const heading = data?.heading || t('heading');
  const sub = data?.sub || t('sub');

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="max-w-2xl">
          <SectionHeader eyebrow={eyebrow} heading={heading} sub={sub} />
        </div>

        {/* Two headline ranges */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Food & Agro — real product photography */}
          <Link
            href="/products"
            data-stagger
            className="group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-96"
          >
            <div className="absolute inset-0">
              <Photo
                src="/p-6.png"
                alt={t('foodTitle')}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="size-full transition-transform duration-500 ease-expo group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-traya-deep/92 via-traya-deep/45 to-transparent" />
            <CardBody title={t('foodTitle')} body={t('foodBody')} cta={t('foodCta')} />
          </Link>

          {/* Chemicals — no product photo yet: a branded card, not a fake image */}
          <Link
            href="/products"
            data-stagger
            className="group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-2xl bg-traya-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-96"
          >
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-traya-red/15 blur-3xl" />
            <span className="absolute start-7 top-7 grid size-12 place-items-center rounded-xl border border-traya-cream/15 bg-traya-cream/5 text-traya-saffron-hi sm:start-8 sm:top-8">
              {FlaskIcon}
            </span>
            <CardBody title={t('chemTitle')} body={t('chemBody')} cta={t('chemCta')} />
          </Link>
        </div>

        {/* A selection from the Food & Agro range — real sub-group photos */}
        <div className="mt-10">
          <p className="section-label">{t('selection')}</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURED.map((g) => (
              <li key={g.key} data-stagger>
                <Link
                  href="/products"
                  className="group relative block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Photo
                    src={g.img}
                    alt={t(g.key)}
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="aspect-4/3 w-full transition-transform duration-500 ease-expo group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-traya-deep/85 via-traya-deep/15 to-transparent" />
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

        {/* Closing note — the range keeps expanding; invite off-catalogue asks. */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-traya-border bg-traya-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {t('note')} <span className="font-medium text-foreground">{t('noteAsk')}</span>
          </p>
          <a href="#enquiry" className={`${secondaryBtn} shrink-0`}>
            {t('cta')}
          </a>
        </div>
      </Container>
    </section>
  );
}

// Bottom-anchored title/body/CTA cluster shared by both headline cards.
function CardBody({title, body, cta}: {title: string; body: string; cta: string}) {
  return (
    <div className="relative p-6 sm:p-8">
      <h3 className="font-display text-2xl text-traya-cream">{title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-traya-cream/80">{body}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-traya-cream">
        {cta}
        <span aria-hidden className="transition-transform duration-150 ease-expo group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
          &rarr;
        </span>
      </span>
    </div>
  );
}
