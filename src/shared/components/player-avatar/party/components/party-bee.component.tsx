import { PartyEyes } from '#/shared/components/player-avatar/party/components/party-eyes.component.tsx';
import { PartyShade } from '#/shared/components/player-avatar/party/components/party-shade.component.tsx';
import { PARTY_COLORS } from '#/shared/components/player-avatar/party/constants/party-palette.constant.ts';
import { outline } from '#/shared/components/player-avatar/party/utils/outline.util.ts';
import { useId } from 'react';

export function PartyBee() {
  const { yellow, indigo, white, ink } = PARTY_COLORS;
  const clipId = useId();
  return (
    <g>
      <ellipse
        cx="30"
        cy="25"
        rx="10"
        ry="17"
        transform="rotate(-28 30 25)"
        fill={white.base}
        {...outline(white.shade)}
      />
      <ellipse
        cx="66"
        cy="25"
        rx="10"
        ry="17"
        transform="rotate(28 66 25)"
        fill={white.base}
        {...outline(white.shade)}
      />
      <path
        d="M44 30 L40 14 M52 30 L56 14"
        fill="none"
        stroke={indigo.shade}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="40" cy="13" r="3.5" fill={indigo.shade} />
      <circle cx="56" cy="13" r="3.5" fill={indigo.shade} />
      <path d="M43 77 L48 87 L53 77Z" fill={indigo.shade} {...outline(indigo.shade)} />
      <ellipse cx="48" cy="52" rx="28" ry="26" fill={yellow.base} {...outline(yellow.shade)} />
      <clipPath id={clipId}>
        <ellipse cx="48" cy="52" rx="28" ry="26" />
      </clipPath>
      <g clipPath={`url(#${clipId})`} fill={indigo.shade}>
        <rect x="10" y="59" width="76" height="7" />
        <rect x="10" y="70" width="76" height="7" />
      </g>
      <PartyShade cx={48} cy={52} rx={28} ry={26} color={yellow.shade} />
      <PartyEyes left={38} right={58} y={42} />
      <path
        d="M43 52 Q48 56 53 52"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}
