import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArenaLogo } from '#/shared/components/logo/arena-logo.component.tsx';

describe('ArenaLogo', () => {
  it('draws the text as paths, with no <text> and no style import', () => {
    const { container } = render(<ArenaLogo />);

    expect(container.querySelector('text')).toBeNull();
    expect(container.querySelector('style')).toBeNull();
    expect(container.querySelectorAll('path').length).toBeGreaterThan(8);
  });

  it('is an image with the given title', () => {
    render(<ArenaLogo title="Impostor Arena" />);

    expect(screen.getByRole('img', { name: 'Impostor Arena' })).toBeInTheDocument();
  });
});
