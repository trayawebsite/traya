import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {SpecLine} from '@/components/sections/home/spec-line';
import {Reveal} from '@/components/ui/reveal';
import {getGroups} from '@/lib/catalogue';

// Products hub — catalogue-first (the 6 browse groups → 18 category cards, above
// any hero, per the playbook). Group labels/blurbs reuse Home.groups; categories
// + counts come from the catalogue data layer. Cards link to /categories/[slug].
export async function ProductsHub() {
  const t = await getTranslations('Catalogue');
  const tg = await getTranslations('Home.groups');
  const groups = getGroups();

  return (
    <section className="bg-background">
      <Container className="pt-section-sm pb-section-lg">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label">{t('hub.eyebrow')}</p>
          <h1 className="mt-3 text-balance font-display text-display-lg text-foreground">
            {t('hub.heading')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('hub.sub')}
          </p>
          <SpecLine items={t('hub.spec').split(' · ')} className="mt-5 justify-center" />
        </div>

        <div className="mt-16 space-y-16">
          {groups.map((g) => (
            <Reveal key={g.key}>
              <div>
                <div className="max-w-2xl border-b border-traya-border pb-5">
                  <h2 className="font-display text-display-sm text-foreground">{tg(g.key)}</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{tg(`${g.key}Blurb`)}</p>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {g.categories.map((cat) => (
                    <li key={cat.slug} data-stagger>
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-traya-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span>
                          <span className="block font-display text-lg text-foreground">{cat.title}</span>
                          <span className="mt-0.5 block text-sm text-muted-foreground">
                            {cat.products.length} {cat.products.length === 1 ? t('product') : t('products')}
                          </span>
                        </span>
                        <svg
                          className="size-5 shrink-0 text-traya-saffron-lo transition-transform duration-300 ease-expo group-hover:translate-x-1 motion-reduce:transition-none"
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
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
