'use client';

import {useEffect, useRef} from 'react';

// The site's single entrance signature (per the design system): a restrained
// fade + 24px rise, ~650ms out-expo, played once when the element scrolls into
// view. Pass `delay` (ms) to stagger siblings (e.g. cards: delay={i * 70}).
//
// The animation itself lives in globals.css (`[data-reveal]` → `[data-shown]`);
// here we only toggle the attribute on the DOM node when it intersects — no
// React state, so no extra render. Safe by construction: prefers-reduced-motion
// is handled in CSS (content shown, no motion), the markup is always in the DOM
// for crawlers / screen readers, and a <noscript> override covers no-JS.
export function Reveal({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.setAttribute('data-shown', '');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
            break;
          }
        }
      },
      {threshold: 0.12, rootMargin: '0px 0px -8% 0px'}
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={delay ? {transitionDelay: `${delay}ms`} : undefined}
    >
      {children}
    </div>
  );
}
