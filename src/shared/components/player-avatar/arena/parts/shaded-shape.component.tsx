import { useId } from 'react';

import {
  ARENA_LIGHT_OFFSET,
  ARENA_OUTLINE,
  ARENA_OUTLINE_WIDTH,
} from '#/shared/components/player-avatar/arena/constants/arena-icon-palette.constant.ts';

type ShadedShapeProps = {
  d: string;
  fill: string;
  shade: string;
  /** Outline weight; 0 draws no outline. */
  outline?: number;
};

/** A flat shape with a shaded lower-right edge (light from the top-left) and a thick dark outline. */
export function ShadedShape({ d, fill, shade, outline = ARENA_OUTLINE_WIDTH }: ShadedShapeProps) {
  const clipId = `arena-clip-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <g>
      <clipPath id={clipId}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d={d} fill={shade} />
        <path
          d={d}
          fill={fill}
          transform={`translate(${ARENA_LIGHT_OFFSET.x} ${ARENA_LIGHT_OFFSET.y})`}
        />
      </g>
      {outline > 0 ? (
        <path
          d={d}
          fill="none"
          stroke={ARENA_OUTLINE}
          strokeWidth={outline}
          strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
}
