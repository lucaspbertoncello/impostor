import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

const TENTACLES = [
  'M26 52 C10 62 12 80 28 80',
  'M48 58 C40 68 56 76 48 84',
  'M70 52 C86 62 84 80 68 80',
];

export function PartyOctopus() {
  const { indigo, coral, ink } = PARTY_COLORS;
  return (
    <g>
      <g fill="none" strokeLinecap="round" stroke={indigo.shade} strokeWidth="17">
        {TENTACLES.map((path) => (
          <path key={path} d={path} />
        ))}
      </g>
      <g fill="none" strokeLinecap="round" stroke={indigo.base} strokeWidth="10">
        {TENTACLES.map((path) => (
          <path key={path} d={path} />
        ))}
      </g>
      <ellipse cx="48" cy="38" rx="28" ry="26" fill={indigo.base} {...outline(indigo.shade)} />
      <PartyShade cx={48} cy={38} rx={28} ry={26} color={indigo.shade} />
      <circle cx="35" cy="22" r="3.5" fill={coral.base} />
      <circle cx="46" cy="17" r="3" fill={coral.base} />
      <circle cx="60" cy="22" r="3.5" fill={coral.base} />
      <PartyEyes left={38} right={58} y={40} />
      <path
        d="M43 51 Q48 56 53 51"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
