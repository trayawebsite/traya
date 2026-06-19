import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {Reveal} from '@/components/ui/reveal';
import {primaryButton} from '@/lib/button-styles';
import type {CatalogueCategory} from '@/lib/catalogue';

// Category landing — breadcrumb · header (group eyebrow, title, count, RFQ note)
// · the full product range as a card grid linking to /products/[slug]. Spec-
// forward: specs/MOQ/pricing are shared on enquiry.
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
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-traya-border bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="font-medium text-foreground">{p.name}</span>
                    <svg
                      className="size-4 shrink-0 text-traya-saffron-lo transition-transform duration-300 ease-expo group-hover:translate-x-1 motion-reduce:transition-none"
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
