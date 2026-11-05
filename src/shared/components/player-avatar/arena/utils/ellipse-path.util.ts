/** Path of an ellipse, so it can be clipped and shaded like any other shape. */
export function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;
}
