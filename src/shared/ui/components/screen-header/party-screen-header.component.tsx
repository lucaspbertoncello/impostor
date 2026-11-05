import { ArrowLeftIcon } from '#/shared/ui/components/icons/arrow-left-icon.component.tsx';
import { IconButton } from '#/shared/ui/components/icon-button/icon-button.component.tsx';
import type { ScreenHeaderProps } from '#/shared/ui/types/screen-header-props.type.ts';

/**
 * Party header: no plaque. A round back button and a big plain title with a short yellow
 * underline bar that doubles as the only decoration.
 */
export function PartyScreenHeader({
  title,
  onBack,
  backLabel = 'Voltar',
  trailing,
}: ScreenHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 pt-5 pb-2">
      {onBack ? (
        <IconButton aria-label={backLabel} onPress={onBack}>
          <ArrowLeftIcon size={26} />
        </IconButton>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h1 className="truncate font-display text-[32px] leading-none font-bold">{title}</h1>
        <span aria-hidden="true" className="h-1.5 w-14 rounded-sm bg-accent" />
      </div>
      {trailing ?? null}
    </header>
  );
}
