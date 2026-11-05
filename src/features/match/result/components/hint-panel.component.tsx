import { motion } from 'motion/react';

import { useResultMotion } from '#/features/match/result/hooks/use-result-motion.hook.ts';

type HintPanelProps = { hint: string };

/** RF-RES-001: the hint the impostor received. The caller only renders it when the hint was on. */
export function HintPanel({ hint }: HintPanelProps) {
  const { reduced, delayOf } = useResultMotion();

  return (
    <motion.section
      aria-labelledby="result-hint-label"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delayOf('hint'), duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-2 rounded-md bg-surface-strong px-4 py-4 arena:shadow-card party:shadow-panel"
    >
      <p
        id="result-hint-label"
        className="text-[16px] leading-tight font-bold tracking-wide text-text-muted uppercase"
      >
        Dica do impostor
      </p>
      <p className="text-[22px] leading-snug font-bold break-words">{hint}</p>
    </motion.section>
  );
}
