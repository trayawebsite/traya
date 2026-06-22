import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {Reveal} from '@/components/ui/reveal';
import {primaryButton} from '@/lib/button-styles';
import {CategoryProductList} from './category-products';
import type {CatalogueCategory} from '@/lib/catalogue';

export async function CategoryView({category}: {category: CatalogueCategory}) {
  const t = await getTranslations('Catalogue');
  const tg = await getTranslations('Home.groups');
  const tl = await getTranslations('Links');
  const count = category.products.length;

  return (
    <>
      <section className="border-b border-traya-border bg-background">
        <Container className="py-section-lg">
          <Breadcrumb
            items={[
              {label: tl('home'), href: '/'},
              {label: tl('products'), href: '/products'},
              {label: category.title}
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="section-label">{tg(category.group)}</p>
            <h1 className="mt-4 text-balance font-display text-display-lg text-foreground">
              {category.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {count} {count === 1 ? t('product') : t('products')}
            </p>
            <p className="mt-6 rounded-xl border border-traya-border bg-traya-surface p-4 text-sm leading-relaxed text-foreground/80">
              {t('category.note')}
            </p>
          </div>
        </Container>
      </section>

      <Reveal>
        <section className="bg-traya-surface">
          <Container className="py-section">
            <h2 className="font-display text-display-sm text-foreground">{t('category.rangeHeading')}</h2>
            <CategoryProductList
              products={category.products.map((p) => ({name: p.name, slug: p.slug}))}
              labels={{
                search: t('category.search'),
                noResults: t('category.noResults')
              }}
            />
            <div className="mt-10">
              <a href={`?product=${encodeURIComponent(category.title)}#enquiry`} className={primaryButton}>
                {t('category.enquireCta')}
              </a>
            </div>
          </Container>
        </section>
      </Reveal>
    </>
  );
}
