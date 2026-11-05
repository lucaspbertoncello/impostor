import { ArenaPlayerIcon } from '#/shared/components/player-avatar/arena/arena-player-icon.component.tsx';
import { PartyPlayerIcon } from '#/shared/components/player-avatar/party/party-player-icon.component.tsx';
import type { PlayerIconIndex } from '#/shared/types/player-icon-index.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type PlayerAvatarProps = {
  theme: ThemeName;
  index: PlayerIconIndex;
  size?: number;
};

/** Picks the icon of the theme for the player position. */
export function PlayerAvatar({ theme, index, size }: PlayerAvatarProps) {
  return theme === 'arena' ? (
    <ArenaPlayerIcon index={index} size={size} />
  ) : (
    <PartyPlayerIcon index={index} size={size} />
  );
}
