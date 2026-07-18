import {getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/page-hero';
import {Reveal} from '@/components/ui/reveal';
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
    <Reveal>
      <PageHero
        eyebrow={t('hub.eyebrow')}
        heading={t('hub.heading')}
        headingAccent={t('hub.headingAccent')}
        sub={t('hub.sub')}
      >
        <div className="mx-auto -mt-6 max-w-4xl text-center">
          <SpecLine items={t('hub.spec').split(' · ')} className="justify-center" />
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

        <div className="mt-8 border-t border-traya-border pb-16 pt-8">
          <ProductsInteractive groups={serialized} />
        </div>
      </PageHero>
    </Reveal>
  );
}
