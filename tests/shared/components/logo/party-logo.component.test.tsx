import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PartyLogo } from '#/shared/components/logo/party-logo.component.tsx';

describe('PartyLogo', () => {
  it.each(['on-dark', 'on-light'] as const)('draws the text as paths in %s', (variant) => {
    const { container } = render(<PartyLogo variant={variant} />);

    expect(container.querySelector('text')).toBeNull();
    expect(container.querySelector('style')).toBeNull();
    expect(container.querySelectorAll('path').length).toBeGreaterThan(1);
  });

  it('is an image with the given title', () => {
    render(<PartyLogo variant="on-light" title="Impostor Festa" />);

    expect(screen.getByRole('img', { name: 'Impostor Festa' })).toBeInTheDocument();
  });
});
