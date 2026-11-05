import { createRoute } from '@tanstack/react-router';

import { SettingsPage } from '#/pages/setup/settings.page.tsx';
import { modeRoute } from '#/router/routes/mode.route.tsx';

export const settingsRoute = createRoute({
  getParentRoute: () => modeRoute,
  path: 'settings',
  component: SettingsPage,
});
