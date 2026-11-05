import {
  ARENA_EYE,
  ARENA_OUTLINE,
  ARENA_WHITE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';
import { roundRectPath } from '#/shared/components/player-avatar/arena/utils/round-rect-path.util.ts';

const HEAD = ellipsePath(48, 46, 26, 21);

/** Position 8: dwarf blacksmith with a bronze helmet and a big braided beard. */
export function DwarfIcon() {
  return (
    <g>
      <ArenaBody fill="#8F5A33" shade="#5A3418" />
      <ShadedShape d={HEAD} fill="#EDA77A" shade="#C77B50" />
      <ShadedShape
        d="M19 48C19 72 32 86 48 86C64 86 77 72 77 48C69 58 59 60 48 60C37 60 27 58 19 48Z"
        fill="#E8A630"
        shade="#B1701A"
      />
      <path
        d="M36 70Q48 78 60 70"
        fill="none"
        stroke="#B1701A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ShadedShape
        d="M31 56Q40 50 48 54Q56 50 65 56Q56 64 48 60Q40 64 31 56Z"
        fill="#F2BC4A"
        shade="#C98420"
        outline={4}
      />
      <ellipse
        cx="48"
        cy="51"
        rx="7"
        ry="6"
        fill="#F4A98A"
        stroke={ARENA_OUTLINE}
        strokeWidth="3.5"
      />
      <ellipse cx="38" cy="44" rx="3.4" ry="4.4" fill={ARENA_EYE} />
      <ellipse cx="58" cy="44" rx="3.4" ry="4.4" fill={ARENA_EYE} />
      <circle cx="37" cy="42.6" r="1.3" fill={ARENA_WHITE} />
      <circle cx="57" cy="42.6" r="1.3" fill={ARENA_WHITE} />
      <path
        d="M30 38Q37 34 44 38M52 38Q59 34 66 38"
        fill="none"
        stroke="#B1701A"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <ShadedShape d="M22 38C22 18 34 12 48 12C62 12 74 18 74 38Z" fill="#E8A630" shade="#B1701A" />
      <Gloss cx={36} cy={22} rx={8} ry={3.6} />
      <ShadedShape
        d={roundRectPath(17, 33, 62, 9, 4.5)}
        fill="#B97A2C"
        shade="#7E4B16"
        outline={4.5}
      />
      <circle cx="30" cy="37.5" r="1.8" fill="#F2C14E" />
      <circle cx="48" cy="37.5" r="1.8" fill="#F2C14E" />
      <circle cx="66" cy="37.5" r="1.8" fill="#F2C14E" />
    </g>
  );
}
