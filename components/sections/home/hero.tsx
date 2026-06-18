import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {Photo} from './photo';
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
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Photo
          src="/home/02.png"
          alt="Premium Indian food ingredients prepared for export"
          priority
          sizes="100vw"
          className="size-full"
        />
      </div>
      {/* Left ivory gradient — keeps the left-side headline legible over the image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent"
      />

      <Container className="relative z-20 flex min-h-112 flex-col justify-center py-12 lg:min-h-144 lg:py-16">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h1 className="mt-5 text-balance font-display text-display-lg text-foreground">
            {t('heading')}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{t('sub')}</p>

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
