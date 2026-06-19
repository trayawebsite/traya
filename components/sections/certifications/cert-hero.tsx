import {getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/ui/page-hero';
import {getSiteSettings} from '@/lib/site-settings';
import {CertMark} from '@/components/layout/cert-mark';

// Certifications header — centered "trust is documented, not claimed" thesis,
// with the official marks as a centered "recognised by" row beneath it, so the
// hero reads as proof under the statement. Shared PageHero recipe.
export async function CertHero() {
  const t = await getTranslations('Certifications.hero');
  const s = await getSiteSettings();

  return (
    <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('body')}>
      {s.certifications.length > 0 && (
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-traya-forest">
            {t('recognisedBy')}
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {s.certifications.map((c) => (
              <li
                key={c.name}
                className="flex h-20 w-24 items-center justify-center rounded-xl border border-traya-border bg-white px-2"
              >
                <CertMark name={c.name} src={c.file} boost={c.boost} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageHero>
  );
}
