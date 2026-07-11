import { cn } from "@/lib/utils";

// Highlight chip   a non-CTA marker ("Featured", "Premium", "New"). The default
// SAFFRON tone uses the soft gold fill + AA-safe dark-gold text, so it reads as
// a *highlight* without competing with vermilion (the action colour). Drop it on
// product / category cards. Pass `tone` for the forest / red variants.
const tones = {
  featured: "bg-traya-saffron-soft text-traya-saffron-lo",
  forest: "bg-traya-forest/10 text-traya-forest",
  red: "bg-traya-red-soft text-traya-red-deep",
} as const;

export function Badge({
  children,
  tone = "featured",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
