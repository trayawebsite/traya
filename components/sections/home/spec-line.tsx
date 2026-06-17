import {Fragment} from 'react';

// Traya's signature device — a recurring DM-Mono "spec stamp": uppercase data
// separated by small FOREST dots (threading the secondary brand colour back
// through the page). Static, no motion. Pass items already split.
export function SpecLine({items, className = ''}: {items: string[]; className?: string}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-traya-slate ${className}`}
    >
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && <span aria-hidden className="size-1 rounded-full bg-traya-forest/70" />}
          <span>{item}</span>
        </Fragment>
      ))}
    </p>
  );
}
