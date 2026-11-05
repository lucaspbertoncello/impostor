import {
  ARENA_EYE,
  ARENA_OUTLINE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';

const FACE = ellipsePath(48, 50, 24, 20);

/** Position 9: cyan fairy with wings, pointed ears and a star. */
export function FairyIcon() {
  return (
    <g>
      <ShadedShape d="M30 46C8 42 0 24 8 14C22 12 32 26 36 44Z" fill="#B5F3F7" shade="#5FCBDC" />
      <ShadedShape d="M66 46C88 42 96 24 88 14C74 12 64 26 60 44Z" fill="#B5F3F7" shade="#5FCBDC" />
      <ShadedShape d="M30 56C14 56 8 66 14 74C24 74 30 66 34 58Z" fill="#B5F3F7" shade="#5FCBDC" />
      <ShadedShape d="M66 56C82 56 88 66 82 74C72 74 66 66 62 58Z" fill="#B5F3F7" shade="#5FCBDC" />
      <ArenaBody fill="#58D68A" shade="#2C9A5C" />
      <ShadedShape d={ellipsePath(48, 44, 31, 26)} fill="#2FD0E0" shade="#118DAE" />
      <ShadedShape d="M24 50L12 44L22 58Z" fill="#FFDDC9" shade="#E8A98A" outline={4} />
      <ShadedShape d="M72 50L84 44L74 58Z" fill="#FFDDC9" shade="#E8A98A" outline={4} />
      <ShadedShape d={FACE} fill="#FFDDC9" shade="#EDAA8A" />
      <ShadedShape
        d="M23 48C23 30 36 24 48 24C60 24 73 30 73 48C65 38 57 38 48 44C39 38 31 38 23 48Z"
        fill="#3BDCE8"
        shade="#118DAE"
      />
      <Gloss cx={36} cy={29} rx={8} ry={3.4} opacity={0.6} />
      <ArenaEyes cy={52} gap={10} scale={1.05} />
      <circle cx="33" cy="60" r="3.6" fill="#FF8FA8" opacity="0.7" />
      <circle cx="63" cy="60" r="3.6" fill="#FF8FA8" opacity="0.7" />
      <path
        d="M44 62Q48 65 52 62"
        fill="none"
        stroke={ARENA_EYE}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M72 8L74.5 14L81 14.5L76 18.5L77.5 25L72 21.5L66.5 25L68 18.5L63 14.5L69.5 14Z"
        fill="#FFE45C"
        stroke={ARENA_OUTLINE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </g>
  );
}
