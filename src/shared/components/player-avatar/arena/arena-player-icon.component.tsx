import { ARENA_ICON_CHARACTERS } from '#/shared/components/player-avatar/arena/constants/arena-icon-characters.constant.ts';
import { ARENA_ICON_VIEW_BOX } from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import type { PlayerIconProps } from '#/shared/components/player-avatar/player-icon-props.type.ts';

/** Arena theme icon of a player position: an original fantasy character on a shared 96-unit grid. */
export function ArenaPlayerIcon({ index, size = 48, title }: PlayerIconProps) {
  const { name, Drawing } = ARENA_ICON_CHARACTERS[index];
  const label = title ?? name;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${ARENA_ICON_VIEW_BOX} ${ARENA_ICON_VIEW_BOX}`}
      role="img"
      aria-label={label}
      data-icon="arena"
      data-character={name}
    >
      <title>{label}</title>
      <Drawing />
    </svg>
  );
}
