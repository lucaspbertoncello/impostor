import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PartyCardBack } from '#/features/match/reveal/components/party-card/party-card-back.component.tsx';

describe('PartyCardBack', () => {
  it('takes no props and renders the same markup every time (the role cannot leak)', () => {
    const first = render(<PartyCardBack />);
    const firstHtml = first.container.innerHTML;
    first.unmount();
    const second = render(<PartyCardBack />);

    expect(second.container.innerHTML).toBe(firstHtml);
    expect(second.container).toHaveTextContent('Segure para virar');
    expect(second.container).not.toHaveTextContent(/impostor|dica/i);
  });
});
