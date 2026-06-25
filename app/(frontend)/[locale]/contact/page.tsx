import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {ContactInfo} from '@/components/sections/contact/contact-info';
import {ContactForm} from '@/components/sections/contact/contact-form';
import {Container} from '@/components/ui/container';
import {Reveal} from '@/components/ui/reveal';

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

// Contact — direct contact methods up top, then a structured contact form
// wired to /api/contact (validation → email → Sheets → rate limit).
export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <Reveal>
      <ContactInfo />
      <section className="border-b border-traya-border bg-traya-surface">
        <Container className="py-section">
          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </Container>
      </section>
    </Reveal>
  );
}
