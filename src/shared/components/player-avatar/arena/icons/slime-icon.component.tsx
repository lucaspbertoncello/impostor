import { ARENA_EYE } from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';
import { ArenaEyes } from '#/shared/components/player-avatar/arena/parts/arena-eyes.component.tsx';
import { Gloss } from '#/shared/components/player-avatar/arena/parts/gloss.component.tsx';
import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';

const BLOB =
  'M12 68C8 44 22 26 48 24C74 26 88 44 84 68C84 80 74 82 68 80C64 86 56 84 54 80C48 86 40 84 38 80C32 84 24 82 20 80C14 80 12 76 12 68Z';

/** Position 14: turquoise slime blob with a soft peak and big eyes. */
export function SlimeIcon() {
  return (
    <g>
      <ShadedShape d="M38 28C38 16 50 14 50 6C58 12 60 22 58 28Z" fill="#46DCC6" shade="#1E9C96" />
      <ShadedShape d={BLOB} fill="#3FD8C4" shade="#1C9A98" />
      <Gloss cx={31} cy={40} rx={11} ry={5.5} opacity={0.6} />
      <circle cx="26" cy="66" r="4" fill="#FFFFFF" opacity="0.35" />
      <circle cx="70" cy="70" r="3" fill="#FFFFFF" opacity="0.35" />
      <circle cx="64" cy="38" r="2.4" fill="#FFFFFF" opacity="0.45" />
      <ArenaEyes cy={52} gap={12} scale={1.2} />
      <path
        d="M42 66Q48 71 54 66"
        fill="none"
        stroke={ARENA_EYE}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}
