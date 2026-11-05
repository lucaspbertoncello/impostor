import { useEffect, useRef } from 'react';

import { PlayerRow } from '#/features/setup/players/components/player-list/player-row.component.tsx';
import type { PlayerItem } from '#/features/setup/players/types/player-item.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type PlayerListProps = {
  theme: ThemeName;
  players: PlayerItem[];
  /** The player just added: the list scrolls to the row (RF-JOG-002). */
  lastAddedId: string | null;
  onEdit: (playerId: string) => void;
};

/** RF-JOG-001 item 3: icon and name, in the order of entry. */
export function PlayerList({ theme, players, lastAddedId, onEdit }: PlayerListProps) {
  const addedRow = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // jsdom has no scrollIntoView.
    addedRow.current?.scrollIntoView?.({ block: 'nearest' });
  }, [lastAddedId]);

  return (
    <ul aria-label="Jogadores" className="flex flex-col gap-2">
      {players.map((player) => (
        <PlayerRow
          key={player.id}
          theme={theme}
          player={player}
          onEdit={onEdit}
          rowRef={player.id === lastAddedId ? addedRow : undefined}
        />
      ))}
    </ul>
  );
}
