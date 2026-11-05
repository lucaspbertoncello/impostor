import { createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { render } from '@testing-library/react';

import { createAppRouter } from '#/router/create-router.util.tsx';

/** Renders the whole app (router and layout) at `path`, on a memory history. */
export function renderApp(path: string) {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [path] }));
  const result = render(<RouterProvider router={router} />);
  return { router, ...result };
}
