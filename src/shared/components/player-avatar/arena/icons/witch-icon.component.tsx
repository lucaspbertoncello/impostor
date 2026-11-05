import {
  ARENA_EYE,
  ARENA_OUTLINE,
  ARENA_WHITE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';

const FACE = ellipsePath(48, 49, 25, 21);

/** Position 11: magenta witch with a bent hat, green skin and a wart. */
export function WitchIcon() {
  return (
    <g>
      <ShadedShape d="M21 40C12 58 12 74 20 82C24 72 28 62 32 50Z" fill="#3B1F5C" shade="#25123D" />
      <ShadedShape d="M75 40C84 58 84 74 76 82C72 72 68 62 64 50Z" fill="#3B1F5C" shade="#25123D" />
      <ArenaBody fill="#D63AA8" shade="#9A1C78" />
      <ShadedShape d={FACE} fill="#A6DB62" shade="#6FAA36" />
      <ArenaEyes cy={47} gap={10} variant="light" scale={0.8} tilt={10} sclera="#FFFFFF" />
      <path d="M27 38L42 43M69 38L54 43" stroke={ARENA_EYE} strokeWidth="4" strokeLinecap="round" />
      <path
        d="M48 49Q54 55 49 58Q45 55 48 49Z"
        fill="#84BD46"
        stroke={ARENA_OUTLINE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <circle cx="56" cy="52" r="1.8" fill="#4C7A22" />
      <path
        d="M36 62Q48 70 60 62Q48 65 36 62Z"
        fill={ARENA_EYE}
        stroke={ARENA_OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M45 64.5V68" stroke={ARENA_WHITE} strokeWidth="2.4" strokeLinecap="round" />
      <ShadedShape
        d="M30 34C34 24 40 16 50 11C58 8 68 4 78 8C70 10 68 16 70 22C72 28 74 32 72 34Z"
        fill="#E048B8"
        shade="#A02080"
      />
      <ShadedShape
        d="M10 34C10 28 28 26 48 26C68 26 86 28 86 34C86 40 68 42 48 42C28 42 10 40 10 34Z"
        fill="#E048B8"
        shade="#A02080"
      />
      <path d="M31 31H70" stroke="#3B1F5C" strokeWidth="5" strokeLinecap="round" />
      <rect
        x="45"
        y="27.5"
        width="9"
        height="7"
        rx="1.5"
        fill="#F2C14E"
        stroke={ARENA_OUTLINE}
        strokeWidth="2.2"
      />
    </g>
  );
}
