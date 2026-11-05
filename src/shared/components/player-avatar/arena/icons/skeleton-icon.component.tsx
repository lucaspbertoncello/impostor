import {
  ARENA_EYE,
  ARENA_OUTLINE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';

const SKULL =
  'M20 44C20 29 31 22 48 22C65 22 76 29 76 44C76 52 72 56 68 58V66C68 70 64 71 62 71H34C32 71 28 70 28 66V58C24 56 20 52 20 44Z';

/** Position 5: cream skeleton with glowing eyes. */
export function SkeletonIcon() {
  return (
    <g>
      <ArenaBody fill="#4D5A82" shade="#2C3558" />
      <path
        d="M36 72Q48 76 60 72M36 78Q48 82 60 78"
        fill="none"
        stroke="#F3EBCF"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <ShadedShape d={SKULL} fill="#F5EBCB" shade="#C9B98C" />
      <Gloss cx={35} cy={32} rx={9} ry={4} opacity={0.6} />
      <ellipse cx="37" cy="46" rx="8" ry="8.6" fill={ARENA_EYE} />
      <ellipse cx="59" cy="46" rx="8" ry="8.6" fill={ARENA_EYE} />
      <circle cx="38" cy="47" r="2.8" fill="#FF6A4D" />
      <circle cx="60" cy="47" r="2.8" fill="#FF6A4D" />
      <path d="M48 54L43.5 61H52.5Z" fill={ARENA_EYE} strokeLinejoin="round" />
      <path d="M34 66H62" stroke={ARENA_OUTLINE} strokeWidth="2.6" />
      <path d="M40 62V70M48 62V70M56 62V70" stroke={ARENA_OUTLINE} strokeWidth="2.6" />
      <path
        d="M56 24L52 30L58 34"
        fill="none"
        stroke="#A8996E"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
