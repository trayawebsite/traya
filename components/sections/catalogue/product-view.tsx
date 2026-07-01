import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {primaryButton} from '@/lib/button-styles';
import {secondaryBtn} from '@/components/sections/home/styles';
import {getRelatedProducts, type CatalogueCategory, type CatalogueProduct} from '@/lib/catalogue';
import {getSiteSettings} from '@/lib/site-settings';
import {AddToEnquiryButton} from '@/components/enquiry/add-to-enquiry';
import {QuoteForm} from '@/components/sections/quote-form';
import {ProductImages} from './product-images';
import {ProductSchema, BreadcrumbSchema} from '@/components/seo/product-schema';
import {Download, ArrowRight} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.trayaexim.com';

// Product detail — renders rich Sanity data when available (images, description,
// specs, forms), with i18n fallback for fields not in CMS.
export async function ProductView({
  product,
  category
}: {
  product: CatalogueProduct;
  category: CatalogueCategory;
}) {
  const t = await getTranslations('Catalogue');
  const tl = await getTranslations('Links');
  const related = await getRelatedProducts(category, product.slug, 6);
  const s = await getSiteSettings();

  const hasImages = product.images && product.images.length > 0;
  const hasSpecs = product.specifications && product.specifications.length > 0;
  const hasForms = product.forms && product.forms.length > 0;
  const hasRichData = hasImages || hasSpecs || hasForms || product.shortDescription;

  return (
    <section className="bg-background">
      <ProductSchema product={product} category={category} />
      <BreadcrumbSchema
        items={[
          {name: tl('home'), url: siteUrl},
          {name: tl('products'), url: `${siteUrl}/products`},
          {name: category.title, url: `${siteUrl}/categories/${category.slug}`},
          {name: product.name, url: `${siteUrl}/products/${product.slug}`}
        ]}
      />
      <Container className="py-section-lg">
        <Breadcrumb
          items={[
            {label: tl('home'), href: '/'},
            {label: tl('products'), href: '/products'},
            {label: category.title, href: `/categories/${category.slug}`},
            {label: product.name}
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            {/* Product images */}
            {hasImages && (
              <ProductImages images={product.images!} name={product.name} />
            )}

            <p className="section-label">{t('detail.eyebrow')}</p>
            <h1 className="mt-4 text-balance font-display text-display-lg text-foreground">
              {product.name}
            </h1>

            {/* Short description */}
            {product.shortDescription && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {product.shortDescription}
              </p>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-traya-border pt-6 sm:max-w-md">
              <Fact label={t('detail.categoryLabel')}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-traya-red-deep underline-offset-4 hover:underline"
                >
                  {category.title}
                </Link>
              </Fact>
              <Fact label={t('detail.originLabel')}>
                {product.origin || t('detail.origin')}
              </Fact>
              <Fact label={t('detail.pricingLabel')}>{t('detail.pricing')}</Fact>
              {product.hsCode && (
                <Fact label={t('detail.hsCode')}>{product.hsCode}</Fact>
              )}
            </dl>

            {/* Specifications */}
            {hasSpecs && (
              <div className="mt-8 rounded-2xl border border-traya-border bg-traya-surface p-6">
                <h2 className="font-display text-lg text-foreground">{t('detail.docsHeading')}</h2>
                <dl className="mt-4 space-y-3">
                  {product.specifications!.map((spec, i) => (
                    <div key={i} className="flex justify-between gap-4 border-b border-traya-border pb-3 last:border-0 last:pb-0">
                      <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-6">
              {product.brochureUrl ? (
                <a
                  href={product.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-traya-border bg-traya-surface px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-traya-saffron/40 hover:bg-traya-saffron-soft"
                >
                  <Download className="size-4 text-traya-saffron-lo" aria-hidden="true" />
                  {t('detail.downloadSpecSheet')}
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-xl border border-traya-border bg-traya-surface/50 px-4 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed"
                >
                  <Download className="size-4 opacity-50" aria-hidden="true" />
                  {t('detail.downloadSpecSheet')}
                </button>
              )}
            </div>

            {/* Forms / Variants */}
            {hasForms && (
              <div className="mt-8 space-y-4">
                <h2 className="font-display text-lg text-foreground">{t('detail.availableForms')}</h2>
                {product.forms!.map((form) => (
                  <div key={form._key} className="rounded-xl border border-traya-border bg-traya-surface p-4">
                    <p className="font-display text-base text-foreground">{form.name}</p>
                    {form.specs && form.specs.length > 0 && (
                      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                        {form.specs.map((spec, i) => (
                          <div key={i} className="flex justify-between gap-2">
                            <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                            <dd className="text-xs font-medium text-foreground">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Fallback: specs note when no rich data */}
            {!hasRichData && (
              <div className="mt-8 rounded-2xl border border-traya-border bg-traya-surface p-6">
                <h2 className="font-display text-lg text-foreground">{t('detail.docsHeading')}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('detail.docsNote')}</p>
              </div>
            )}
          </div>

          <aside className="lg:pt-9">
            <div className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm sm:p-7">
              <p className="font-display text-lg leading-snug text-foreground">{product.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{category.title}</p>
              <div className="mt-6 flex flex-col gap-3">
                <AddToEnquiryButton
                  slug={product.slug}
                  name={product.name}
                  category={category.title}
                  className={primaryButton}
                />
                <a href="?intent=sample#enquiry" className={secondaryBtn}>
                  {t('detail.sampleCta')}
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Quote request form with testimonials */}
        <div id="enquiry" className="mt-16 border-t border-traya-border pt-10 scroll-mt-24">
          <QuoteForm
            productName={product.name}
            productSlug={product.slug}
            testimonials={s.testimonials}
          />
        </div>

        {related.length > 0 && (
          <div className="mt-24 border-t border-traya-border pt-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-traya-red-deep mb-2">{category.title}</p>
                <h2 className="font-display text-display-sm text-foreground">{t('detail.relatedHeading')}</h2>
              </div>
              <Link 
                href={`/categories/${category.slug}`} 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                {t('detail.categoryLabel')} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-traya-border bg-card p-6 transition-all duration-300 hover:border-traya-red/30 hover:bg-traya-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-lg leading-snug text-foreground transition-colors group-hover:text-traya-red-deep">{p.name}</span>
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background border border-traya-border text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:border-traya-red/20 group-hover:bg-traya-red/5 group-hover:text-traya-red-deep">
                        <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

function Fact({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}
