import type { Player } from '#/domain/players/roster/types/player.type.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

export function createFakePlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `p${index + 1}`,
    name: `Jogador ${index + 1}`,
    iconIndex: ((index % 16) + 1) as PlayerIconIndex,
  }));
}
