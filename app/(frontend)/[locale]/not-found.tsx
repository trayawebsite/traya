import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';

// 404 inside the shell (header/footer come from the layout). Copy from i18n
// (messages/<locale>.json → NotFound) — content is data, not hardcoded.
export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
      <p className="font-mono text-sm tracking-widest text-muted-foreground">{t('code')}</p>
      <h1 className="mt-4 font-display text-display-lg text-foreground">{t('title')}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{t('description')}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t('back')}
      </Link>
    </Container>
  );
}
