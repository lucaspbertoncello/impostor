import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';

const FLUFF = [
  { x: 28, y: 46, r: 14 },
  { x: 40, y: 32, r: 15 },
  { x: 58, y: 32, r: 15 },
  { x: 70, y: 46, r: 14 },
  { x: 67, y: 63, r: 14 },
  { x: 48, y: 69, r: 16 },
  { x: 29, y: 63, r: 14 },
  { x: 48, y: 50, r: 22 },
];

export function PartySheep() {
  const { white, indigo, coral } = PARTY_COLORS;
  return (
    <g>
      <g fill={white.shade} stroke={white.shade} strokeWidth="7">
        {FLUFF.map((puff) => (
          <circle key={`${puff.x}-${puff.y}`} cx={puff.x} cy={puff.y} r={puff.r} />
        ))}
      </g>
      <g fill={white.base}>
        {FLUFF.map((puff) => (
          <circle key={`${puff.x}-${puff.y}`} cx={puff.x} cy={puff.y} r={puff.r} />
        ))}
      </g>
      <ellipse cx="30" cy="57" rx="5" ry="9" transform="rotate(30 30 57)" fill={indigo.shade} />
      <ellipse cx="66" cy="57" rx="5" ry="9" transform="rotate(-30 66 57)" fill={indigo.shade} />
      <ellipse cx="48" cy="56" rx="14" ry="17" fill={indigo.shade} />
      <PartyEyes left={41} right={55} y={52} radius={5} />
      <ellipse cx="48" cy="62" rx="3.5" ry="2.5" fill={coral.base} />
      <path
        d="M43 67 Q48 71 53 67"
        fill="none"
        stroke={white.base}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
