// Card-only colors, from the Party logo and `research/party theme/party theme references.md`.
// They live here (not in the theme tokens) because only the card uses them.
export const PARTY_CARD_COLORS = {
  ink: '#1A1650',
  indigo: '#2A2480',
  indigoLight: '#3D35A8',
  edge: '#14103E',
  coral: '#FF5A5F',
  sun: '#FFC21A',
  cream: '#FFF4D6',
  white: '#FFFFFF',
} as const;

/** Card proportion (width / height), shared by both faces so neither gives a hint from afar. */
export const PARTY_CARD_ASPECT = '5 / 7';

/** Solid shadow, no blur: the card "stands" on its own edge, like the Party buttons. */
export const PARTY_CARD_EDGE_SHADOW = `0 8px 0 ${PARTY_CARD_COLORS.edge}`;
