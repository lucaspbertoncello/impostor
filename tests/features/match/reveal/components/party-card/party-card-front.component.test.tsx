import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PartyCardFront } from '#/features/match/reveal/components/party-card/party-card-front.component.tsx';

function getCard() {
  return document.querySelector('[data-card="party-front"]') as HTMLElement;
}

describe('PartyCardFront', () => {
  it('shows the word for crew and never the impostor text or a hint', () => {
    render(<PartyCardFront role="crew" word="Pão de queijo" hint="Dica secreta" />);

    expect(getCard()).toHaveTextContent('Pão de queijo');
    expect(screen.queryByText(/impostor/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Dica')).not.toBeInTheDocument();
    expect(screen.queryByText('Dica secreta')).not.toBeInTheDocument();
  });

  it('uses the same background and text color on both roles, with and without accentColor', () => {
    const looks = (['crew', 'impostor'] as const).flatMap((role) =>
      [undefined, '#1b3a8f'].map((accentColor) => {
        const { unmount } = render(
          <PartyCardFront role={role} word="Pizza" accentColor={accentColor} />,
        );
        const { backgroundColor, color } = getCard().style;
        unmount();
        return `${backgroundColor}|${color}`;
      }),
    );

    expect(new Set(looks).size).toBe(1);
    expect(looks[0]).not.toMatch(/27, 58, 143/);
  });

  it('shows the impostor text, and the hint (labeled "Dica") only when it comes', () => {
    const { unmount } = render(<PartyCardFront role="impostor" hint="Comida de lanche" />);
    expect(getCard()).toHaveTextContent(/Você é\s*o impostor/);
    expect(screen.getByText('Dica')).toBeInTheDocument();
    expect(screen.getByText('Comida de lanche')).toBeInTheDocument();
    unmount();

    render(<PartyCardFront role="impostor" />);
    expect(getCard()).toHaveTextContent(/Você é\s*o impostor/);
    expect(screen.queryByText('Dica')).not.toBeInTheDocument();
  });

  it('never shows the word or the accent color on the impostor card', () => {
    render(<PartyCardFront role="impostor" word="Pizza" accentColor="#1b3a8f" hint="Redonda" />);

    expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
    expect(getCard().getAttribute('style')).not.toMatch(/27, 58, 143|1b3a8f/i);
  });

  it('keeps the same size on both roles', () => {
    const { unmount } = render(<PartyCardFront role="crew" word="Pizza" />);
    const crewAspect = getCard().style.aspectRatio;
    unmount();
    render(<PartyCardFront role="impostor" />);

    expect(getCard().style.aspectRatio).toBe(crewAspect);
    expect(crewAspect).toBe('5 / 7');
  });
});
