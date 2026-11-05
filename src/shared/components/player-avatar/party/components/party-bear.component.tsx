import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';

export function PartyBear() {
  const { white, coral, ink, mist } = PARTY_COLORS;
  return (
    <g>
      <circle cx="24" cy="29" r="12" fill={white.base} {...outline(white.shade)} />
      <circle cx="72" cy="29" r="12" fill={white.base} {...outline(white.shade)} />
      <circle cx="24" cy="30" r="6" fill={mist} />
      <circle cx="72" cy="30" r="6" fill={mist} />
      <circle cx="48" cy="54" r="31" fill={white.base} {...outline(white.shade)} />
      <PartyShade cx={48} cy={54} rx={31} ry={31} color={white.shade} />
      <ellipse cx="48" cy="64" rx="14" ry="10.5" fill={mist} />
      <PartyEyes left={35} right={61} y={48} />
      <ellipse cx="48" cy="60" rx="6" ry="4.2" fill={ink} />
      <path
        d="M48 64 L48 67 M42 68 Q48 73 54 68"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="26" cy="64" r="4.5" fill={coral.light} />
      <circle cx="70" cy="64" r="4.5" fill={coral.light} />
    </g>
  );
}
