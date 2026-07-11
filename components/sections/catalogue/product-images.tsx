"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

// Product image gallery   main image + thumbnail strip. Gracefully handles
// missing images with a placeholder.
export function ProductImages({
  images,
  name,
}: {
  images: SanityImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const mainImage = images[active];

  return (
    <div className="mb-8">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-traya-surface">
        <Image
          src={urlForImage(mainImage).width(800).height(800).url()}
          alt={`${name} - image ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
          priority={active === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === active
                  ? "border-traya-red"
                  : "border-traya-border hover:border-traya-red/50"
              }`}
            >
              <Image
                src={urlForImage(img).width(64).height(64).url()}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
