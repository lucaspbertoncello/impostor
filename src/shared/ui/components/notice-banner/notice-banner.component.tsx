import { motion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

import { AlertIcon } from '#/shared/ui/components/icons/alert-icon.component.tsx';

type NoticeBannerProps = {
  children: ReactNode;
  /** `warning` is the loud one (gold in Arena, yellow in Party); `info` is a quiet panel. */
  tone?: 'warning' | 'info';
};

/** Strip with a short notice, e.g. "Não consigo guardar a partida neste navegador...". */
export function NoticeBanner({ children, tone = 'warning' }: NoticeBannerProps) {
  const isWarning = tone === 'warning';

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        role={isWarning ? 'alert' : 'status'}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className={`flex items-start gap-3 rounded-md border-solid border-border px-4 py-3 text-[16px] leading-snug font-semibold [border-width:var(--theme-outline-width)] ${
          isWarning ? 'bg-accent text-text-on-primary arena:bg-primary' : 'bg-surface text-text'
        }`}
      >
        <span
          aria-hidden="true"
          className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
            isWarning
              ? 'bg-text-on-primary text-accent arena:text-primary'
              : 'bg-accent text-text-on-primary'
          }`}
        >
          <AlertIcon size={16} />
        </span>
        <span>{children}</span>
      </motion.div>
    </MotionConfig>
  );
}
