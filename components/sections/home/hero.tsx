import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {Photo} from './photo';
import {SpecLine} from './spec-line';
import {primaryBtnDark, secondaryBtnDark} from './styles';

// Full-bleed hero on a DARK, moody ingredient photograph (visual weight right).
// A left-heavy deep scrim keeps the headline crisp, so the type is CREAM — the
// page opens on a high-contrast "chapter" rather than the old beige wash.
// Kept lean: eyebrow → headline → one-line sub → CTAs → one spec line.
// (Certs get their own section below, so no cert row repeated here.)
//
// Image: drop a DARK-background shot at /public/home/hero.png (deep #1a1008-ish
// backdrop, one clear subject, no text in-frame). A graceful dark placeholder
// shows until it loads.
export async function Hero() {
  const t = await getTranslations('Home.hero');

  return (
    <section className="relative isolate overflow-hidden bg-traya-deep text-traya-cream">
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Photo
          src="/home/hero.png"
          alt="Premium Indian food ingredients prepared for export"
          priority
          dark
          sizes="100vw"
          className="size-full"
        />
      </div>
      {/* Deep scrim — heavier on the left so the headline stays legible, fading
          right to let the photo breathe. A second bottom-up wash anchors the
          spec line. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-traya-deep via-traya-deep/85 via-60% to-traya-deep/15"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-traya-deep/70 to-transparent"
      />

      <Container className="relative z-20 flex min-h-112 flex-col justify-center py-14 lg:min-h-160 lg:py-20">
        <div className="max-w-3xl">
          <p className="section-label on-dark">{t('eyebrow')}</p>
          <h1 className="mt-5 text-balance font-display text-display-lg text-traya-cream">
            {t('heading')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-traya-cream/75">{t('sub')}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#enquiry" className={primaryBtnDark}>
              {t('ctaPrimary')}
            </a>
            <Link href="/products" className={secondaryBtnDark}>
              {t('ctaSecondary')}
            </Link>
          </div>

          <div className="mt-10 border-t border-traya-cream/15 pt-6">
            <SpecLine items={t('stat').split(' · ')} dark />
          </div>
        </div>
      </Container>
    </section>
  );
}
