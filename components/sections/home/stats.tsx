import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {getTotalCategories} from '@/lib/catalogue';
import type {HomePage, Stat} from '@/sanity/lib/types';

type StatsData = HomePage['stats'];

export async function Stats({data}: {data?: StatsData}) {
  const t = await getTranslations('Home');

  const stats = data && data.length > 0
    ? data.map((s: Stat) => ({value: s.value, label: s.label}))
    : [
        {value: '150+', label: t('stats.products')},
        {value: String(await getTotalCategories()), label: t('stats.categories')},
        {value: '100%', label: t('stats.origin')},
        {value: '4', label: t('stats.sectors')}
      ];

  return (
    <section className="relative bg-traya-deep text-traya-cream">
      {/* brand top rule */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-traya-red/60 to-transparent" />
      <Container className="py-12 lg:py-16">
        <dl className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-x-6 sm:divide-x sm:divide-traya-cream/10">
          {stats.map((s, i) => (
            <div key={i} data-stagger className="px-2 text-center sm:px-4">
              <dt className="font-display text-5xl leading-none text-traya-saffron lg:text-6xl">
                {s.value}
              </dt>
              <dd className="mx-auto mt-3 max-w-[14ch] text-xs uppercase tracking-[0.16em] text-traya-cream/65">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
