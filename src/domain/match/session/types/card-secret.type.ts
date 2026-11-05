/**
 * What the face of one card shows, only while it is held (BR-MAT-045). Same shape as the card front props.
 * The impostor never gets the category color: it would hint at the category (RF-REV-008).
 */
export type CardSecret =
  { role: 'crew'; word: string; accentColor?: string } | { role: 'impostor'; hint?: string };
