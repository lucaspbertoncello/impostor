import {
  ARENA_EYE,
  ARENA_WHITE,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';

type ArenaEyesProps = {
  cy: number;
  gap?: number;
  scale?: number;
  /** `dark`: big glossy dark eyes; `light`: white of the eye with a pupil. */
  variant?: 'dark' | 'light';
  sclera?: string;
  /** Degrees; positive tilts the outer corners up (angry), negative down. */
  tilt?: number;
};

/** The pair of eyes shared by every character (same size family, same glint). */
export function ArenaEyes({
  cy,
  gap = 10,
  scale = 1,
  variant = 'dark',
  sclera = ARENA_WHITE,
  tilt = 0,
}: ArenaEyesProps) {
  return (
    <g>
      {[-1, 1].map((side) => (
        <g
          key={side}
          transform={`translate(${48 + side * gap} ${cy}) rotate(${-side * tilt}) scale(${scale})`}
        >
          {variant === 'dark' ? (
            <>
              <ellipse rx="4.6" ry="6" fill={ARENA_EYE} />
              <circle cx="-1.4" cy="-2.2" r="1.9" fill="#FFFFFF" />
              <circle cx="1.4" cy="2.2" r="0.9" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <ellipse rx="6" ry="6.4" fill={sclera} stroke={ARENA_EYE} strokeWidth="2.5" />
              <ellipse cx={-side * 1.2} cy="0.4" rx="3" ry="3.8" fill={ARENA_EYE} />
              <circle cx={-side * 1.2 - 1} cy="-1" r="1.1" fill="#FFFFFF" />
            </>
          )}
        </g>
      ))}
    </g>
  );
}
