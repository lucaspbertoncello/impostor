import { ModeLogo } from '#/features/setup/players/components/header/mode-logo.component.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { ArrowLeftIcon } from '#/shared/ui/components/icons/arrow-left-icon.component.tsx';
import { IconButton } from '#/shared/ui/components/icon-button/icon-button.component.tsx';
import { ScreenHeader } from '#/shared/ui/components/screen-header/screen-header.component.tsx';

type PlayersHeaderProps = {
  theme: ThemeName;
  onBack: () => void;
};

/** RF-JOG-001 item 1: the back button and the logo of the mode on top, the title of the screen under them. */
export function PlayersHeader({ theme, onBack }: PlayersHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-4 px-4 pt-4">
        <IconButton aria-label="Voltar ao Início" onPress={onBack}>
          <ArrowLeftIcon size={26} />
        </IconButton>
        <ModeLogo theme={theme} />
      </div>
      <ScreenHeader theme={theme} title="Jogadores" />
    </div>
  );
}
