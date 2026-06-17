'use client';

import {useTranslations} from 'next-intl';

// Small client island — smooth-scrolls to the top. Respects reduced-motion.
export function ScrollToTop() {
  const t = useTranslations('Footer');
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'});
      }}
      aria-label={t('toTop')}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-traya-cream/25 text-traya-cream/80 transition-[color,border-color,transform] duration-150 ease-out hover:border-traya-red hover:text-traya-red-hi active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red-hi motion-reduce:transition-none"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-150 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
