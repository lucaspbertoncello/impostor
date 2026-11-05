import { motion } from 'motion/react';

import { useResultMotion } from '#/features/match/result/hooks/use-result-motion.hook.ts';
import { getWordFontSize } from '#/features/match/result/utils/get-word-font-size.util.ts';

type PartyResultWordProps = {
  word: string;
  categoryName: string;
  /** Color of the category; the card takes it as background, like the answer card of a quiz. */
  categoryColor: string | null;
};

/**
 * Party: the answer reveal of a quiz. A colored card pops in with a springy overshoot, then the
 * category name rises under the word.
 */
export function PartyResultWord({ word, categoryName, categoryColor }: PartyResultWordProps) {
  const { reduced, delayOf } = useResultMotion();
  const delay = delayOf('word');

  return (
    <motion.section
      aria-labelledby="result-word-label"
      initial={reduced ? false : { opacity: 0, scale: 0.55, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 12 }}
      style={categoryColor === null ? undefined : { backgroundColor: categoryColor }}
      className={[
        'flex flex-col items-center gap-5 rounded-lg px-4 py-10 text-center shadow-[0_6px_0_rgb(0_0_0/0.32)]',
        categoryColor === null ? 'bg-primary text-text-on-primary' : 'bg-surface text-white',
      ].join(' ')}
    >
      <p
        id="result-word-label"
        className="rounded-lg bg-black/25 px-4 py-1.5 font-display text-[18px] leading-none font-bold"
      >
        A palavra é
      </p>
      <div className="@container w-full">
        <p
          className="font-display leading-[1.1] font-bold break-words"
          style={{ fontSize: getWordFontSize(word, 'party') }}
        >
          {word}
        </p>
      </div>
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.35, duration: 0.3, ease: 'easeOut' }}
        className="rounded-lg bg-black/25 px-4 py-2 text-[18px] leading-tight font-bold"
      >
        {categoryName}
      </motion.p>
    </motion.section>
  );
}
