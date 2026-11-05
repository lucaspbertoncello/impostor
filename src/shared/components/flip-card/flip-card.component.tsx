import { useState, type ReactNode } from 'react';

type FlipCardProps = {
  back: ReactNode;
  /** Called only while the card is held (BR-MAT-045/046): nothing secret exists otherwise. */
  renderFront: () => ReactNode;
  onFirstReveal?: () => void;
  label: string;
};

// Stub: shows the front while the pointer is pressed, with no animation. The real mechanics
// (release on blur, hidden tab, touch cancel, long press, animation) replace it and keep the props.
export function FlipCard({ back, renderFront, onFirstReveal, label }: FlipCardProps) {
  const [held, setHeld] = useState(false);
  const [revealedOnce, setRevealedOnce] = useState(false);

  function hold() {
    setHeld(true);
    if (!revealedOnce) {
      setRevealedOnce(true);
      onFirstReveal?.();
    }
  }

  return (
    <button
      type="button"
      aria-label={label}
      className="block w-full touch-none select-none"
      onPointerDown={hold}
      onPointerUp={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      onContextMenu={(event) => event.preventDefault()}
    >
      {held ? renderFront() : back}
    </button>
  );
}
