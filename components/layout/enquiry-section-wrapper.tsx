'use client';

import {usePathname} from 'next/navigation';
import {EnquirySection} from '@/components/sections/enquiry-section';

// Wrapper that conditionally hides EnquirySection on pages with their own forms.
// Product and category pages KEEP the global enquiry section (high-intent buyer pages).
export function EnquirySectionWrapper({founderPhoto}: {founderPhoto: string}) {
  const pathname = usePathname();

  // Only hide on pages that have their own dedicated forms (like product pages with QuoteForm)
  const hideOnPaths = ['/contact', '/about', '/enquiry'];
  const shouldHide = hideOnPaths.some((p) => pathname.endsWith(p)) || pathname.includes('/products');

  if (shouldHide) return null;

  return <EnquirySection founderPhoto={founderPhoto} />;
}
