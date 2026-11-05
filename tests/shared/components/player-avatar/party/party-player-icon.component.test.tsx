import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PartyPlayerIcon } from '#/shared/components/player-avatar/party/party-player-icon.component.tsx';
import { PLAYER_ICON_INDEXES } from '#/shared/constants/player-icon-indexes.constant.ts';

describe('PartyPlayerIcon', () => {
  it('renders the 16 positions, each one with its own accessible title', () => {
    const titles = PLAYER_ICON_INDEXES.map((index) => {
      const { unmount } = render(<PartyPlayerIcon index={index} />);
      const title = screen.getByRole('img').getAttribute('aria-label');
      unmount();
      return title;
    });

    expect(titles).toHaveLength(16);
    expect(titles.every((title) => Boolean(title))).toBe(true);
    expect(new Set(titles).size).toBe(16);
  });

  it('uses the given title and size', () => {
    render(<PartyPlayerIcon index={1} size={96} title="Lucas" />);
    const icon = screen.getByRole('img', { name: 'Lucas' });
    expect(icon).toHaveAttribute('width', '96');
    expect(icon).toHaveAttribute('viewBox', '0 0 96 96');
  });
});
