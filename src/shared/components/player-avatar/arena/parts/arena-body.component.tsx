import { ShadedShape } from '#/shared/components/player-avatar/arena/parts/shaded-shape.component.tsx';

type ArenaBodyProps = { fill: string; shade: string };

/** The shoulders every bust shares: same width, same height, so the set reads as one family. */
export function ArenaBody({ fill, shade }: ArenaBodyProps) {
  return <ShadedShape d="M18 85C18 71 31 65 48 65C65 65 78 71 78 85Z" fill={fill} shade={shade} />;
}
