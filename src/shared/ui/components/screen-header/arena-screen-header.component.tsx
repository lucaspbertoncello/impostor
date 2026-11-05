import { ArrowLeftIcon } from '#/shared/ui/components/icons/arrow-left-icon.component.tsx';
import { IconButton } from '#/shared/ui/components/icon-button/icon-button.component.tsx';
import type { ScreenHeaderProps } from '#/shared/ui/types/screen-header-props.type.ts';

/**
 * Arena header: a plaque with the title in outlined marquee lettering. The plaque is a wide
 * panel with the dark outline and a solid base, like a game banner. The lettering is 22 px up to
 * 359 px wide (the longest title, "CONFIGURAÇÃO", fits the plaque at 320 px) and 28 px from there;
 * it never gets cut: a title that still does not fit breaks onto a second line.
 */
export function ArenaScreenHeader({
  title,
  onBack,
  backLabel = 'Voltar',
  trailing,
}: ScreenHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 pt-4 pb-2">
      {onBack ? (
        <IconButton aria-label={backLabel} onPress={onBack}>
          <ArrowLeftIcon size={26} />
        </IconButton>
      ) : null}
      <div className="flex min-h-14 min-w-0 flex-1 items-center justify-center rounded-lg bg-surface px-3 py-2 shadow-panel min-[360px]:px-4">
        <h1 className="display-text text-center text-[22px] leading-none [overflow-wrap:anywhere] min-[360px]:text-[28px]">
          {title}
        </h1>
      </div>
      {trailing}
    </header>
  );
}
