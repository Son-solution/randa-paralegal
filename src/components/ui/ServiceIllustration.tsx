import type { CSSProperties, ReactNode } from "react";

type Kind = "documents" | "path" | "bridge";

const NAVY = "#163A5F";
const GOLD = "#D4A017";
/** Background of the sections the illustrations sit on; used to let shapes cover each other. */
const PAPER = "#F3EEE4";

/** A stroke that draws itself on scroll (see `.draw` in globals.css); `d` is the start delay in seconds. */
function Line({ path, gold, d = 0, width = 1.6 }: { path: string; gold?: boolean; d?: number; width?: number }) {
  return (
    <path
      className="draw"
      pathLength={1}
      d={path}
      fill="none"
      stroke={gold ? GOLD : NAVY}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ "--d": d } as CSSProperties}
    />
  );
}

/** Small element that fades and pops in after the lines. */
function Pop({ d, children }: { d: number; children: ReactNode }) {
  return (
    <g className="pop" style={{ "--d": d } as CSSProperties}>
      {children}
    </g>
  );
}

const art: Record<Kind, ReactNode> = {
  // Administrative support: sorted papers, a fountain pen and a gold seal
  documents: (
    <>
      <g transform="rotate(-7 150 104)">
        <Line path="M92 36 h104 v136 h-104 z" d={0} />
      </g>
      <path d="M118 28 h90 l24 24 v124 h-114 z" fill={PAPER} />
      <Line path="M118 28 h90 l24 24 v124 h-114 z" d={0.15} />
      <Line path="M208 28 v24 h24" d={0.5} />
      <Line path="M136 72 h72 M136 88 h80 M136 104 h58 M136 120 h74" d={0.6} width={1.3} />
      <Line path="M136 152 c6 -12 12 -12 16 0 s10 8 15 -3 s9 -6 14 3" gold d={1} />
      <path d="M254 46 l14 8 l-46 80 l-14 -8 z" fill={PAPER} />
      <Line path="M254 46 l14 8 l-46 80 l-14 -8 z M244 62 l14 8" d={0.8} />
      <Line path="M208 126 l-5 20 l15 -12" gold d={1.2} />
      <Pop d={1.5}>
        <circle cx="96" cy="152" r="22" fill="#FAF9F5" stroke={GOLD} strokeWidth="1.6" />
        <circle cx="96" cy="152" r="16" fill="none" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M87 152 l6 6 l12 -13" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </Pop>
    </>
  ),
  // Youth coaching: step by step towards a goal, with a compass for orientation
  path: (
    <>
      <Line path="M30 176 h260" d={0} width={1.2} />
      <Line path="M54 176 v-24 h44 v-24 h44 v-24 h44 v-24 h44 v-24" d={0.2} />
      <Line path="M230 56 v-38" d={1.1} />
      <Line path="M230 18 l30 10 l-30 10" gold d={1.3} />
      <Line path="M80 34 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" d={0.4} width={1.2} />
      <Line path="M80 18 l6 16 l-6 16 l-6 -16 z" gold d={0.9} />
      <Pop d={1.4}>
        <circle cx="76" cy="144" r="3.5" fill={GOLD} />
        <circle cx="120" cy="120" r="3.5" fill={GOLD} />
        <circle cx="164" cy="96" r="3.5" fill={GOLD} />
        <circle cx="208" cy="72" r="3.5" fill={GOLD} />
      </Pop>
    </>
  ),
  // Interpreting: two voices joined by a gold bridge
  bridge: (
    <>
      <Line path="M54 44 h76 a14 14 0 0 1 14 14 v36 a14 14 0 0 1 -14 14 h-50 l-20 18 v-18 h-6 a14 14 0 0 1 -14 -14 v-36 a14 14 0 0 1 14 -14 z" d={0} />
      <Line path="M190 30 h76 a14 14 0 0 1 14 14 v36 a14 14 0 0 1 -14 14 h-6 v18 l-20 -18 h-50 a14 14 0 0 1 -14 -14 v-36 a14 14 0 0 1 14 -14 z" d={0.25} />
      <Line path="M60 66 h64 M60 84 h42" d={0.7} width={1.3} />
      <Line path="M200 52 h66 M224 70 h42" d={0.8} width={1.3} />
      <Line path="M36 170 h248" d={1} />
      <Line path="M60 170 Q160 110 260 170" gold d={1.1} width={1.8} />
      <Line path="M100 170 v-19 M130 170 v-27 M160 170 v-30 M190 170 v-27 M220 170 v-19" gold d={1.5} width={1.1} />
      <Line path="M60 170 v16 M260 170 v16" d={1.2} />
    </>
  ),
};

/** Decorative line illustration for the service pages – drawn in on scroll, static without motion. */
export default function ServiceIllustration({ kind }: { kind: Kind }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 200" style={{ width: "min(300px, 78%)", height: "auto", display: "block", overflow: "visible" }}>
      {art[kind]}
    </svg>
  );
}
