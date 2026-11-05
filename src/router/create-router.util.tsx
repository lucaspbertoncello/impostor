import { createRouter, type RouterHistory } from '@tanstack/react-router';

import { createGalleryRoute } from '#/router/routes/gallery.route.tsx';
import { homeRoute } from '#/router/routes/home.route.tsx';
import { modeRoute } from '#/router/routes/mode.route.tsx';
import { playersRoute } from '#/router/routes/players.route.tsx';
import { resultRoute } from '#/router/routes/result.route.tsx';
import { revealRoute } from '#/router/routes/reveal.route.tsx';
import { rootRoute } from '#/router/routes/root.route.tsx';
import { roundRoute } from '#/router/routes/round.route.tsx';
import { settingsRoute } from '#/router/routes/settings.route.tsx';

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree: rootRoute.addChildren([
      homeRoute,
      modeRoute.addChildren([playersRoute, settingsRoute, revealRoute, roundRoute, resultRoute]),
      // The component gallery exists only in development.
      ...(import.meta.env.DEV ? [createGalleryRoute(rootRoute)] : []),
    ]),
    history,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
