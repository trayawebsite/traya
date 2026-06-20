import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {Photo} from '@/components/sections/home/photo';
import {SpecLine} from '@/components/sections/home/spec-line';

// Editorial 2-column hero — headline + narrative on the left, a large
// ingredient photograph breathing on the right. Asymmetric split (0.55/0.45)
// so the type dominates and the image reads as evidence, not decoration.
// The photograph bleeds to the right edge; no border or frame.
export async function AboutHero() {
  const t = await getTranslations('About.hero');

  return (
    <section className="relative overflow-hidden border-b border-traya-border bg-background">
      <Container className="py-section-sm lg:py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:gap-16">
          {/* Left — editorial text */}
          <div className="order-2 lg:order-1">
            <p className="section-label">{t('eyebrow')}</p>
            <h1 className="mt-4 text-balance font-display text-display-lg text-foreground">
              {t('heading')}
            </h1>
            <p className="mt-3 font-display text-lg italic text-traya-saffron-lo">
              {t('tagline')}
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t('body')}
            </p>
            <SpecLine
              items={['150+ products', '18 categories', 'India origin']}
              className="mt-8"
            />
          </div>

          {/* Right — photograph, full-bleed to the right edge */}
          <div className="order-1 lg:order-2">
            <Photo
              src="/about/global-trade.jpg"
              alt="Container ships and cranes at an international shipping port"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-4/5 w-full rounded-2xl lg:rounded-l-2xl lg:rounded-r-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
