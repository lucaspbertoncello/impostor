// Fredoka 700 averages about 0.5 em per character (measured on the font file: 0.46 to 0.52 for
// pt-BR words, 0.81 for "M"). 0.56 keeps a margin; space is narrower.
const CHAR_WIDTH_EM = 0.56;
const SPACE_WIDTH_EM = 0.3;

/** Text area width as a share of the card width (`cqw`), after the side padding. */
const TEXT_AREA_CQW = 84;
const MAX_SIZE_CQW = 22;
const MIN_SIZE_CQW = 9;
const SIZE_STEP_CQW = 0.5;
const MAX_LINES = 2;

function countLines(words: string[], sizeCqw: number): number {
  const maxWidthEm = TEXT_AREA_CQW / sizeCqw;
  let lines = 1;
  let lineWidthEm = 0;

  for (const word of words) {
    const wordWidthEm = word.length * CHAR_WIDTH_EM;
    if (lineWidthEm === 0) {
      lineWidthEm = wordWidthEm;
    } else if (lineWidthEm + SPACE_WIDTH_EM + wordWidthEm <= maxWidthEm) {
      lineWidthEm += SPACE_WIDTH_EM + wordWidthEm;
    } else {
      lines += 1;
      lineWidthEm = wordWidthEm;
    }
  }
  return lines;
}

/**
 * Biggest font size (in `cqw`, a share of the card width) at which the word fits in two lines
 * without cutting. A single word longer than the area shrinks down to the minimum.
 */
export function fitPartyCardWord(word: string): number {
  const words = word.trim().split(/\s+/).filter(Boolean);

  for (let size = MAX_SIZE_CQW; size > MIN_SIZE_CQW; size -= SIZE_STEP_CQW) {
    const longestWordEm = Math.max(...words.map((item) => item.length), 1) * CHAR_WIDTH_EM;
    if (longestWordEm * size <= TEXT_AREA_CQW && countLines(words, size) <= MAX_LINES) return size;
  }
  return MIN_SIZE_CQW;
}
