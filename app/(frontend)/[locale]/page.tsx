import {setRequestLocale} from 'next-intl/server';
import {useTranslations} from 'next-intl';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('Home');

  return (
    <main className="bg-background flex flex-1 flex-col items-center justify-center px-6 py-section-xl text-center">
      <p className="section-label mb-5">Building Partnerships Across Continents</p>
      <h1 className="text-foreground max-w-3xl text-display-lg font-display">
        {t('title')}
      </h1>
      <p className="text-muted-foreground mt-5 max-w-md text-lg">
        {t('subtitle')}
      </p>
      <p className="text-traya-slate mt-10 font-mono text-xs tracking-wide">
        150+ PRODUCTS · 18 CATEGORIES · INDIA
      </p>
    </main>
  );
}
