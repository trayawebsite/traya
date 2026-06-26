'use client';

import {useState, useEffect, useCallback} from 'react';

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  location?: string;
};

// Animated testimonial carousel — cycles through quotes with fade transition.
export function TestimonialCarousel({testimonials}: {testimonials: Testimonial[]}) {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  const next = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 300);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length, next]);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <div className="flex flex-col justify-end">
      <p className="section-label text-[10px]">What buyers say</p>
      <div className="mt-5 min-h-[180px]">
        <div
          className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
        >
          <span aria-hidden className="font-display text-5xl leading-[0.5] text-traya-red/20">
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
              <p className="text-sm font-medium text-foreground">{current.name}</p>
              <p className="text-xs text-muted-foreground">
                {current.role}
                {current.location ? ` · ${current.location}` : ''}
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
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setActive(i);
                  setFade(true);
                }, 300);
              }}
              className={`size-2 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-6 bg-traya-red'
                  : 'bg-traya-border hover:bg-traya-red/50'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
