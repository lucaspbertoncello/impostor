import { createRoute } from '@tanstack/react-router';

import { RoundPage } from '#/pages/match/round.page.tsx';
import { modeRoute } from '#/router/routes/mode.route.tsx';

export const roundRoute = createRoute({
  getParentRoute: () => modeRoute,
  path: 'round',
  component: RoundPage,
});
