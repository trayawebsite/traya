import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

export default async function Loading() {
  const t = await getTranslations('Common');
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
      <div className="size-10 animate-spin rounded-full border-[3px] border-traya-border border-t-traya-red" />
      <p className="mt-6 text-sm uppercase tracking-[0.16em] text-muted-foreground">
        {t('loading')}
      </p>
    </Container>
  );
}
