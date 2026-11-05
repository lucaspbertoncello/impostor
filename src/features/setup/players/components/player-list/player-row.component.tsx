import type { Ref } from 'react';
import { Button } from 'react-aria-components';

import { PencilIcon } from '#/features/setup/players/components/player-list/pencil-icon.component.tsx';
import type { PlayerItem } from '#/features/setup/players/types/player-item.type.ts';
import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type PlayerRowProps = {
  theme: ThemeName;
  player: PlayerItem;
  onEdit: (playerId: string) => void;
  rowRef?: Ref<HTMLButtonElement>;
};

/** The whole row is the button that opens the edit sheet (RF-JOG-003); the pencil only says so. */
export function PlayerRow({ theme, player, onEdit, rowRef }: PlayerRowProps) {
  return (
    <li className="scroll-mb-40">
      <Button
        ref={rowRef}
        aria-label={`Editar ${player.name}`}
        onPress={() => onEdit(player.id)}
        className="flex min-h-16 w-full cursor-pointer items-center gap-3 rounded-md border-solid border-border bg-surface py-2 pr-4 pl-3 text-left text-text outline-none [border-width:var(--theme-outline-width)] transition-transform duration-100 data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring data-[pressed]:translate-y-0.5"
      >
        <span className="flex size-12 shrink-0 items-center justify-center">
          <PlayerAvatar theme={theme} index={player.iconIndex} size={44} />
        </span>
        <span className="min-w-0 flex-1 text-[20px] leading-tight font-semibold break-words">
          {player.name}
        </span>
        <PencilIcon size={20} className="shrink-0 text-text-muted" />
      </Button>
    </li>
  );
}
