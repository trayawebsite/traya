import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {HeroCarousel} from './hero-carousel';
import {SpecLine} from './spec-line';
import {primaryBtn, secondaryBtn} from './styles';

// Full-bleed hero on a light ingredient photograph (visual weight on the right).
// A left-to-right ivory gradient keeps the headline crisp over any image, so the
// type is dark ink — not cream. Content sits centre-left; image breathes right.
// Kept deliberately lean: eyebrow → headline → one-line sub → CTAs → one stat.
// (Certs get their own section below, so no cert row repeated here.)
export async function Hero() {
  const t = await getTranslations('Home.hero');

  return (
    <section className="relative isolate overflow-hidden border-b border-traya-border bg-background">
      {/* Background image carousel */}
      <HeroCarousel />
      {/* Left ivory gradient — keeps the left-side headline legible over the image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-background via-background from-50% to-transparent"
      />

      <Container className="relative z-20 flex min-h-112 flex-col justify-center py-12 lg:min-h-[34rem] lg:py-14">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h1 className="mt-5 text-balance font-display text-display-lg text-foreground">
            {t('heading')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t('sub')}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#enquiry" className={primaryBtn}>
              {t('ctaPrimary')}
            </a>
            <Link href="/products" className={secondaryBtn}>
              {t('ctaSecondary')}
            </Link>
          </div>

          <div className="mt-10 border-t border-traya-border pt-6">
            <SpecLine items={t('stat').split(' · ')} />
          </div>
        </div>
      </Container>
    </section>
  );
}
