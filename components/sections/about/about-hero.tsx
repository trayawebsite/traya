import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {Photo} from '@/components/sections/home/photo';
import type {AboutPage} from '@/sanity/lib/types';

// Editorial 2-column hero. Uses Sanity data when available, falls back to i18n.
export async function AboutHero({data}: {data?: AboutPage | null}) {
  const t = await getTranslations('About.hero');

  const heading = data?.heading || t('heading');
  const bodyParas = t('body').split('\n\n'); // Body stays i18n until Sanity has a dedicated field

  return (
    <section className="relative overflow-hidden border-b border-traya-border bg-background">
      <Container className="py-section-sm lg:py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:gap-16">
          {/* Left — editorial text */}
          <div className="order-1 lg:order-1">
            <p className="section-label">{t('eyebrow')}</p>
            <h1 className="mt-4 text-balance font-display text-display-lg text-foreground">
              {heading}{" "}
              <span className="text-traya-red">
                {t('headingAccent')}
              </span>
            </h1>
            <div className="mt-6 max-w-lg space-y-4 text-lg leading-relaxed text-muted-foreground">
              {bodyParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right — photograph, full-bleed to the right edge */}
          <div className="order-2 lg:order-2">
            <Photo
              src="/exim.webp"
              alt="Container ships and cranes at an international shipping port"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-square w-full rounded-2xl lg:rounded-s-2xl lg:rounded-e-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
