import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {secondaryBtn} from './styles';
import type {HomePage, FeatureItem} from '@/sanity/lib/types';

type WhyData = HomePage['why'];

// 4 differentiators. Uses Sanity items when available, falls back to i18n.
const ICON = 'size-6';
const WHY_ICONS: React.ReactNode[] = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a7 7 0 0 1 14 0v1" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M9 13h6M9 17h6" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></svg>
];
const WHY_KEYS = ['catalogue', 'founder', 'docs', 'logistics'] as const;

export async function WhyTraya({data}: {data?: WhyData}) {
  const t = await getTranslations('Home.why');

  const eyebrow = data?.eyebrow || t('eyebrow');
  const heading = data?.heading || t('heading');
  const cta = t('cta');

  // Use Sanity items if provided, otherwise fall back to i18n
  const items = data?.items && data.items.length > 0
    ? data.items.map((item: FeatureItem, i: number) => ({
        title: item.title,
        description: item.description || '',
        icon: WHY_ICONS[i] || WHY_ICONS[0]
      }))
    : WHY_KEYS.map((key, i) => ({
        title: t(key),
        description: t(`${key}Body`),
        icon: WHY_ICONS[i]
      }));

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={i}
              data-stagger
              className="rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <span className="grid size-11 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo">
                {item.icon}
              </span>
              <h3 className="mt-4 font-display text-lg text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/capabilities" className={secondaryBtn}>
            {cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
