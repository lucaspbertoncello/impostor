import {
  ARENA_EYE,
  ARENA_SKIN,
  ARENA_SKIN_SHADE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';

const HEAD = ellipsePath(48, 46, 26, 23);

/** Position 15: saffron monk with a bald head, calm eyes and prayer beads. */
export function MonkIcon() {
  return (
    <g>
      <ArenaBody fill="#F08A24" shade="#B85A0E" />
      <ShadedShape
        d="M34 66L48 84L62 66Z"
        fill={ARENA_SKIN}
        shade={ARENA_SKIN_SHADE}
        outline={4.5}
      />
      <path
        d="M36 68Q48 86 60 68"
        fill="none"
        stroke="#7A4A22"
        strokeWidth="4.5"
        strokeDasharray="0.1 6.2"
        strokeLinecap="round"
      />
      <ShadedShape
        d={ellipsePath(21, 48, 5, 7)}
        fill={ARENA_SKIN}
        shade={ARENA_SKIN_SHADE}
        outline={4.5}
      />
      <ShadedShape
        d={ellipsePath(75, 48, 5, 7)}
        fill={ARENA_SKIN}
        shade={ARENA_SKIN_SHADE}
        outline={4.5}
      />
      <ShadedShape d={HEAD} fill={ARENA_SKIN} shade={ARENA_SKIN_SHADE} />
      <Gloss cx={36} cy={30} rx={11} ry={5} opacity={0.4} />
      <path
        d="M31 46Q37 41 43 46M53 46Q59 41 65 46"
        fill="none"
        stroke={ARENA_EYE}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M30 37Q37 33 44 36M52 36Q59 33 66 37"
        fill="none"
        stroke="#8A5A33"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="31" cy="55" r="3.6" fill="#FF8FA8" opacity="0.6" />
      <circle cx="65" cy="55" r="3.6" fill="#FF8FA8" opacity="0.6" />
      <path
        d="M41 58Q48 64 55 58"
        fill="none"
        stroke={ARENA_EYE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="48" cy="33" r="2.2" fill="#E5484D" />
    </g>
  );
}
