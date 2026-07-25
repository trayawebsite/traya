"use client";

import { usePathname } from "next/navigation";
import { InquirySection } from "@/components/sections/inquiry-section";

// Wrapper that conditionally hides InquirySection on pages with their own forms.
// Product and category pages KEEP the global inquiry section (high-intent buyer pages).
export function InquirySectionWrapper() {
  const pathname = usePathname();

  // Hide only on pages that ship their OWN #inquiry form: the listed pages, and
  // product DETAIL + category pages (which embed QuoteForm). NOTE the trailing
  // slash   `/products/` matches detail pages only, NOT the `/products` hub, so
  // the hub keeps the global inquiry section and its #inquiry anchor stays live.
  const hideOnPaths = ["/contact", "/about", "/inquiry"];
  const shouldHide =
    hideOnPaths.some((p) => pathname.endsWith(p)) ||
    pathname.includes("/products/") ||
    pathname.includes("/categories/");

  if (shouldHide) return null;

  return <InquirySection />;
}
