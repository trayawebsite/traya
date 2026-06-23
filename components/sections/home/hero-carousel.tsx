const IMAGES = Array.from({length: 10}, (_, i) => `/home/t${i + 1}.png`);

export function HeroCarousel({className = ''}: {className?: string}) {
  return (
    <div className={`absolute inset-0 size-full overflow-hidden ${className}`} aria-hidden="true">
      {IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading={i < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="hero-slide absolute inset-0 size-full object-contain object-right"
          style={{animationDelay: `${-i * 3.5}s`}}
        />
      ))}
    </div>
  );
}
