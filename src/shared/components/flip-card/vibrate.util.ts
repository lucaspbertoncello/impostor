/** Progressive enhancement: Android Chrome vibrates, iOS Safari has no API and the game goes on. */
export function vibrate(pattern: number) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Some browsers throw when vibration is blocked; the haptic is never required.
  }
}
