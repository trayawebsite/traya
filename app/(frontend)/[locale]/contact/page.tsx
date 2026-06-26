import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ContactInfo} from '@/components/sections/contact/contact-info';
import {ContactForm} from '@/components/sections/contact/contact-form';
import {Container} from '@/components/ui/container';
import {Reveal} from '@/components/ui/reveal';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us | Get Quote for Indian Food Ingredients',
    description: 'Contact Traya International Exim for dehydrated onions, garlic, spices, powders & herbs. Request a quote, sample, or catalogue. WhatsApp, email, or enquiry form.',
    alternates: {canonical: '/contact'},
    keywords: ['contact Indian food exporter', 'get quote food ingredients', 'request sample', 'food supplier enquiry']
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
      <section id="enquiry" className="border-b border-traya-border bg-traya-surface">
        <Container className="py-section">
          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </Container>
      </section>
    </Reveal>
  );
}
