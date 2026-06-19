import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

// The documentation/traceability closer — a dark espresso band listing the
// paper trail that travels with every shipment. The concrete proof behind the
// trust claims above.
const DOCS = ['d1', 'd2', 'd3', 'd4', 'd5'] as const;

export async function Traceability() {
  const t = await getTranslations('Certifications.trace');

  return (
    <section className="bg-traya-deep text-traya-cream">
      <Container className="py-section-lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-label on-dark">{t('eyebrow')}</p>
            <h2 className="mt-4 text-balance font-display text-display-sm lg:text-display">
              {t('heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-traya-cream/75">{t('body')}</p>
          </div>

          <ul className="lg:pt-2">
            {DOCS.map((d) => (
              <li
                key={d}
                data-stagger
                className="flex items-center gap-3 border-b border-traya-cream/10 py-3.5 text-traya-cream/85"
              >
                <svg
                  className="size-4 shrink-0 text-traya-saffron"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                {t(d)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
