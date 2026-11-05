import { motion } from 'motion/react';

import { useResultMotion } from '#/features/match/result/hooks/use-result-motion.hook.ts';
import { getWordFontSize } from '#/features/match/result/utils/get-word-font-size.util.ts';

type ArenaResultWordProps = { word: string };

/**
 * Arena: the end-of-match reward panel. The word slams in gold lettering over a slow sunburst, like
 * the prize of a mobile game. The Arena word is the name of a card, so there is no category line.
 */
export function ArenaResultWord({ word }: ArenaResultWordProps) {
  const { reduced, delayOf } = useResultMotion();

  return (
    <motion.section
      aria-labelledby="result-word-label"
      initial={reduced ? false : { opacity: 0, scale: 1.35 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delayOf('word'), type: 'spring', stiffness: 340, damping: 18 }}
      className="relative overflow-hidden rounded-lg bg-surface-strong px-4 py-10 text-center shadow-panel"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[220%] -translate-x-1/2 -translate-y-1/2 [background-image:repeating-conic-gradient(rgb(255_210_46/0.2)_0deg_7deg,transparent_7deg_14deg)] [mask-image:radial-gradient(circle,black_0%,transparent_62%)] motion-safe:animate-[spin_90s_linear_infinite]"
      />
      <div className="relative flex flex-col items-center gap-5">
        <p
          id="result-word-label"
          className="rounded-sm bg-primary px-4 py-1.5 font-display text-[18px] leading-none tracking-wide text-text-on-primary uppercase"
        >
          A palavra era
        </p>
        <div className="@container w-full">
          <p
            className="display-text leading-[1.05] break-words text-primary"
            style={{ fontSize: getWordFontSize(word, 'arena') }}
          >
            {word}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
