"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  location?: string;
};

// Animated testimonial carousel   cycles through quotes with fade transition.
export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);
  // Track the pending fade timeout + the live index so we can clear on unmount
  // and let the auto-advance interval read the current slide without re-binding.
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Mirror the live index into a ref so the auto-advance interval can read it
  // without being torn down/rebound every time the slide changes.
  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Cross-fade to a specific index. Any in-flight fade is cancelled first so a
  // fast click / tick can't leave a stale timeout that fires after unmount.
  const goTo = useCallback((index: number) => {
    setFade(false);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setActive(index);
      setFade(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    // Respect prefers-reduced-motion: no auto-rotation (CLAUDE.md rule 9).
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(
      () => goTo((activeRef.current + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [testimonials.length, goTo]);

  // Clear any pending fade timeout when the component unmounts.
  useEffect(
    () => () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    },
    [],
  );

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <div className="flex flex-col justify-end">
      <p className="section-label text-[10px]">What buyers say</p>
      <div className="mt-5 min-h-[180px]">
        <div
          className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
        >
          <span
            aria-hidden
            className="font-display text-5xl leading-[0.5] text-traya-red/20"
          >
            &ldquo;
          </span>
          <blockquote className="mt-4 font-display text-lg italic leading-snug text-foreground">
            {current.quote}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-traya-saffron-soft text-sm font-medium text-traya-saffron-lo">
              {current.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {current.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {current.role}
                {current.location ? ` · ${current.location}` : ""}
              </p>
            </div>
          </figcaption>
        </div>
      </div>

      {/* Dots */}
      {testimonials.length > 1 && (
        <div className="mt-6 flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`size-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-traya-red"
                  : "bg-traya-border hover:bg-traya-red/50"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
