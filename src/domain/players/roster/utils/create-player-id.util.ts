/** A random id from `crypto.getRandomValues` (`randomUUID` needs a secure context, and the phone may use plain http). */
export function createPlayerId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
