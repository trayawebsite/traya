import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SpecLine} from '@/components/sections/home/spec-line';
import {ProductsInteractive} from './products-interactive';
import {getGroups} from '@/lib/catalogue';

export async function ProductsHub() {
  const t = await getTranslations('Catalogue');
  const tg = await getTranslations('Home.groups');
  const groups = getGroups();

  const serialized = groups.map((g) => ({
    key: g.key,
    label: tg(g.key),
    blurb: tg(`${g.key}Blurb`),
    categories: g.categories.map((c) => ({
      title: c.title,
      slug: c.slug,
      group: c.group,
      description: c.description,
      products: c.products.map((p) => ({name: p.name, slug: p.slug}))
    }))
  }));

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

        <ProductsInteractive
          groups={serialized}
          labels={{
            all: t('hub.all'),
            product: t('product'),
            products: t('products')
          }}
        />
      </Container>
    </section>
  );
}
