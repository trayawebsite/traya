import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {secondaryBtn} from './styles';

// 4 differentiators distilled from the brief + old-site "why us", reframed for
// the broad catalogue. Front-loads the catalogue + founder edges competitors lack.
const ICON = 'size-6';
const WHY: {key: string; icon: React.ReactNode}[] = [
  {
    key: 'catalogue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  },
  {
    key: 'founder',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
      </svg>
    )
  },
  {
    key: 'docs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M9 13h6M9 17h6" />
      </svg>
    )
  },
  {
    key: 'logistics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
      </svg>
    )
  }
];

export async function WhyTraya() {
  const t = await getTranslations('Home.why');

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {WHY.map((w) => (
            <div
              key={w.key}
              className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <span className="grid size-11 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                {w.icon}
              </span>
              <h3 className="mt-4 font-display text-lg text-foreground">{t(w.key)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t(`${w.key}Body`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/capabilities" className={secondaryBtn}>
            {t('cta')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
