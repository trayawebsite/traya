import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {SpecLine} from '@/components/sections/home/spec-line';
import {ProductsInteractive} from './products-interactive';
import {getGroups} from '@/lib/catalogue';
import {getSiteSettings} from '@/lib/site-settings';
import {Download} from 'lucide-react';

export async function ProductsHub() {
  const t = await getTranslations('Catalogue');
  const tg = await getTranslations('Home.groups');
  const groups = await getGroups();
  const s = await getSiteSettings();

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
          {s.catalogueUrl && (
            <a
              href={s.catalogueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-traya-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-traya-saffron/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Download className="size-4 text-traya-saffron-lo" aria-hidden="true" />
              {t('hub.downloadCatalogue')}
            </a>
          )}
        </div>

        <ProductsInteractive
          groups={serialized}
          labels={{
            all: t('hub.all'),
            product: t('product'),
            products: t('products'),
            search: t('hub.search'),
            noResults: t('hub.noResults')
          }}
        />
      </Container>
    </section>
  );
}
