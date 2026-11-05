import { ARENA_EYE } from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';

const GHOST =
  'M16 50C16 28 30 17 48 17C66 17 80 28 80 50V74C80 80 73 80 70 75C66 84 59 84 56 77C52 86 44 86 40 77C37 84 30 84 26 75C23 80 16 80 16 74Z';

/** Position 16: ice-lilac ghost with glowing eyes and a cyan flame. */
export function SpiritIcon() {
  return (
    <g>
      <ShadedShape
        d="M42 18C36 12 44 10 48 4C50 10 60 12 54 18Z"
        fill="#8CEBFF"
        shade="#3DB8E0"
        outline={4.5}
      />
      <ShadedShape d={GHOST} fill="#D6CBFF" shade="#9A88E0" />
      <Gloss cx={34} cy={34} rx={10} ry={5} opacity={0.65} />
      <ellipse cx="37" cy="48" rx="6.4" ry="8.4" fill={ARENA_EYE} transform="rotate(8 37 48)" />
      <ellipse cx="59" cy="48" rx="6.4" ry="8.4" fill={ARENA_EYE} transform="rotate(-8 59 48)" />
      <ellipse cx="38" cy="49" rx="2.6" ry="3.6" fill="#8CEBFF" />
      <ellipse cx="58" cy="49" rx="2.6" ry="3.6" fill="#8CEBFF" />
      <ellipse cx="48" cy="64" rx="4" ry="5" fill={ARENA_EYE} />
      <circle cx="28" cy="60" r="3.6" fill="#FF8FC8" opacity="0.55" />
      <circle cx="68" cy="60" r="3.6" fill="#FF8FC8" opacity="0.55" />
    </g>
  );
}
