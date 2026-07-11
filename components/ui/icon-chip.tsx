import type { ReactNode } from "react";

// The shared saffron-soft circular icon chip   the "gold coin" behind section
// icons (vision/mission, why-traya, principles, capabilities, process…).
// Pass the size via className (e.g. "size-12"); defaults to size-11.
export function IconChip({
  className = "size-11",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-traya-saffron-soft text-traya-saffron-lo ${className}`}
    >
      {children}
    </span>
  );
}
