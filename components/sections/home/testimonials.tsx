import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';
import {getSiteSettings} from '@/lib/site-settings';

// Social proof — editorial quote cards (no stock 5-star clichés). Honesty-gated:
// renders only when testimonials exist in settings. Large Lora quote mark, quiet
// attribution. Will read from Sanity `testimonial` docs later.
export async function Testimonials() {
  const t = await getTranslations('Home.testimonials');
  const s = await getSiteSettings();
  if (s.testimonials.length === 0) return null;

  return (
    <section className="border-b border-traya-border bg-background">
      <Container className="py-section">
        <div className="max-w-2xl">
          <p className="section-label">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance font-display text-display-sm text-foreground lg:text-display">
            {t('heading')}
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {s.testimonials.map((q, i) => (
            <li
              key={i}
              data-stagger
              className="flex flex-col rounded-2xl border border-traya-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7"
            >
              <span aria-hidden className="font-display text-5xl leading-[0.5] text-traya-red/25">
                &ldquo;
              </span>
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-foreground/90">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-traya-border pt-4">
                <p className="font-display text-sm font-medium text-foreground">{q.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {q.role}
                  {q.location ? ` · ${q.location}` : ''}
                </p>
              </figcaption>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
