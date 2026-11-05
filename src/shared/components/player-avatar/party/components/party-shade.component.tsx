import { ellipseCrescentPath } from '#/shared/components/player-avatar/party/utils/ellipse-crescent-path.util.ts';

type PartyShadeProps = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: string;
};

export function PartyShade({ cx, cy, rx, ry, color }: PartyShadeProps) {
  return <path d={ellipseCrescentPath(cx, cy, rx, ry)} fill={color} />;
}
