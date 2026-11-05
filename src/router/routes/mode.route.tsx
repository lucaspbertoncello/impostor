import { createRoute, redirect } from '@tanstack/react-router';

import { rootRoute } from '#/router/routes/root.route.tsx';
import { isThemeName } from '#/shared/utils/is-theme-name.util.ts';

// `/$mode/...` only exists for `arena` and `party`; anything else goes back to the Início.
// No route carries a word, a role or a card index (BR-MAT-045/046).
export const modeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$mode',
  beforeLoad: ({ params }) => {
    if (!isThemeName(params.mode)) throw redirect({ to: '/' });
  },
});
