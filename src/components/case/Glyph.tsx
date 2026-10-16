/**
 * Line-art glyphs for the pipeline section.
 *
 * Hairline vector, drawn on a 64-unit grid, stroked with currentColor so each
 * glyph inverts with the theme instead of being a baked-in raster. Deliberately
 * schematic: these describe a stage in a system, they are not illustrations.
 */

export type GlyphName =
  | "input"
  | "graph"
  | "layers"
  | "cards"
  | "converge"
  | "receipt"
  | "archive"
  | "wave"
  | "scan"
  | "map"
  | "grid";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;

function Paths({ name }: { name: GlyphName }) {
  switch (name) {
    case "input": // a hand at a keyboard, mid-word
      return (
        <>
          <rect x={6} y={30} width={52} height={22} {...S} />
          <path d="M12 36h40M12 42h26M12 48h16" {...S} />
          <path d="M40 48c0-6 3-9 7-9s7 3 7 9" {...S} />
          <path d="M14 24h14" {...S} />
          <path d="M30 20v8" {...S} />
        </>
      );
    case "graph": // a node cloud, unevenly connected
      return (
        <>
          <path
            d="M32 8 14 20 10 40l22 16 22-16-4-20z"
            {...S}
            strokeDasharray="2 3"
          />
          <path
            d="M32 8 10 40M32 8l22 32M14 20l40 4M10 40l44-16M32 56 14 20M32 56 54 20"
            {...S}
          />
          {[
            [32, 8],
            [14, 20],
            [54, 20],
            [10, 40],
            [54, 40],
            [32, 56],
            [32, 30],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={2}
              fill="currentColor"
              stroke="none"
            />
          ))}
        </>
      );
    case "layers": // stacked planes seen in perspective
      return (
        <>
          {[0, 9, 18].map((d) => (
            <path key={d} d={`M12 ${20 + d}l20-8 20 8-20 8z`} {...S} />
          ))}
          <path d="M12 20v18M52 20v18M32 28v18" {...S} strokeDasharray="2 3" />
        </>
      );
    case "cards": // three options, side by side
      return (
        <>
          <rect x={4} y={14} width={16} height={36} {...S} />
          <rect x={24} y={14} width={16} height={36} {...S} />
          <rect x={44} y={14} width={16} height={36} {...S} />
          <path d="M7 20h10M27 20h10M47 20h10" {...S} />
          <path d="M7 44h6M27 44h6M47 44h6" {...S} />
          <circle cx={32} cy={32} r={5} {...S} />
        </>
      );
    case "converge": // many paths resolving to one point
      return (
        <>
          <path d="M6 14h10M6 26h10M6 38h10M6 50h10" {...S} />
          <path d="M16 14 46 32M16 26 46 32M16 38 46 32M16 50 46 32" {...S} />
          <circle cx={48} cy={32} r={4} {...S} />
          <path d="M52 32h8" {...S} />
        </>
      );
    case "receipt": // a printer issuing a slip
      return (
        <>
          <rect x={8} y={8} width={34} height={44} {...S} />
          <path
            d="M14 18h22M14 26h22M14 34h14M14 42h18"
            {...S}
            strokeDasharray="2 2"
          />
          <path d="M42 22h14v30l-4-3-4 3-4-3-2 2z" {...S} />
          <path d="M46 30h6M46 36h6" {...S} />
        </>
      );
    case "archive": // a drawer of stored slips, one pulled
      return (
        <>
          <rect x={6} y={12} width={52} height={40} {...S} />
          {[14, 22, 38, 46].map((x) => (
            <rect key={x} x={x} y={16} width={6} height={32} {...S} />
          ))}
          <rect x={29} y={10} width={7} height={38} {...S} />
          <circle cx={32} cy={52} r={2} {...S} />
        </>
      );
    case "wave": // a signal read off a surface
      return (
        <>
          <path
            d="M4 32c6 0 6-16 12-16s6 32 12 32 6-26 12-26 6 20 12 20 6-10 8-10"
            {...S}
          />
          <path d="M4 52h56" {...S} strokeDasharray="2 3" />
        </>
      );
    case "scan": // a frame being measured
      return (
        <>
          <rect x={10} y={14} width={44} height={36} {...S} />
          <path d="M10 8v-2h10M54 8V6H44M10 56v2h10M54 56v2H44" {...S} />
          <path d="M18 26h28M18 34h20" {...S} />
          <path d="M46 40v8M42 44h8" {...S} />
        </>
      );
    case "map": // a route across water
      return (
        <>
          <path d="M6 44c10-6 14 4 24-2s14-14 28-8" {...S} />
          <path
            d="M6 52c10-6 14 4 24-2s14-14 28-8"
            {...S}
            strokeDasharray="2 3"
          />
          <circle cx={14} cy={40} r={3} {...S} />
          <circle cx={50} cy={32} r={3} {...S} />
          <path d="M32 10v12M26 16h12" {...S} />
        </>
      );
    case "grid": // a calendar of days
      return (
        <>
          <rect x={8} y={12} width={48} height={40} {...S} />
          <path
            d="M8 22h48M22 22v30M36 22v30M50 22v30M8 32h48M8 42h48"
            {...S}
          />
          <rect
            x={22}
            y={32}
            width={14}
            height={10}
            fill="currentColor"
            stroke="none"
            opacity={0.28}
          />
        </>
      );
  }
}

export function Glyph({
  name,
  className = "",
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="presentation"
      aria-hidden
      className={className}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <Paths name={name} />
    </svg>
  );
}
