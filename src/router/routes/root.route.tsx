import { createRootRoute } from '@tanstack/react-router';

import { AppShell } from '#/router/components/app-shell.component.tsx';

export const rootRoute = createRootRoute({ component: AppShell });
