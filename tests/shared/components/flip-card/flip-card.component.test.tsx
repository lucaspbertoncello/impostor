import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FlipCard } from '#/shared/components/flip-card/flip-card.component.tsx';

const SECRET = 'PALAVRA-SECRETA';

function setup(onFirstReveal?: () => void) {
  const renderFront = vi.fn(() => <p>{SECRET}</p>);
  render(
    <FlipCard
      label="Carta do jogador"
      back={<span>verso</span>}
      renderFront={renderFront}
      onFirstReveal={onFirstReveal}
    />,
  );
  const card = screen.getByRole('button', { name: 'Carta do jogador' });
  return { card, renderFront };
}

const pointer = { pointerId: 1, pointerType: 'touch', button: 0 };

describe('FlipCard secrecy', () => {
  it('does not render the front before holding', () => {
    const { renderFront } = setup();
    expect(renderFront).not.toHaveBeenCalled();
    expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain(SECRET);
  });

  it('shows the front while the pointer is held and removes it on release', () => {
    const { card } = setup();
    fireEvent.pointerDown(card, pointer);
    expect(screen.getByText(SECRET)).toBeInTheDocument();
    fireEvent.pointerUp(card, pointer);
    expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
  });

  it('removes the front on pointercancel', () => {
    const { card } = setup();
    fireEvent.pointerDown(card, pointer);
    expect(screen.getByText(SECRET)).toBeInTheDocument();
    fireEvent.pointerCancel(card, pointer);
    expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
  });

  it('removes the front when pointer capture is lost', () => {
    const { card } = setup();
    fireEvent.pointerDown(card, pointer);
    fireEvent.lostPointerCapture(card, pointer);
    expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
  });

  it('shows the front while Space or Enter is held and removes it on key up', () => {
    const { card } = setup();
    for (const key of [' ', 'Enter']) {
      fireEvent.keyDown(card, { key });
      expect(screen.getByText(SECRET)).toBeInTheDocument();
      fireEvent.keyUp(card, { key });
      expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
    }
  });

  it('removes the front on window blur', () => {
    const { card } = setup();
    fireEvent.pointerDown(card, pointer);
    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
  });

  it('removes the front when the tab becomes hidden', () => {
    const { card } = setup();
    fireEvent.pointerDown(card, pointer);
    const spy = vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    spy.mockRestore();
    expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
  });

  it('removes the front when the card control loses focus', () => {
    const { card } = setup();
    fireEvent.keyDown(card, { key: ' ' });
    fireEvent.blur(card);
    expect(screen.queryByText(SECRET)).not.toBeInTheDocument();
  });

  it('blocks the context menu and drag, and leaks nothing in attributes', () => {
    const { card } = setup();
    expect(fireEvent.contextMenu(card)).toBe(false);
    expect(fireEvent.dragStart(card)).toBe(false);
    fireEvent.pointerDown(card, pointer);
    const html = document.body.innerHTML;
    for (const element of Array.from(document.querySelectorAll('*'))) {
      for (const attribute of Array.from(element.attributes)) {
        expect(attribute.value).not.toContain(SECRET);
      }
    }
    expect(card).toHaveAttribute('aria-label', 'Carta do jogador');
    expect(html.match(new RegExp(SECRET, 'g'))).toHaveLength(1);
  });

  it('keeps the secret inside a polite live region', () => {
    const { card } = setup();
    fireEvent.pointerDown(card, pointer);
    expect(screen.getByText(SECRET).closest('[aria-live="polite"]')).not.toBeNull();
  });
});

describe('FlipCard onFirstReveal', () => {
  it('fires once on the first hold only', () => {
    const onFirstReveal = vi.fn();
    const { card } = setup(onFirstReveal);
    expect(onFirstReveal).not.toHaveBeenCalled();
    fireEvent.pointerDown(card, pointer);
    fireEvent.pointerUp(card, pointer);
    fireEvent.pointerDown(card, pointer);
    fireEvent.pointerUp(card, pointer);
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyUp(card, { key: 'Enter' });
    expect(onFirstReveal).toHaveBeenCalledTimes(1);
  });
});
