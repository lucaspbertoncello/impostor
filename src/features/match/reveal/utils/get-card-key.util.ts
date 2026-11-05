/**
 * Identifies one card of one round without anything secret: who holds it and its position.
 * Used as the React `key` of the turn, so each player gets a fresh face-down card.
 */
export function getCardKey(playerId: string, cardNumber: number, cardCount: number): string {
  return `${playerId}:${cardNumber}/${cardCount}`;
}
