type GlossProps = { cx: number; cy: number; rx: number; ry: number; opacity?: number };

/** Soft white highlight facing the light (top-left). */
export function Gloss({ cx, cy, rx, ry, opacity = 0.5 }: GlossProps) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="#FFFFFF"
      opacity={opacity}
      transform={`rotate(-28 ${cx} ${cy})`}
    />
  );
}
