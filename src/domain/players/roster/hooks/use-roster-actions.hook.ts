import { useShallow } from 'zustand/react/shallow';

import { useRoster } from '#/domain/players/roster/stores/roster.store.ts';

/** Add, edit and remove players (RF-JOG-002 to RF-JOG-004). Each returns a result with the name error, if any. */
export function useRosterActions() {
  return useRoster(
    useShallow((state) => ({
      addPlayer: state.addPlayer,
      updatePlayer: state.updatePlayer,
      removePlayer: state.removePlayer,
      clearPlayers: state.clearPlayers,
    })),
  );
}
