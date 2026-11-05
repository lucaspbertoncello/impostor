import { createRoute } from '@tanstack/react-router';

import { RevealPage } from '#/pages/match/reveal.page.tsx';
import { modeRoute } from '#/router/routes/mode.route.tsx';

export const revealRoute = createRoute({
  getParentRoute: () => modeRoute,
  path: 'reveal',
  component: RevealPage,
});
