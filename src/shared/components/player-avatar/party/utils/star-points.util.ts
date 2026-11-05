/** Points of a five-point star, tip up, as an SVG `points` string. */
export function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let step = 0; step < 10; step += 1) {
    const radius = step % 2 === 0 ? outer : inner;
    const angle = (-90 + step * 36) * (Math.PI / 180);
    points.push(
      `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return points.join(' ');
}
