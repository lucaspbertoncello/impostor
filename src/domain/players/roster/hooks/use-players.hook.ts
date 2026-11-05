import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';

/** The players in the order they entered. */
export function usePlayers(): Player[] {
  return useRoster((state) => state.players);
}
