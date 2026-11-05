import {
  ARENA_EYE,
  ARENA_OUTLINE,
  ARENA_WHITE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';

const FACE = ellipsePath(48, 49, 26, 21);

/** Position 13: brick-red gnome with a droopy hat, round nose and white beard. */
export function GnomeIcon() {
  return (
    <g>
      <ArenaBody fill="#3E7BD1" shade="#23509A" />
      <ShadedShape d={FACE} fill="#F7CBA2" shade="#E09A74" />
      <ShadedShape
        d="M22 54C22 66 30 74 38 76C44 80 52 80 58 76C66 74 74 66 74 54C68 62 58 62 48 60C38 62 28 62 22 54Z"
        fill="#FFFFFF"
        shade="#C7CBE0"
      />
      <circle cx="48" cy="55" r="8" fill="#F58F7C" stroke={ARENA_OUTLINE} strokeWidth="4" />
      <circle cx="45.5" cy="52.5" r="2.4" fill="#FFFFFF" opacity="0.7" />
      <ellipse cx="37" cy="46" rx="3.6" ry="4.6" fill={ARENA_EYE} />
      <ellipse cx="59" cy="46" rx="3.6" ry="4.6" fill={ARENA_EYE} />
      <circle cx="36" cy="44.5" r="1.4" fill={ARENA_WHITE} />
      <circle cx="58" cy="44.5" r="1.4" fill={ARENA_WHITE} />
      <circle cx="29" cy="56" r="3.4" fill="#FF8FA8" opacity="0.7" />
      <circle cx="67" cy="56" r="3.4" fill="#FF8FA8" opacity="0.7" />
      <ShadedShape
        d="M22 38C24 26 32 14 46 8C54 6 62 10 58 18C56 22 64 28 74 38Z"
        fill="#C9472E"
        shade="#8E2418"
      />
      <Gloss cx={38} cy={26} rx={8} ry={3.4} />
      <path
        d="M26 38C38 41 58 41 70 38"
        fill="none"
        stroke="#8E2418"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}
