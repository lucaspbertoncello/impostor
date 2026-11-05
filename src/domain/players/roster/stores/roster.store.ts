import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { APP_STORAGE } from '#/domain/match/storage/constants/app-storage.constant.ts';
import { createValidatedMerge } from '#/domain/match/storage/utils/create-validated-merge.util.ts';
import { MAX_PLAYERS } from '#/domain/players/roster/constants/roster-limits.constant.ts';
import { validatePlayerName } from '#/domain/players/roster/rules/validate-player-name.rule.ts';
import { rosterStateSchema } from '#/domain/players/roster/schemas/roster-state.schema.ts';
import type { PlayerActionResult } from '#/domain/players/roster/types/player-action-result.type.ts';
import type { Player } from '#/domain/players/roster/types/player.type.ts';
import { createPlayerId } from '#/domain/players/roster/utils/create-player-id.util.ts';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';

export type PlayerInput = { name: string; iconIndex: PlayerIconIndex };

type RosterState = {
  /** One list for both modes (BR-MAT-013). */
  players: Player[];
};

type RosterActions = {
  addPlayer: (input: PlayerInput) => PlayerActionResult;
  updatePlayer: (playerId: string, input: PlayerInput) => PlayerActionResult;
  removePlayer: (playerId: string) => void;
  clearPlayers: () => void;
};

const INITIAL_STATE: RosterState = { players: [] };

/** Never read it from a screen directly: use the hooks of `players/roster/hooks/`. */
export const useRoster = create<RosterState & RosterActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      addPlayer: ({ name, iconIndex }) => {
        const { players } = get();
        if (players.length >= MAX_PLAYERS) return { ok: false, error: 'roster-full' };

        const error = validatePlayerName(name, players);
        if (error !== null) return { ok: false, error };

        const player: Player = { id: createPlayerId(), name: name.trim(), iconIndex };
        set({ players: [...players, player] });

        return { ok: true, player };
      },
      updatePlayer: (playerId, { name, iconIndex }) => {
        const { players } = get();
        if (!players.some((player) => player.id === playerId))
          return { ok: false, error: 'not-found' };

        const error = validatePlayerName(name, players, playerId);
        if (error !== null) return { ok: false, error };

        const updated: Player = { id: playerId, name: name.trim(), iconIndex };
        set({ players: players.map((player) => (player.id === playerId ? updated : player)) });

        return { ok: true, player: updated };
      },
      removePlayer: (playerId) => {
        set({ players: get().players.filter((player) => player.id !== playerId) });
      },
      clearPlayers: () => set({ players: [] }),
    }),
    {
      name: 'impostor-roster',
      version: 1,
      storage: createJSONStorage(() => APP_STORAGE),
      partialize: (state) => ({ players: state.players }),
      merge: createValidatedMerge<RosterState & RosterActions, RosterState>(rosterStateSchema),
    },
  ),
);
