/**
 * Crescent on the bottom-right edge of an ellipse: the one light angle of the whole set.
 * The outer arc follows the ellipse; the inner arc is the same curve, flatter.
 */
export function ellipseCrescentPath(cx: number, cy: number, rx: number, ry: number): string {
  const point = (degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    return `${(cx + rx * Math.cos(radians)).toFixed(2)} ${(cy + ry * Math.sin(radians)).toFixed(2)}`;
  };
  const flatter = 1.3;
  return `M ${point(5)} A ${rx} ${ry} 0 0 1 ${point(100)} A ${(rx * flatter).toFixed(2)} ${(ry * flatter).toFixed(2)} 0 0 0 ${point(5)} Z`;
}
