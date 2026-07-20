// Decorative "global trade network" globe — pure inline SVG (no JS, no canvas,
// no animation → reduced-motion safe by construction). Used as warm brand
// ornament beside the vision/mission copy. Purely presentational: aria-hidden,
// so it's invisible to assistive tech. IDs are namespaced by `tone` so two
// instances on one page can't collide.
type Tone = "light" | "dark";

// Node positions on the globe face (viewBox 0 0 400 300). A few are accented as
// "hubs" to suggest sourcing/partner points across continents.
const NODES: Array<{ x: number; y: number; hub?: boolean }> = [
  { x: 120, y: 96, hub: true },
  { x: 196, y: 70 },
  { x: 286, y: 104, hub: true },
  { x: 96, y: 168 },
  { x: 210, y: 150, hub: true },
  { x: 300, y: 182 },
  { x: 150, y: 214 },
  { x: 250, y: 226 },
];

// Trade-route arcs between selected nodes (index pairs into NODES).
const ROUTES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 4],
  [4, 2],
  [3, 4],
  [4, 5],
  [3, 6],
  [6, 4],
  [4, 7],
  [7, 5],
];

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - 26; // bow upward for a routed feel
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

export function NetworkGlobe({
  tone = "light",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const uid = `ng-${tone}`;
  // On a light band, draw in warm ink; on a dark band, draw in cream.
  const line = tone === "light" ? "var(--traya-ink)" : "var(--traya-cream)";
  const faint = tone === "light" ? 0.14 : 0.22;
  const grid = tone === "light" ? 0.1 : 0.16;

  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      {/* globe outline */}
      <circle
        cx="200"
        cy="150"
        r="132"
        stroke={line}
        strokeOpacity={faint}
        strokeWidth="1.25"
      />
      {/* meridians (vertical ellipses) */}
      {[132, 88, 40].map((rx) => (
        <ellipse
          key={`m${rx}`}
          cx="200"
          cy="150"
          rx={rx}
          ry="132"
          stroke={line}
          strokeOpacity={grid}
          strokeWidth="1"
        />
      ))}
      {/* parallels (horizontal ellipses) */}
      {[-70, 0, 70].map((dy) => (
        <ellipse
          key={`p${dy}`}
          cx="200"
          cy="150"
          rx={Math.sqrt(Math.max(1, 132 * 132 - dy * dy))}
          ry="20"
          transform={`translate(0 ${dy})`}
          stroke={line}
          strokeOpacity={grid}
          strokeWidth="1"
        />
      ))}

      {/* trade-route arcs */}
      {ROUTES.map(([i, j], k) => (
        <path
          key={`r${k}`}
          d={arc(NODES[i], NODES[j])}
          stroke="var(--traya-saffron)"
          strokeOpacity={tone === "light" ? 0.55 : 0.7}
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}

      {/* nodes */}
      {NODES.map((n, i) =>
        n.hub ? (
          <g key={`n${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="6"
              fill="var(--traya-red)"
              fillOpacity="0.12"
            />
            <circle cx={n.x} cy={n.y} r="2.6" fill="var(--traya-red)" />
          </g>
        ) : (
          <circle
            key={`n${i}`}
            cx={n.x}
            cy={n.y}
            r="1.8"
            fill="var(--traya-saffron)"
            fillOpacity="0.9"
          />
        ),
      )}

      {/* keep uid referenced so the namespacing intent is explicit */}
      <defs>
        <clipPath id={`${uid}-face`}>
          <circle cx="200" cy="150" r="132" />
        </clipPath>
      </defs>
    </svg>
  );
}
