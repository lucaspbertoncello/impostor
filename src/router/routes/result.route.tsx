import { createRoute } from '@tanstack/react-router';

import { ResultPage } from '#/pages/match/result.page.tsx';
import { modeRoute } from '#/router/routes/mode.route.tsx';

export const resultRoute = createRoute({
  getParentRoute: () => modeRoute,
  path: 'result',
  component: ResultPage,
});
