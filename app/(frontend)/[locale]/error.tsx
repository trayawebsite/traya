'use client';

import {useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {Container} from '@/components/ui/container';
import {primaryButton} from '@/lib/button-styles';

export default function Error({
  error,
  reset
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-section text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-traya-red-deep">
        {t('eyebrow')}
      </p>
      <h1 className="mt-5 font-display text-display-lg text-foreground">
        {t('heading')}
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        {t('body')}
      </p>
      <button onClick={reset} className={`${primaryButton} mt-9`}>
        {t('retry')}
      </button>
    </Container>
  );
}
