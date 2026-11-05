import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { flushSync } from 'react-dom';

import { vibrate } from '#/shared/components/flip-card/vibrate.util.ts';

type HoldSource = 'pointer' | 'key';

type UseHoldCardOptions = {
  onFirstReveal?: () => void;
};

/**
 * Held state of the card. Everything that can end a hold (release, cancel, lost capture, blur,
 * hidden tab) sets `held` to false synchronously (flushSync), so the secret front is out of the
 * DOM before the next paint (BR-MAT-045/046).
 */
export function useHoldCard({ onFirstReveal }: UseHoldCardOptions) {
  const [held, setHeld] = useState(false);
  const heldRef = useRef(false);
  const sourceRef = useRef<HoldSource | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const capturedRef = useRef(false);
  const revealedOnceRef = useRef(false);
  const onFirstRevealRef = useRef(onFirstReveal);

  useEffect(() => {
    onFirstRevealRef.current = onFirstReveal;
  });

  const release = useCallback(() => {
    if (!heldRef.current) return;
    heldRef.current = false;
    sourceRef.current = null;
    pointerIdRef.current = null;
    capturedRef.current = false;
    flushSync(() => setHeld(false));
    vibrate(10);
  }, []);

  const hold = useCallback((source: HoldSource) => {
    if (heldRef.current) return;
    heldRef.current = true;
    sourceRef.current = source;
    setHeld(true);
    vibrate(25);
    if (!revealedOnceRef.current) {
      revealedOnceRef.current = true;
      onFirstRevealRef.current?.();
    }
  }, []);

  // Window-level safety nets, only while held.
  useEffect(() => {
    if (!held) return;
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') release();
    }
    window.addEventListener('blur', release);
    window.addEventListener('pagehide', release);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('blur', release);
      window.removeEventListener('pagehide', release);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [held, release]);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (heldRef.current) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerIdRef.current = event.pointerId;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
        capturedRef.current = true;
      } catch {
        capturedRef.current = false;
      }
      hold('pointer');
    },
    [hold],
  );

  const onPointerEnd = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (sourceRef.current !== 'pointer' || event.pointerId !== pointerIdRef.current) return;
      release();
    },
    [release],
  );

  const onPointerLeave = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      // With capture the events keep coming to the card; without it, leaving ends the hold.
      if (capturedRef.current) return;
      onPointerEnd(event);
    },
    [onPointerEnd],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== ' ' && event.key !== 'Enter') return;
      event.preventDefault();
      if (event.repeat) return;
      hold('key');
    },
    [hold],
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== ' ' && event.key !== 'Enter') return;
      if (sourceRef.current === 'key') release();
    },
    [release],
  );

  const onBlur = useCallback(() => {
    release();
  }, [release]);

  return {
    held,
    handlers: {
      onPointerDown,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onLostPointerCapture: onPointerEnd,
      onPointerLeave,
      onKeyDown,
      onKeyUp,
      onBlur,
    },
  };
}
