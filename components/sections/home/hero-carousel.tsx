import Image from "next/image";

// Only the hero photos that survived the catalogue cleanup (non-contiguous, so
// list the actual file numbers). Loop timing derives from the count so the
// crossfade stays seamless when images are added/removed   keep ≥6.
const SLIDE_SECONDS = 3.5;
const IMAGES = [1, 2, 3, 4, 7, 8].map((n) => `/home/t${n}.webp`);
const LOOP_SECONDS = IMAGES.length * SLIDE_SECONDS;

export function HeroCarousel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          // First slide is the LCP element: `priority` emits the preload link +
          // fetchpriority="high". Others stay lazy (next/image default).
          priority={i === 0}
          quality={82}
          sizes="100vw"
          className="hero-slide absolute inset-0 size-full object-cover object-center lg:object-right"
          style={{
            animationDelay: `${-i * SLIDE_SECONDS}s`,
            animationDuration: `${LOOP_SECONDS}s`,
          }}
        />
      ))}
    </div>
  );
}
