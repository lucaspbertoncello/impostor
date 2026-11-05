import { Outlet, useParams } from '@tanstack/react-router';

import { GameLayout } from '#/shared/layouts/game/game-layout.component.tsx';
import { isThemeName } from '#/shared/utils/is-theme-name.util.ts';

// The Início has no `$mode`: it uses the party theme as a neutral base for now.
export function AppShell() {
  const { mode } = useParams({ strict: false });
  const theme = isThemeName(mode) ? mode : 'party';

  return (
    <GameLayout theme={theme}>
      <Outlet />
    </GameLayout>
  );
}
