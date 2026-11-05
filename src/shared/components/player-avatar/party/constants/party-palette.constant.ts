/**
 * Flat colors of the party player icons. Four families (yellow, indigo, coral, white) from the
 * logo, each with a base, a darker shade (also the outline and the light-side shade) and a light tone.
 * `ink` is the eye and nose color; `mist` is a pale lavender for muzzles and bellies.
 * The icon base indigo is lighter than the logo indigo (#2A2480) so it reads on the dark party background;
 * the logo indigo is the `shade` of that family.
 */
export const PARTY_COLORS = {
  yellow: { base: '#FFC21A', shade: '#C98A00', light: '#FFE08A' },
  indigo: { base: '#5448E0', shade: '#2A2480', light: '#8A80F5' },
  coral: { base: '#FF5A5F', shade: '#B8363D', light: '#FF9A9D' },
  white: { base: '#F4F2FF', shade: '#A9A1E6', light: '#FFFFFF' },
  ink: '#1A1650',
  mist: '#D8D3FB',
  cream: '#FFF3EE',
} as const;

export const PARTY_OUTLINE_WIDTH = 3.5;
