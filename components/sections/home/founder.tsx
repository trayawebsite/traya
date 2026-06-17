import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {getSiteSettings} from '@/lib/site-settings';
import {secondaryBtn} from './styles';
import {Photo} from './photo';

// Founder story — Traya's edge over faceless competitors. Real portrait + forest
// accent (the playbook's founder-section signature). Photo from the settings
// seam; graceful placeholder if it ever fails to load.
export async function Founder() {
  const t = await getTranslations('Home.founderSection');
  const tf = await getTranslations('Enquiry');
  const s = await getSiteSettings();

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <Photo
            src={s.founderPhoto}
            alt={tf('founderName')}
            sizes="(min-width: 1024px) 24rem, 100vw"
            className="order-2 mx-auto aspect-4/5 w-full max-w-sm rounded-2xl lg:order-1"
          />

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-traya-forest">
              {t('eyebrow')}
            </p>
            <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
              {t('heading')}
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{t('body')}</p>
            <p className="mt-6 text-sm">
              <span className="font-medium text-foreground">{tf('founderName')}</span>
              <span className="text-muted-foreground"> · {tf('founderRole')}</span>
            </p>
            <div className="mt-8">
              <Link href="/about" className={secondaryBtn}>
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
