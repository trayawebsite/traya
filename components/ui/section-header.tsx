// The shared section header block   eyebrow (section-label) → Lora heading →
// optional sub. Repeated across ~15 content sections; this is the single source.
// It's a fragment (no wrapper), so callers keep their own layout/max-width and
// can place a CTA or grid after it.
//   dark  → on deep espresso bands (cream text + on-dark eyebrow)
//   lead  → larger intro-style sub (text-lg)
export function SectionHeader({
  eyebrow,
  heading,
  headingAccent,
  sub,
  dark = false,
  lead = false,
}: {
  eyebrow: string;
  heading: string;
  headingAccent?: string;
  sub?: string;
  dark?: boolean;
  lead?: boolean;
}) {
  return (
    <>
      <p className={dark ? "section-label on-dark" : "section-label"}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-balance font-display text-display-sm lg:text-display${
          dark ? "" : " text-foreground"
        }`}
      >
        {heading}
        {headingAccent && (
          <>
            {" "}
            <span className={dark ? "text-traya-red-hi" : "text-traya-red"}>
              {headingAccent}
            </span>
          </>
        )}
      </h2>
      {sub && (
        <p
          className={`${lead ? "mt-5 text-lg" : "mt-4"} text-pretty leading-relaxed ${
            dark ? "text-traya-cream/75" : "text-muted-foreground"
          }`}
        >
          {sub}
        </p>
      )}
    </>
  );
}
