import type { RoundPlayer } from '#/features/match/round/types/round-player.type.ts';
import { getNameFontSize } from '#/features/match/round/utils/get-name-font-size.util.ts';
import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

type StarterHighlightProps = { theme: ThemeName; player: RoundPlayer };

/** RF-PAR-001: who starts, the one big highlight of the screen. */
export function StarterHighlight({ theme, player }: StarterHighlightProps) {
  return (
    <section
      aria-label="Quem começa"
      className="flex flex-col items-center gap-3 rounded-lg px-4 py-6 text-center arena:bg-surface arena:shadow-panel party:bg-accent party:text-bg party:shadow-card"
    >
      <p className="rounded-sm px-4 py-1.5 font-display text-[18px] leading-none font-bold arena:bg-primary arena:text-text-on-primary arena:uppercase arena:tracking-wide party:bg-bg party:text-accent">
        Quem começa
      </p>
      <div className="flex size-[120px] items-center justify-center rounded-full bg-bg/55 party:bg-bg">
        <PlayerAvatar theme={theme} index={player.iconIndex} size={96} />
      </div>
      <div className="@container w-full">
        <p
          className="font-display leading-tight font-bold break-words arena:display-text arena:text-primary party:text-bg"
          style={{ fontSize: getNameFontSize(player.name, theme) }}
        >
          {player.name}
        </p>
      </div>
    </section>
  );
}
