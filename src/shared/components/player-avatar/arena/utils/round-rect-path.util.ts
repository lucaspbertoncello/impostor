/** Path of a rounded rectangle, so it can be clipped and shaded like any other shape. */
export function roundRectPath(x: number, y: number, w: number, h: number, r: number): string {
  return (
    `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}` +
    `Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}` +
    `V${y + r}Q${x} ${y} ${x + r} ${y}Z`
  );
}
