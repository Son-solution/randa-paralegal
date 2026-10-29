import type { CSSProperties } from "react";

type Emblem = { x: number; y: number; radii: number[] };

/** Concentric gold rings; one dashed ring turns, a light circles the rings, small diamonds orbit. */
const emblems: Emblem[] = [
  { x: 1230, y: 150, radii: [310, 255, 200, 150] },
  { x: 110, y: 720, radii: [190, 145, 100] },
];

/**
 * Small floating diamonds: position, size, float duration (s), delay (s), filled.
 * Kept out of the text column (roughly x 140–740) so they never sit on top of copy.
 */
const diamonds: [number, number, number, number, number, boolean][] = [
  [70, 190, 8, 7, -2, false],
  [100, 470, 5, 9, -5, true],
  [780, 120, 9, 8, -1, false],
  [900, 700, 6, 10, -6, true],
  [1360, 560, 10, 7.5, -3, false],
  [1200, 760, 5, 9.5, -7, true],
  [860, 60, 5, 8.5, -4, true],
];

const diamond = (s: number) => `M0 ${-s} L${s * 0.62} 0 L0 ${s} L${-s * 0.62} 0 Z`;
const orbit = 8;

function EmblemArt({ x, y, radii }: Emblem) {
  const [outer, dashed, ...inner] = radii;
  const dotR = inner[0] ?? dashed;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle className="orn-ring" r={outer} />
      <circle className="orn-ring orn-dash orn-spin" r={dashed} />
      {inner.map((r) => (
        <circle key={r} className="orn-ring" r={r} />
      ))}
      <circle className="orn-comet orn-spin-fast" r={outer} pathLength={1} />
      <g className="orn-spin orn-rev">
        {Array.from({ length: orbit }, (_, i) => {
          const a = (i / orbit) * Math.PI * 2;
          return <path key={i} className={`orn-dia${i % 2 ? "" : " f"}`} d={diamond(i % 2 ? 6 : 4)} transform={`translate(${(Math.cos(a) * dotR).toFixed(1)} ${(Math.sin(a) * dotR).toFixed(1)})`} />;
        })}
      </g>
    </g>
  );
}

/**
 * Decorative gold ornaments behind a section's content: slowly turning rings and floating
 * diamonds. The host section needs the `lux-host` class. `tone="light"` is for navy backgrounds.
 */
export default function LuxuryOrnaments({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <svg className={`lux-orn lux-${tone}`} aria-hidden="true" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
      {emblems.map((e) => (
        <EmblemArt key={`${e.x}-${e.y}`} {...e} />
      ))}
      {diamonds.map(([x, y, s, t, delay, filled]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path className={`orn-dia orn-float${filled ? " f" : ""}`} d={diamond(s)} style={{ "--t": `${t}s`, "--delay": `${delay}s` } as CSSProperties} />
        </g>
      ))}
    </svg>
  );
}
