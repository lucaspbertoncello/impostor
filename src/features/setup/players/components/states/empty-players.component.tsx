import { PlayerAvatar } from '#/shared/components/player-avatar/player-avatar.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** RF-JOG-009, first time: three ghost slots drawn with the icons of the theme, and the instruction. */
export function EmptyPlayers({ theme, minPlayers }: { theme: ThemeName; minPlayers: number }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border-dashed border-border bg-surface/40 px-6 py-8 text-center [border-width:var(--theme-outline-width)]">
      <div aria-hidden="true" className="flex items-center justify-center">
        {([3, 9, 6] as const).map((index, position) => (
          <span
            key={index}
            className={`flex size-16 items-center justify-center rounded-full bg-surface-strong opacity-70 ${position === 0 ? '' : '-ml-3'}`}
          >
            <PlayerAvatar theme={theme} index={index} size={48} />
          </span>
        ))}
      </div>
      <p className="text-[18px] leading-snug font-semibold">
        Adicione pelo menos {minPlayers} jogadores
      </p>
    </div>
  );
}
