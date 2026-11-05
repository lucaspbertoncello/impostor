import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderApp } from '#tests/support/router/render-app.util.tsx';

describe('createAppRouter', () => {
  it('mounts the Início at the root', async () => {
    renderApp('/');

    expect(await screen.findByRole('heading', { level: 1, name: 'Início' })).toBeInTheDocument();
  });

  it('mounts the screens of a valid mode under its theme', async () => {
    const { container } = renderApp('/arena/players');

    expect(await screen.findByRole('heading', { level: 1, name: 'Jogadores' })).toBeInTheDocument();
    expect(container.querySelector('[data-theme="arena"]')).not.toBeNull();
  });

  it.each(['/xpto/players', '/xpto/reveal', '/Arena/result'])(
    'sends the invalid mode at %s back to the Início',
    async (path) => {
      const { router } = renderApp(path);

      expect(await screen.findByRole('heading', { level: 1, name: 'Início' })).toBeInTheDocument();
      expect(router.state.location.pathname).toBe('/');
    },
  );
});
