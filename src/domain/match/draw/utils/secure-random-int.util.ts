const UINT32_RANGE = 0x1_0000_0000;

/** Default random source: `crypto.getRandomValues` with rejection sampling, so there is no modulo bias. */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > UINT32_RANGE) {
    throw new RangeError('maxExclusive must be an integer between 1 and 2^32');
  }

  const limit = UINT32_RANGE - (UINT32_RANGE % maxExclusive);
  const buffer = new Uint32Array(1);

  let value: number;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0] ?? 0;
  } while (value >= limit);

  return value % maxExclusive;
}
