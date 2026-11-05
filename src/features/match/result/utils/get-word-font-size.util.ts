import type { ThemeName } from '#/shared/types/theme-name.type.ts';

const MIN_SIZE_PX = 24;
/** Average glyph width in em: Arena lettering is uppercase and wide. */
const GLYPH_WIDTH_EM: Record<ThemeName, number> = { arena: 0.78, party: 0.64 };

function getMaxSizePx(word: string): number {
  if (word.length <= 10) return 56;
  if (word.length <= 22) return 44;
  return 34;
}

/**
 * CSS font size for the big word: shorter words get bigger lettering, and the longest single
 * token never overflows the nearest `@container` (`cqw` is a share of its width), so a word is
 * never cut or broken in the middle.
 */
export function getWordFontSize(word: string, theme: ThemeName): string {
  const longestToken = Math.max(...word.split(/\s+/).map((token) => token.length), 1);
  const widthPercent = (100 / (longestToken * GLYPH_WIDTH_EM[theme])).toFixed(2);

  return `clamp(${String(MIN_SIZE_PX)}px, ${widthPercent}cqw, ${String(getMaxSizePx(word))}px)`;
}
