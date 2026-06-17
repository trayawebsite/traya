'use client';

import {useEffect, useRef, useState} from 'react';

const DURATION = 1000;

// Counts a numeric stat up once when it scrolls into view (ease-out). Keeps the
// prefix/suffix ("150+", "100%"); non-numeric values like "1:1" stay static.
// Reduced-motion shows the final value immediately. SSR renders the final value.
export function StatCounter({value}: {value: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!m) return; // non-numeric → static
    const prefix = m[1];
    const target = parseInt(m[2], 10);
    const suffix = m[3];
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setDisplay(`${prefix}0${suffix}`);
    let raf = 0;
    let started = false;

    const animate = () => {
      let start: number | null = null;
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / DURATION);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            animate();
          }
        }
      },
      {threshold: 0.4}
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
