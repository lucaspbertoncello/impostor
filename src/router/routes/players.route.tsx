import { createRoute } from '@tanstack/react-router';

import { PlayersPage } from '#/pages/setup/players.page.tsx';
import { modeRoute } from '#/router/routes/mode.route.tsx';

export const playersRoute = createRoute({
  getParentRoute: () => modeRoute,
  path: 'players',
  component: PlayersPage,
});
