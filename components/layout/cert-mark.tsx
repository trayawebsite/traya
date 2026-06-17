'use client';

import {useState} from 'react';

// Renders an official certification logo, falling back to the text name if the
// file is missing (so the strip never shows a broken image before the real
// logos are dropped into /public/certifications/). White-chip host handled by
// the footer; logos sit on light, so the fallback text is ink.
// `boost` renders a logo larger — for marks whose source art carries heavy
// internal whitespace (e.g. MSME), so its visible content matches the others.
export function CertMark({name, src, boost}: {name: string; src?: string; boost?: boolean}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- official logo asset, dynamic /public path + onError fallback
      <img
        src={src}
        alt={name}
        title={name}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${boost ? 'h-11' : 'h-9'} w-auto max-w-25 object-contain`}
      />
    );
  }
  return <span className="font-mono text-xs font-medium text-traya-ink">{name}</span>;
}
