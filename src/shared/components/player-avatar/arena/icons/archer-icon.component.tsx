import {
  ARENA_EYE,
  ARENA_OUTLINE,
  ARENA_SKIN,
  ARENA_SKIN_SHADE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';

const HEAD = ellipsePath(48, 49, 24, 21);

/** Position 3: leather-brown archer with a feathered hood and a quiver. */
export function ArcherIcon() {
  return (
    <g>
      <path d="M64 70L76 30" stroke={ARENA_OUTLINE} strokeWidth="8" strokeLinecap="round" />
      <path d="M64 70L76 30" stroke="#D9B27A" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M72 44L84 38L80 28L74 34Z"
        fill="#E5484D"
        stroke={ARENA_OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ArenaBody fill="#A56B3A" shade="#6A3E1C" />
      <path d="M26 69L58 85" stroke="#6A3E1C" strokeWidth="6" strokeLinecap="round" />
      <ShadedShape d="M26 50C16 56 14 70 22 78C28 70 32 62 32 52Z" fill="#E8832E" shade="#B2551A" />
      <ShadedShape d={HEAD} fill={ARENA_SKIN} shade={ARENA_SKIN_SHADE} />
      <ShadedShape
        d="M17 52C12 24 30 11 48 11C66 11 84 24 79 52C76 42 70 34 62 33C58 38 38 38 34 33C26 34 20 42 17 52Z"
        fill="#B4793F"
        shade="#74461F"
      />
      <path d="M33 34C38 42 56 42 62 34" fill="none" stroke={ARENA_OUTLINE} strokeWidth="3" />
      <ShadedShape
        d="M64 20C70 8 82 6 90 10C86 22 76 26 66 26Z"
        fill="#53C46B"
        shade="#2D8A45"
        outline={4.5}
      />
      <ArenaEyes cy={50} gap={10} />
      <path
        d="M42 59Q48 63 54 59"
        fill="none"
        stroke={ARENA_EYE}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </g>
  );
}
