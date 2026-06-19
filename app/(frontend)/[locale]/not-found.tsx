import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {primaryButton} from '@/lib/button-styles';

// 404 inside the shell (header/footer from the layout). Branded, with a few
// helpful routes out. Copy from i18n — content is data, not hardcoded.
const QUICK_LINKS = ['products', 'capabilities', 'certifications', 'contact'] as const;

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  const tl = await getTranslations('Links');

  return (
    <Container className="flex min-h-[72vh] flex-col items-center justify-center py-section text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-traya-saffron-lo">
        {t('code')}
      </p>
      <h1 className="mt-5 text-balance font-display text-display-xl text-foreground">{t('title')}</h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">{t('description')}</p>

      <Link href="/" className={`${primaryButton} mt-9`}>
        {t('back')}
      </Link>

      <div className="mt-14 w-full max-w-md border-t border-traya-border pt-8">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t('popular')}</p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {QUICK_LINKS.map((key) => (
            <li key={key}>
              <Link
                href={`/${key}`}
                className="rounded-sm text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-traya-red-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {tl(key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
