import {
  ARENA_EYE,
  ARENA_OUTLINE,
  ARENA_SKIN,
  ARENA_SKIN_SHADE,
  ARENA_WHITE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';
import { roundRectPath } from '#/shared/components/player-avatar/arena/utils/round-rect-path.util.ts';

const HEAD = ellipsePath(48, 50, 25, 21);

/** Position 2: purple wizard with a long white beard and a starred hat. */
export function WizardIcon() {
  return (
    <g>
      <ArenaBody fill="#7A4FD6" shade="#4B2E9A" />
      <ShadedShape d={HEAD} fill={ARENA_SKIN} shade={ARENA_SKIN_SHADE} />
      <ShadedShape
        d="M22 52C22 72 34 84 48 85C62 84 74 72 74 52C66 60 58 62 48 62C38 62 30 60 22 52Z"
        fill="#F8F5EE"
        shade="#B9B2CE"
      />
      <ellipse
        cx="48"
        cy="55"
        rx="7"
        ry="5"
        fill="#F4B08C"
        stroke={ARENA_OUTLINE}
        strokeWidth="4"
      />
      <ShadedShape
        d="M24 52Q36 58 48 56Q60 58 72 52Q62 66 48 62Q34 66 24 52Z"
        fill="#FFFFFF"
        shade="#CFC9E0"
        outline={4}
      />
      <ellipse cx="38" cy="47" rx="3.6" ry="4.6" fill={ARENA_EYE} />
      <ellipse cx="58" cy="47" rx="3.6" ry="4.6" fill={ARENA_EYE} />
      <circle cx="37" cy="45.5" r="1.4" fill={ARENA_WHITE} />
      <circle cx="57" cy="45.5" r="1.4" fill={ARENA_WHITE} />
      <path
        d="M31 41Q38 37 44 41M52 41Q58 37 65 41"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ShadedShape
        d="M30 34C34 22 38 12 44 6C50 2 58 4 58 10C54 12 54 18 58 24C62 28 66 31 68 34Z"
        fill="#8F63E8"
        shade="#5230A8"
      />
      <ShadedShape d={roundRectPath(14, 30, 68, 10, 5)} fill="#8F63E8" shade="#5230A8" />
      <path d="M31 31H67" stroke="#F2C14E" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M48 17L50 21L54.5 21.5L51 24.5L52 29L48 26.5L44 29L45 24.5L41.5 21.5L46 21Z"
        fill="#F2C14E"
        stroke={ARENA_OUTLINE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </g>
  );
}
