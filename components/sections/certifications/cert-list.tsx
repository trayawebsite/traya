import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {getSiteSettings} from '@/lib/site-settings';
import {CertMark} from '@/components/layout/cert-mark';

// The certifications themselves — each card: the official logo (white chip) +
// name + issuing authority, then WHAT IT MEANS for the buyer in a forest-tinted
// panel (the playbook's "not just logos" rule; forest = quality/sourcing).
// Honesty-gated; a disclaimer notes scopes are available on request.
export async function CertList() {
  const t = await getTranslations('Certifications.certs');
  const td = await getTranslations('Certifications');
  const s = await getSiteSettings();
  if (s.certifications.length === 0) return null;

  return (
    <section className="border-b border-traya-border bg-traya-surface">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t('sub')}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.certifications.map((c, i) => {
            // Prefer translated i18n copy for the known certs (so ar/fr stay
            // localized); fall back to the CMS-provided values for any
            // client-added cert whose key isn't in the `marks` map.
            const issuedBy = td.has(`marks.${c.key}.issuedBy`)
              ? td(`marks.${c.key}.issuedBy`)
              : c.issuedBy;
            const meaning = td.has(`marks.${c.key}.meaning`)
              ? td(`marks.${c.key}.meaning`)
              : c.meaning;
            return (
              <li
                key={`${c.name}-${i}`}
                data-stagger
                className="flex flex-col rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-16 w-20 shrink-0 items-center justify-center rounded-xl border border-traya-border bg-white px-3">
                    <CertMark name={c.name} src={c.file} boost={c.boost} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg leading-tight text-foreground">{c.name}</h3>
                    {issuedBy && (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{issuedBy}</p>
                    )}
                  </div>
                </div>

                {meaning && (
                  <div className="mt-5 flex-1 rounded-xl bg-traya-forest/5 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-traya-forest">
                      {t('meaningLabel')}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{meaning}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">{td('disclaimer')}</p>
      </Container>
    </section>
  );
}
