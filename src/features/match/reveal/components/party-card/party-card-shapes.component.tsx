type ShapeStyle = { fill: string; opacity: number };

type PartyCardShapesProps = {
  circle: ShapeStyle;
  square: ShapeStyle;
  diamond: ShapeStyle;
};

// The three geometric shapes of the front, in the same place for crew and impostor: only the
// colors change. `currentColor` lets the crew card (colored by the category) tint them from its ink.
export function PartyCardShapes({ circle, square, diamond }: PartyCardShapesProps) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 100 140"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="98" cy="12" r="36" fill={circle.fill} fillOpacity={circle.opacity} />
      <rect
        x="-16"
        y="112"
        width="44"
        height="44"
        rx="9"
        transform="rotate(12 6 134)"
        fill={square.fill}
        fillOpacity={square.opacity}
      />
      <rect
        x="79"
        y="107"
        width="10"
        height="10"
        rx="2"
        transform="rotate(45 84 112)"
        fill={diamond.fill}
        fillOpacity={diamond.opacity}
      />
    </svg>
  );
}
