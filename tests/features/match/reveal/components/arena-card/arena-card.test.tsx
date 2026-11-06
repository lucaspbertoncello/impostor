import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArenaCardBack } from '#/features/match/reveal/components/arena-card/arena-card-back.component.tsx';
import { ArenaCardFront } from '#/features/match/reveal/components/arena-card/arena-card-front.component.tsx';

describe('ArenaCardFront', () => {
  it('shows the word on the crew card and never mentions the impostor', () => {
    const { container } = render(
      <ArenaCardFront role="crew" word="Cavaleiro Dourado" hint="segredo" />,
    );

    expect(screen.getByText('Cavaleiro Dourado')).toBeInTheDocument();
    expect(container.textContent?.toLowerCase()).not.toContain('impostor');
    expect(screen.queryByText('Dica')).not.toBeInTheDocument();
    expect(screen.queryByText('segredo')).not.toBeInTheDocument();
  });

  it('shows the hint on the impostor card only when it is given', () => {
    const { rerender } = render(<ArenaCardFront role="impostor" hint="Tem coroa" />);

    expect(screen.getByText('Você é o impostor')).toBeInTheDocument();
    expect(screen.getByText('Dica')).toBeInTheDocument();
    expect(screen.getByText('Tem coroa')).toBeInTheDocument();

    rerender(<ArenaCardFront role="impostor" />);

    expect(screen.getByText('Você é o impostor')).toBeInTheDocument();
    expect(screen.queryByText('Dica')).not.toBeInTheDocument();
  });

  it('keeps the same structure for both roles', () => {
    const crew = render(<ArenaCardFront role="crew" word="Gigante" />);
    const crewParts = crew.container.querySelectorAll('[class*="arena-card"]').length;
    crew.unmount();
    const impostor = render(<ArenaCardFront role="impostor" />);

    expect(impostor.container.querySelectorAll('[class*="arena-card"]').length).toBe(crewParts);
  });
});

describe('ArenaCardBack', () => {
  it('does not depend on the role and says nothing about it', () => {
    const first = render(<ArenaCardBack />);
    const html = first.container.innerHTML;
    first.unmount();
    const second = render(<ArenaCardBack />);

    expect(second.container.innerHTML).toBe(html);
    expect(html.toLowerCase()).not.toContain('impostor');
    expect(screen.getByText('Segure para virar')).toBeInTheDocument();
  });

  it('marks the pill as decoration of the back, so the card can hide it while it turns', () => {
    render(<ArenaCardBack />);

    expect(screen.getByText('Segure para virar').closest('[data-back-visual]')).not.toBeNull();
  });
});
