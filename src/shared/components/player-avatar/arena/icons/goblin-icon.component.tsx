import {
  ARENA_EYE,
  ARENA_OUTLINE,
  ARENA_WHITE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';

const HEAD = ellipsePath(48, 48, 26, 22);

/** Position 4: lime-green goblin with huge ears and a toothy grin. */
export function GoblinIcon() {
  return (
    <g>
      <ArenaBody fill="#9A6531" shade="#62401C" />
      <ShadedShape d="M24 40L3 30L8 54L24 58Z" fill="#9BE23C" shade="#5FA81E" />
      <ShadedShape d="M72 40L93 30L88 54L72 58Z" fill="#9BE23C" shade="#5FA81E" />
      <path d="M20 42L11 38L13 50L20 52Z" fill="#E77A8A" />
      <path d="M76 42L85 38L83 50L76 52Z" fill="#E77A8A" />
      <ShadedShape d={HEAD} fill="#9BE23C" shade="#5FA81E" />
      <Gloss cx={36} cy={32} rx={9} ry={4} />
      <ArenaEyes cy={42} gap={11} variant="light" sclera="#FFF27A" tilt={10} scale={0.95} />
      <path d="M26 31L42 36M70 31L54 36" stroke={ARENA_EYE} strokeWidth="4" strokeLinecap="round" />
      <ellipse
        cx="48"
        cy="51"
        rx="6"
        ry="5"
        fill="#7FC22C"
        stroke={ARENA_OUTLINE}
        strokeWidth="3.5"
      />
      <path
        d="M31 58Q48 72 65 58Q48 62 31 58Z"
        fill={ARENA_EYE}
        stroke={ARENA_OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M36 59.5L39 65L42 60.5M54 60.5L57 65L60 59.5"
        fill={ARENA_WHITE}
        stroke={ARENA_OUTLINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </g>
  );
}
