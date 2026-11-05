import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArenaPlayerIcon } from '#/shared/components/player-avatar/arena/arena-player-icon.component.tsx';
import { PLAYER_ICON_INDEXES } from '#/shared/constants/player-icon-indexes.constant.ts';

describe('ArenaPlayerIcon', () => {
  it.each(PLAYER_ICON_INDEXES)('renders position %i as a labelled image', (index) => {
    const { container } = render(<ArenaPlayerIcon index={index} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(container.querySelector('svg > g')?.children.length).toBeGreaterThan(0);
  });

  it('gives each of the 16 positions a different title', () => {
    const titles = PLAYER_ICON_INDEXES.map((index) => {
      const { unmount } = render(<ArenaPlayerIcon index={index} />);
      const title = screen.getByRole('img').getAttribute('aria-label');
      unmount();
      return title;
    });

    expect(new Set(titles).size).toBe(16);
    expect(titles.every((title) => title && title.length > 0)).toBe(true);
  });

  it('uses the given title and size', () => {
    render(<ArenaPlayerIcon index={1} size={96} title="Jogador 1" />);

    const icon = screen.getByRole('img', { name: 'Jogador 1' });
    expect(icon).toHaveAttribute('width', '96');
    expect(icon).toHaveAttribute('height', '96');
  });

  it('keeps clip ids unique when several icons share a page', () => {
    const { container } = render(
      <>
        <ArenaPlayerIcon index={1} />
        <ArenaPlayerIcon index={1} />
      </>,
    );

    const ids = [...container.querySelectorAll('clipPath')].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
