import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {getAboutPage} from '@/sanity/lib/fetch';
import {AboutHero} from '@/components/sections/about/about-hero';
import {FounderLetter} from '@/components/sections/about/founder-letter';
import {WhyAbout} from '@/components/sections/about/why-about';
import {VisionMission} from '@/components/sections/about/vision-mission';
import {ContactForm} from '@/components/sections/contact/contact-form';
import {Container} from '@/components/ui/container';
import {Reveal} from '@/components/ui/reveal';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us | Indian Food Export Company | Founder-Led EXIM Partner',
    description: 'Learn about Traya International Exim LLP, a founder-led Indian export company helping global buyers source dehydrated products, spices, powders & herbs. FSSAI & APEDA certified.',
    alternates: {canonical: '/about'},
    keywords: ['Indian export company', 'food ingredient exporter', 'Traya International Exim', 'FSSAI certified exporter']
  };
}

// About page — content from Sanity aboutPage singleton with i18n fallback.
export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const about = await getAboutPage();

  return (
    <>
      <AboutHero data={about} />
      <Reveal>
        <FounderLetter data={about?.founder} />
      </Reveal>
      <Reveal>
        <WhyAbout data={about?.whyTraya} />
      </Reveal>
      <Reveal>
        <VisionMission data={about} />
      </Reveal>
      <Reveal>
        <section id="enquiry" className="border-b border-traya-border bg-traya-surface">
          <Container className="py-section">
            <div className="mx-auto max-w-2xl">
              <ContactForm />
            </div>
          </Container>
        </section>
      </Reveal>
    </>
  );
}
