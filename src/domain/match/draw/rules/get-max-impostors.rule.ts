/** BR-MAT-020: half of the players rounded up, minus 1 (3 or 4 -> 1; 5 or 6 -> 2; 20 -> 9). Never below 1. */
export function getMaxImpostors(playerCount: number): number {
  return Math.max(1, Math.ceil(playerCount / 2) - 1);
}
