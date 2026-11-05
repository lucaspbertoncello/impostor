import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';

type PartyEyesProps = {
  left: number;
  right?: number;
  y: number;
  radius?: number;
};

/** The same pair of eyes on every animal: white eye, dark pupil looking down-right. */
export function PartyEyes({ left, right, y, radius = 5.5 }: PartyEyesProps) {
  return (
    <g>
      {[left, right]
        .filter((x): x is number => x !== undefined)
        .map((x) => (
          <g key={x}>
            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="#FFFFFF"
              stroke={PARTY_COLORS.ink}
              strokeWidth="2"
            />
            <circle
              cx={x + radius * 0.15}
              cy={y + radius * 0.2}
              r={radius * 0.52}
              fill={PARTY_COLORS.ink}
            />
          </g>
        ))}
    </g>
  );
}
