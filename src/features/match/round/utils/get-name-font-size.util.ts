import type { ThemeName } from '#/shared/types/theme-name.type.ts';

const MAX_SIZE_PX = 36;
const MIN_SIZE_PX = 20;
/** Average glyph width in em: Arena lettering is uppercase and wide. */
const GLYPH_WIDTH_EM: Record<ThemeName, number> = { arena: 0.8, party: 0.66 };

/**
 * CSS font size that keeps the name on one line inside the nearest `@container`: as big as
 * `MAX_SIZE_PX`, shrinking by container width (`cqw`) for long names, never below `MIN_SIZE_PX`.
 */
export function getNameFontSize(name: string, theme: ThemeName): string {
  const widthEm = Math.max(name.length, 1) * GLYPH_WIDTH_EM[theme];
  const containerWidthPercent = (100 / widthEm).toFixed(2);

  return `clamp(${String(MIN_SIZE_PX)}px, ${containerWidthPercent}cqw, ${String(MAX_SIZE_PX)}px)`;
}
