import { ARENA_EYE } from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';
import { roundRectPath } from '#/shared/components/player-avatar/arena/utils/round-rect-path.util.ts';

const HEAD = roundRectPath(18, 24, 60, 46, 10);

/** Position 12: grey stone golem with glowing eyes and moss. */
export function GolemIcon() {
  return (
    <g>
      <ShadedShape d={ellipsePath(20, 74, 13, 11)} fill="#9AA3B2" shade="#5F6878" />
      <ShadedShape d={ellipsePath(76, 74, 13, 11)} fill="#9AA3B2" shade="#5F6878" />
      <ArenaBody fill="#7E8798" shade="#4C5565" />
      <ShadedShape d={HEAD} fill="#AEB6C4" shade="#6B7384" />
      <Gloss cx={32} cy={33} rx={9} ry={4} opacity={0.45} />
      <ShadedShape d="M22 36H74V42H22Z" fill="#8A93A4" shade="#5F6878" outline={4} />
      <rect x="29" y="44" width="14" height="9" rx="2" fill={ARENA_EYE} />
      <rect x="53" y="44" width="14" height="9" rx="2" fill={ARENA_EYE} />
      <rect x="32" y="46" width="8" height="5" rx="1.5" fill="#5CF0FF" />
      <rect x="56" y="46" width="8" height="5" rx="1.5" fill="#5CF0FF" />
      <path
        d="M34 62L40 58L46 63L52 58L58 62L63 59"
        fill="none"
        stroke={ARENA_EYE}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 26L56 33L62 36"
        fill="none"
        stroke="#5F6878"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ShadedShape
        d="M24 26C26 16 40 14 46 20C50 14 60 16 62 24C54 22 36 26 24 26Z"
        fill="#6FCB4F"
        shade="#3F9A2C"
        outline={4.5}
      />
    </g>
  );
}
