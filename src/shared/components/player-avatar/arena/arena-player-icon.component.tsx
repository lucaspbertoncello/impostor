import type { PlayerIconProps } from '#/shared/components/player-avatar/player-icon-props.type.ts';

// Stub: a circle with the number. The real arena icons replace the drawing and keep the props.
export function ArenaPlayerIcon({ index, size = 48, title }: PlayerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      data-icon="arena"
    >
      <circle cx="24" cy="24" r="22" fill="#1f3a8a" stroke="#d4a017" strokeWidth="3" />
      <text x="24" y="30" textAnchor="middle" fontSize="18" fontWeight="700" fill="#ffffff">
        {index}
      </text>
    </svg>
  );
}
