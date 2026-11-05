import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useId, useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';

import { HOME_INTRO } from '#/features/home/mode-picker/constants/mode-copy.constant.ts';

type IntroNoteProps = {
  /** Starts collapsed after the first match (RF-INI-003). */
  startCollapsed: boolean;
};

/** The one sentence that explains the game; the player can fold it away. */
export function IntroNote({ startCollapsed }: IntroNoteProps) {
  const [expanded, setExpanded] = useState(!startCollapsed);
  const panelId = useId();

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col items-center">
        <AriaButton
          aria-expanded={expanded}
          aria-controls={panelId}
          onPress={() => setExpanded((value) => !value)}
          className="inline-flex min-h-12 items-center rounded-md px-3 text-[16px] font-semibold text-text-muted underline decoration-2 underline-offset-4 outline-none data-[focus-visible]:outline-solid data-[focus-visible]:outline-[3px] data-[focus-visible]:outline-ring"
        >
          {expanded ? 'Esconder como funciona' : 'Como funciona'}
        </AriaButton>
        <div id={panelId}>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.p
                key="intro"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden text-center text-[17px] leading-relaxed text-text"
              >
                {HOME_INTRO}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
