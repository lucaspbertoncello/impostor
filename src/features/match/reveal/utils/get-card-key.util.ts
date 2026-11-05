/**
 * Identifies one card of one round without anything secret: who holds it and its position.
 * Used only to know whether the saved "card" step still belongs to the card of the turn.
 */
export function getCardKey(playerId: string, cardNumber: number, cardCount: number): string {
  return `${playerId}:${cardNumber}/${cardCount}`;
}
