import {Fragment} from 'react';

// Traya's signature device — a recurring DM-Mono "spec stamp": uppercase data
// separated by small dots (threading a secondary brand colour through the page).
// Static, no motion. Pass items already split. `dark` retones it for deep bands
// (cream text + clay dots, which both hold contrast on the deep tone).
export function SpecLine({
  items,
  className = '',
  dark = false
}: {
  items: string[];
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] ${
        dark ? 'text-traya-cream/70' : 'text-traya-forest'
      } ${className}`}
    >
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && (
            <span
              aria-hidden
              className={`size-1 rounded-full ${dark ? 'bg-traya-saffron-hi' : 'bg-traya-forest/70'}`}
            />
          )}
          <span>{item}</span>
        </Fragment>
      ))}
    </p>
  );
}
