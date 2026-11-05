import { PARTY_ICON_CATALOG } from '#/shared/components/player-avatar/party/constants/party-icon-catalog.constant.ts';
import { PARTY_ICON_ROTATIONS } from '#/shared/components/player-avatar/party/constants/party-icon-rotations.constant.ts';
import type { PlayerIconProps } from '#/shared/components/player-avatar/player-icon-props.type.ts';

/** Party player icon: an animal or shape in flat logo colors, tilted a little. Position 1 to 16. */
export function PartyPlayerIcon({ index, size = 48, title }: PlayerIconProps) {
  const { name, Drawing } = PARTY_ICON_CATALOG[index];
  const rotation = PARTY_ICON_ROTATIONS[index - 1];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={title ?? name}
      data-icon="party"
      data-index={index}
    >
      <g transform={`rotate(${rotation} 48 48)`}>
        <Drawing />
      </g>
    </svg>
  );
}
