import {
  ARENA_EYE,
  ARENA_OUTLINE,
  ARENA_SKIN,
  ARENA_SKIN_SHADE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';
import { roundRectPath } from '#/shared/components/player-avatar/arena/utils/round-rect-path.util.ts';

const HEAD = ellipsePath(48, 47, 28, 23);

/** Position 1: steel-blue knight with a red plume. */
export function KnightIcon() {
  return (
    <g>
      <ShadedShape d="M38 28C30 12 52 2 74 12C64 14 62 22 64 32Z" fill="#F0585E" shade="#B02A3C" />
      <ArenaBody fill="#5B8BD6" shade="#33579B" />
      <path
        d="M40 66H56V78H40Z"
        fill="#F2C14E"
        stroke={ARENA_OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <ShadedShape d={HEAD} fill="#86A9E8" shade="#3E64AC" />
      <Gloss cx={34} cy={34} rx={9} ry={4.5} />
      <ShadedShape
        d={roundRectPath(30, 39, 36, 21, 9)}
        fill={ARENA_SKIN}
        shade={ARENA_SKIN_SHADE}
        outline={4.5}
      />
      <ArenaEyes cy={49} gap={10} scale={0.95} />
      <path
        d="M44 26H52V54H44Z"
        fill="#B6CDF3"
        stroke={ARENA_OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M40 57Q48 60 56 57"
        fill="none"
        stroke={ARENA_EYE}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </g>
  );
}
