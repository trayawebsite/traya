import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {EnquiryListView} from '@/components/sections/enquiry-list';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Enquiry.meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {canonical: '/enquiry'}
  };
}

export default async function EnquiryPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <div id="enquiry">
      <EnquiryListView />
    </div>
  );
}
