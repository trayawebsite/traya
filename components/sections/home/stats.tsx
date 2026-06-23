import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {totalCategories} from '@/lib/catalogue';

// Dark proof band: the four headline numbers as the page's first big "chapter"
// after the intro. Deep espresso ground + oversized cream numerals so the
// strongest trust signal actually commands the page (honest counts only).
// Rendered statically (no count-up) so the values are always screenshot-safe.
// Categories + cert count are DERIVED from the data so they can't silently
// desync. A thin vermilion top rule ties it to the brand.
export async function Stats() {
  const t = await getTranslations('Home');
  const STATS = [
    {value: '150+', key: 'products'},
    {value: String(totalCategories), key: 'categories'},
    {value: '100%', key: 'origin'},
    {value: '4', key: 'sectors'}
  ];

  return (
    <section className="relative bg-traya-deep text-traya-cream">
      {/* brand top rule */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-traya-red/60 to-transparent" />
      <Container className="py-12 lg:py-16">
        <dl className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-x-6 sm:divide-x sm:divide-traya-cream/10">
          {STATS.map((s) => (
            <div key={s.key} data-stagger className="px-2 text-center sm:px-4">
              <dt className="font-display text-5xl leading-none text-traya-saffron lg:text-6xl">
                {s.value}
              </dt>
              <dd className="mx-auto mt-3 max-w-[14ch] text-xs uppercase tracking-[0.16em] text-traya-cream/65">
                {t(`stats.${s.key}`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
