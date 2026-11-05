import {
  ARENA_EYE,
  ARENA_OUTLINE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaBody } from '#/shared/components/player-avatar/arena/parts/arena-body.component.tsx';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';
import { ellipsePath } from '#/shared/components/player-avatar/arena/utils/ellipse-path.util.ts';

const HEAD = ellipsePath(48, 47, 27, 22);

/** Position 6: little red dragon with horns, wings and an orange snout. */
export function DragonIcon() {
  return (
    <g>
      <ShadedShape d="M24 50L2 30L8 54L3 70L26 68Z" fill="#C93A38" shade="#8F1F2E" />
      <ShadedShape d="M72 50L94 30L88 54L93 70L70 68Z" fill="#C93A38" shade="#8F1F2E" />
      <ArenaBody fill="#E94B3C" shade="#A62A2E" />
      <path
        d="M38 69H58V84H38Z"
        fill="#FFC27A"
        stroke={ARENA_OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <ShadedShape d="M30 28L24 6L44 22Z" fill="#FFF0C9" shade="#D2B77E" />
      <ShadedShape d="M66 28L72 6L52 22Z" fill="#FFF0C9" shade="#D2B77E" />
      <ShadedShape d={HEAD} fill="#F2584A" shade="#A62A2E" />
      <Gloss cx={34} cy={33} rx={9} ry={4} />
      <ShadedShape d={ellipsePath(48, 58, 17, 11)} fill="#FFA466" shade="#D9703A" outline={4.5} />
      <ellipse cx="42" cy="56" rx="2.2" ry="3" fill={ARENA_EYE} />
      <ellipse cx="54" cy="56" rx="2.2" ry="3" fill={ARENA_EYE} />
      <ArenaEyes cy={42} gap={13} variant="light" sclera="#FFE45C" tilt={14} scale={0.9} />
      <path d="M28 33L43 38M68 33L53 38" stroke={ARENA_EYE} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}
