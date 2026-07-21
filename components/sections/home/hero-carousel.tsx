import Image from "next/image";

// Wide 16:9 hero photographs (subject on the right, negative space on the left
// for the headline). Loop timing derives from the count so the crossfade stays
// seamless when images are added/removed.
const SLIDE_SECONDS = 4;
const IMAGES = [1, 2, 3, 4].map((n) => `/home/hero-${n}.webp`);
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
          className="hero-slide absolute inset-0 size-full object-cover object-center lg:object-contain lg:object-right"
          style={{
            animationDelay: `${-i * SLIDE_SECONDS}s`,
            animationDuration: `${LOOP_SECONDS}s`,
          }}
        />
      ))}
    </div>
  );
}
