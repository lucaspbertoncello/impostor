import { useCallback, useEffect, useRef, useState } from 'react';

/** The inline confirmation of a destructive tap: armed for `durationMs`, then it goes back (RF-JOG-004). */
export function useTimedConfirmation(durationMs = 3000) {
  const [isArmed, setIsArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const disarm = useCallback(() => {
    clear();
    setIsArmed(false);
  }, [clear]);

  const arm = useCallback(() => {
    clear();
    setIsArmed(true);
    timer.current = setTimeout(() => setIsArmed(false), durationMs);
  }, [clear, durationMs]);

  useEffect(() => clear, [clear]);

  return { isArmed, arm, disarm };
}
