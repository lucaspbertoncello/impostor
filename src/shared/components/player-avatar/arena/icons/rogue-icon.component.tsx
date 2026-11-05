import { ARENA_EYE } from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';
import { roundRectPath } from '#/shared/components/player-avatar/arena/utils/round-rect-path.util.ts';

const HEAD = ellipsePath(48, 47, 28, 23);

/** Position 7: charcoal rogue with a hood, a masked face and a red scarf. */
export function RogueIcon() {
  return (
    <g>
      <ArenaBody fill="#565C78" shade="#2F3348" />
      <ShadedShape
        d="M60 68L80 66L84 80L72 76L60 80Z"
        fill="#E5484D"
        shade="#A02437"
        outline={4.5}
      />
      <ShadedShape d="M28 30C26 14 40 8 62 6C56 12 58 20 68 30Z" fill="#565C78" shade="#2F3348" />
      <ShadedShape d={HEAD} fill="#5B6280" shade="#2F3348" />
      <Gloss cx={34} cy={32} rx={9} ry={4} opacity={0.35} />
      <ShadedShape
        d={roundRectPath(25, 38, 46, 17, 8)}
        fill="#F0BC91"
        shade="#C98A5F"
        outline={4.5}
      />
      <ArenaEyes cy={46.5} gap={11} variant="light" scale={0.72} tilt={12} />
      <path
        d="M27 38L44 44M69 38L52 44"
        stroke={ARENA_EYE}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <ShadedShape
        d="M23 55C32 66 64 66 73 55V62C66 74 30 74 23 62Z"
        fill="#3C4058"
        shade="#23263A"
        outline={4.5}
      />
      <ShadedShape
        d="M30 66C38 74 58 74 66 66L64 76C58 82 38 82 32 76Z"
        fill="#E5484D"
        shade="#A02437"
        outline={4.5}
      />
    </g>
  );
}
