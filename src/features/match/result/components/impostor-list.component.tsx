import { motion } from 'motion/react';

import { useResultMotion } from '#/features/match/result/hooks/use-result-motion.hook.ts';
import type { ResultPlayer } from '#/features/match/result/types/result-player.type.ts';
import { getImpostorsTitle } from '#/features/match/result/utils/get-impostors-title.util.ts';
import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type ImpostorListProps = { theme: ThemeName; impostors: ResultPlayer[] };

/** Entrance steps per row stop growing here, so nine impostors do not make the group wait. */
const MAX_STAGGERED_ROWS = 5;

/** RF-RES-001: one card per impostor, icon and name. A lone impostor gets a bigger card. */
export function ImpostorList({ theme, impostors }: ImpostorListProps) {
  const { reduced, delayOf } = useResultMotion();
  const isAlone = impostors.length === 1;

  return (
    <section aria-labelledby="result-impostors-title" className="flex flex-col gap-3">
      <h2
        id="result-impostors-title"
        className="font-display text-[24px] leading-tight font-bold arena:uppercase arena:tracking-wide"
      >
        {getImpostorsTitle(impostors.length)}
      </h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {impostors.map((impostor, position) => (
          <motion.li
            key={impostor.id}
            initial={
              reduced
                ? false
                : theme === 'arena'
                  ? { opacity: 0, x: -32 }
                  : { opacity: 0, scale: 0.7 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: delayOf('impostors') + Math.min(position, MAX_STAGGERED_ROWS) * 0.12,
              type: 'spring',
              stiffness: theme === 'arena' ? 380 : 300,
              damping: theme === 'arena' ? 28 : 16,
            }}
            className={[
              'flex items-center gap-3 rounded-md bg-surface px-3 arena:shadow-card party:shadow-panel',
              isAlone ? 'min-h-24 py-3' : 'min-h-16 py-2',
            ].join(' ')}
          >
            <span className="flex shrink-0 rounded-full bg-bg/45 p-1 ring-[3px] ring-danger">
              <PlayerAvatar theme={theme} index={impostor.iconIndex} size={isAlone ? 72 : 44} />
            </span>
            <span
              className={[
                'min-w-0 flex-1 leading-tight font-bold break-words',
                isAlone ? 'text-[28px]' : 'text-[20px]',
              ].join(' ')}
            >
              {impostor.name}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
