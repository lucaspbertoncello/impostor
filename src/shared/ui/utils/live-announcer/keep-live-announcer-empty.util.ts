const LOG_SELECTOR = '[data-live-announcer] [role="log"]';

function clearLogs(): void {
  document.querySelectorAll(LOG_SELECTOR).forEach((region) => {
    if (region.childNodes.length > 0) region.replaceChildren();
  });
}

/**
 * React Aria keeps its screen reader announcements (for example the last value of the impostor
 * stepper) in a hidden `role="log"` region on `document.body`, outside any screen. It writes them
 * after a short delay and keeps them for several seconds, so a value announced on the screen
 * before would show up in the page text of the next one. A screen that must show nothing from
 * the one before it calls this on arrival: it empties the region now and again whenever React
 * Aria writes to it. The returned function stops it (call it when the screen unmounts).
 */
export function keepLiveAnnouncerEmpty(): () => void {
  if (typeof document === 'undefined') return () => undefined;
  clearLogs();
  const observer = new MutationObserver(clearLogs);
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}
