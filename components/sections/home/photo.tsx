'use client';

import {useState} from 'react';
import Image from 'next/image';

// Image-with-graceful-placeholder. Until a real photo exists at `src`, a refined
// panel shows (never a broken-image icon); the photo fades in when it loads.
// Drop files into /public/home and they appear with no code change.
// `dark` swaps the placeholder to deep tones so it never flashes light on a
// dark band (hero, dark stats band, etc.).
export function Photo({
  src,
  alt,
  className = '',
  sizes,
  priority,
  dark = false,
  imgClassName = ''
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  dark?: boolean;
  imgClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${dark ? 'bg-traya-deep' : 'bg-traya-surface'} ${className}`}>
      {(!loaded || failed) && (
        <div
          aria-hidden
          className={`absolute inset-0 grid place-items-center ${
            dark
              ? 'bg-linear-to-br from-traya-deep-mid via-traya-deep to-traya-deep'
              : 'bg-linear-to-br from-traya-surface via-traya-surface to-traya-red-soft/45'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`size-10 ${dark ? 'text-traya-clay/30' : 'text-traya-clay/45'}`}
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path d="m21 16-4.5-4.5L7 21" />
          </svg>
        </div>
      )}
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-cover ${imgClassName} transition-[opacity,filter] duration-500 ease-expo ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        />
      )}
    </div>
  );
}
