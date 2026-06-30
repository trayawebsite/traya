'use client';

import {usePathname} from 'next/navigation';
import {EnquirySection} from '@/components/sections/enquiry-section';

// Wrapper that conditionally hides EnquirySection on pages with their own forms.
// Product and category pages KEEP the global enquiry section (high-intent buyer pages).
export function EnquirySectionWrapper({founderPhoto}: {founderPhoto: string}) {
  const pathname = usePathname();

  // Hide only on pages that ship their OWN #enquiry form: the listed pages, and
  // product DETAIL + category pages (which embed QuoteForm). NOTE the trailing
  // slash — `/products/` matches detail pages only, NOT the `/products` hub, so
  // the hub keeps the global enquiry section and its #enquiry anchor stays live.
  const hideOnPaths = ['/contact', '/about', '/enquiry'];
  const shouldHide =
    hideOnPaths.some((p) => pathname.endsWith(p)) ||
    pathname.includes('/products/') ||
    pathname.includes('/categories/');

  if (shouldHide) return null;

  return <EnquirySection founderPhoto={founderPhoto} />;
}
