import type { RoundPlayer } from '#/features/match/round/types/round-player.type.ts';
import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { StarIcon } from '#/shared/ui/components/icons/star-icon.component.tsx';

type SpeakingOrderListProps = { theme: ThemeName; players: RoundPlayer[] };

/** RF-PAR-001: every player in the drawn speaking order, numbered; the first is marked. */
export function SpeakingOrderList({ theme, players }: SpeakingOrderListProps) {
  return (
    <section aria-labelledby="speaking-order-title" className="flex flex-col gap-3">
      <h2
        id="speaking-order-title"
        className="font-display text-[24px] leading-tight font-bold arena:uppercase arena:tracking-wide"
      >
        Ordem de fala
      </h2>
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {players.map((player, position) => {
          const isFirst = position === 0;

          return (
            <li
              key={player.id}
              className={[
                'flex min-h-14 items-center gap-3 rounded-md px-3 py-2',
                isFirst
                  ? 'arena:bg-primary arena:text-text-on-primary party:bg-accent party:text-bg'
                  : 'bg-surface text-text',
                'arena:shadow-card party:shadow-panel',
              ].join(' ')}
            >
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-sm bg-black/25 font-display text-[18px] leading-none font-bold arena:rounded-sm party:rounded-full"
              >
                {position + 1}
              </span>
              <PlayerAvatar theme={theme} index={player.iconIndex} size={40} />
              <span className="min-w-0 flex-1 text-[18px] leading-tight font-bold break-words">
                {player.name}
              </span>
              {isFirst ? (
                <span className="flex shrink-0 items-center">
                  <StarIcon size={24} />
                  <span className="sr-only">Começa</span>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
