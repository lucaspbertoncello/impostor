import {
  ARENA_EYE,
  ARENA_OUTLINE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { roundRectPath } from '#/shared/components/player-avatar/arena/utils/round-rect-path.util.ts';

const HEAD = 'M16 42C16 28 26 22 48 22C70 22 80 28 80 42V58C80 68 70 73 48 73C26 73 16 68 16 58Z';

/** Position 10: rust-orange ogre with a square jaw and two tusks. */
export function OgreIcon() {
  return (
    <g>
      <ArenaBody fill="#7D4F2E" shade="#4C2D16" />
      <path
        d="M32 68L36 76M48 70V80M64 68L60 76"
        stroke="#F3E6C4"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ShadedShape d="M30 28L34 12L42 24L50 8L56 24L66 14L66 28Z" fill="#5A3417" shade="#3A200E" />
      <ShadedShape d={HEAD} fill="#E6833A" shade="#A84F18" />
      <Gloss cx={32} cy={32} rx={9} ry={4} />
      <ShadedShape d="M19 35L77 35L74 43L22 43Z" fill="#B85E24" shade="#8A3E14" outline={4.5} />
      <ArenaEyes cy={50} gap={12} variant="light" scale={0.66} tilt={-6} sclera="#FFE9A0" />
      <ellipse
        cx="48"
        cy="58"
        rx="6"
        ry="4"
        fill="#C9692A"
        stroke={ARENA_OUTLINE}
        strokeWidth="3.2"
      />
      <path d={roundRectPath(26, 61, 44, 8, 3)} fill={ARENA_EYE} />
      <ShadedShape d="M28 68L33 52L40 68Z" fill="#FFF3D1" shade="#D9C28A" outline={4} />
      <ShadedShape d="M56 68L63 52L68 68Z" fill="#FFF3D1" shade="#D9C28A" outline={4} />
    </g>
  );
}
