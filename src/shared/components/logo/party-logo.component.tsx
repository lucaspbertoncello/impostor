import {
  PARTY_BLOCK_LETTER_PATH,
  PARTY_WORD_AFTER_BLOCK_PATH,
  PARTY_WORD_BEFORE_BLOCK_PATH,
  PARTY_WORD_PATH,
} from '#/shared/components/logo/party/party-logo-paths.constant.ts';

type PartyLogoProps = {
  variant: 'on-dark' | 'on-light';
  className?: string;
  title?: string;
};

const INDIGO = '#2A2480';
const CORAL = '#FF5A5F';
const WHITE = '#FFFFFF';
const LIGHT_WORD = '#F4F2FF';
const BLOCK_TRANSFORM = 'rotate(8 492.5 104.8)';

function ColorBlock({ withSticker }: { withSticker: boolean }) {
  return (
    <g transform={BLOCK_TRANSFORM}>
      {withSticker ? (
        <rect
          x="440.5"
          y="52.8"
          width="104"
          height="104"
          rx="26"
          fill={WHITE}
          stroke={WHITE}
          strokeWidth="12"
          strokeLinejoin="round"
        />
      ) : null}
      <rect x="440.5" y="52.8" width="104" height="104" rx="26" fill={CORAL} />
      <path d={PARTY_BLOCK_LETTER_PATH} fill={WHITE} />
    </g>
  );
}

// Drawing copied from design/assets/logo/party.svg (on-light) and party light.svg (on-dark);
// the text is outlines, no font needed.
export function PartyLogo({ variant, className, title = 'Impostor' }: PartyLogoProps) {
  const onLight = variant === 'on-light';

  return (
    <svg
      viewBox={onLight ? '1 27 639 156' : '7 33 626 144'}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {onLight ? (
        <>
          <path
            d={PARTY_WORD_BEFORE_BLOCK_PATH}
            fill={WHITE}
            stroke={WHITE}
            strokeWidth="11"
            strokeLinejoin="round"
          />
          <ColorBlock withSticker />
          <path
            d={PARTY_WORD_AFTER_BLOCK_PATH}
            fill={WHITE}
            stroke={WHITE}
            strokeWidth="11"
            strokeLinejoin="round"
          />
          <path d={PARTY_WORD_PATH} fill={INDIGO} />
        </>
      ) : (
        <>
          <ColorBlock withSticker={false} />
          <path d={PARTY_WORD_PATH} fill={LIGHT_WORD} />
        </>
      )}
    </svg>
  );
}
