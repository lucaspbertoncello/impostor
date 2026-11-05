/** "Faltam N para começar" while there are fewer than the minimum; nothing otherwise (RF-JOG-009). */
export function getPlayerCountHint(playerCount: number, missingPlayers: number): string | null {
  if (playerCount === 0 || missingPlayers === 0) return null;
  return `Faltam ${missingPlayers} para começar`;
}
