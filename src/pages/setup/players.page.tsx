import { useParams } from '@tanstack/react-router';

import { usePlayersViewmodel } from '#/features/setup/players/players.viewmodel.ts';
import { PlayersView } from '#/features/setup/players/players.view.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { isThemeName } from '#/shared/utils/is-theme-name.util.ts';

function PlayersContent({ mode }: { mode: ThemeName }) {
  return <PlayersView {...usePlayersViewmodel(mode)} />;
}

export function PlayersPage() {
  const { mode } = useParams({ strict: false });

  return isThemeName(mode) ? <PlayersContent mode={mode} /> : null;
}
