// Width the lettering can use, in cqw (percent of the card width), and the font-size limits.
const USABLE_WIDTH = 66;
const MAX_FONT_SIZE = 17;
const MIN_FONT_SIZE = 8.5;
// Average width of an uppercase Lilita One letter, in em.
const LETTER_WIDTH = 0.62;

/**
 * Font size (in cqw) that fits `text` in at most two lines: the longest word must fit one line
 * and the whole text must fit two. Short words get the big size.
 */
export function getWordFontSize(text: string): number {
  const trimmed = text.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const longestWord = Math.max(0, ...words.map((word) => word.length));
  const lineChars = Math.max(longestWord, Math.ceil(trimmed.length / 2), 1);
  const size = USABLE_WIDTH / (lineChars * LETTER_WIDTH);
  return Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, Math.round(size * 10) / 10));
}
