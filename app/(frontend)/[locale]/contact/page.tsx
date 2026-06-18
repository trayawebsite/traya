import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {ContactInfo} from '@/components/sections/contact/contact-info';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Contact.meta'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {canonical: '/contact'}
  };
}

// Contact — direct contact methods up top; the global pre-footer Enquiry form
// (from the layout) is the structured "send us your requirement" conversion,
// so this page provides the details and lets that form do the rest.
export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <ContactInfo />;
}
