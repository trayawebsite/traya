import Image from 'next/image';

const IMAGES = Array.from({length: 10}, (_, i) => `/home/t${i + 1}.png`);

export function HeroCarousel({className = ''}: {className?: string}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          preload={i === 0}
          loading={i === 0 ? 'eager' : 'lazy'}
          quality={82}
          sizes="100vw"
          className="hero-slide absolute inset-0 size-full object-cover object-center lg:object-contain lg:object-right"
          style={{animationDelay: `${-i * 3.5}s`}}
        />
      ))}
    </div>
  );
}
