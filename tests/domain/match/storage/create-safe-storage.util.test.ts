import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useStorageWarning } from '#/domain/match/storage/hooks/use-storage-warning.hook.ts';
import { useStorageStatus } from '#/domain/match/storage/stores/storage-status.store.ts';
import { createSafeStorage } from '#/domain/match/storage/utils/create-safe-storage.util.ts';

function createBrokenStorage(): Storage {
  const fail = () => {
    throw new DOMException('blocked', 'SecurityError');
  };
  return {
    getItem: fail,
    setItem: fail,
    removeItem: fail,
    clear: fail,
    key: fail,
    length: 0,
  };
}

describe('createSafeStorage (BR-MAT-030)', () => {
  it('uses the browser storage when it works', () => {
    const backend = new Map<string, string>();
    const storage = createSafeStorage({
      getBackend: () =>
        ({
          getItem: (key: string) => backend.get(key) ?? null,
          setItem: (key: string, value: string) => void backend.set(key, value),
          removeItem: (key: string) => void backend.delete(key),
        }) as unknown as Storage,
    });

    storage.setItem('a', 'b');

    expect(backend.get('a')).toBe('b');
    expect(storage.getItem('a')).toBe('b');
  });

  it('keeps the data in memory and warns once when the storage is blocked', () => {
    const onUnavailable = vi.fn();
    const storage = createSafeStorage({ getBackend: createBrokenStorage, onUnavailable });

    expect(() => storage.setItem('a', 'b')).not.toThrow();
    expect(storage.getItem('a')).toBe('b');
    expect(storage.getItem('missing')).toBeNull();
    storage.removeItem('a');
    expect(storage.getItem('a')).toBeNull();
    expect(onUnavailable).toHaveBeenCalledTimes(1);
  });

  it('keeps going in memory when the storage fails after working (quota)', () => {
    const onUnavailable = vi.fn();
    let broken = false;
    const storage = createSafeStorage({
      getBackend: () =>
        ({
          getItem: () => null,
          setItem: () => {
            if (broken) throw new DOMException('full', 'QuotaExceededError');
          },
          removeItem: () => {},
        }) as unknown as Storage,
      onUnavailable,
    });

    storage.setItem('a', '1');
    expect(onUnavailable).not.toHaveBeenCalled();

    broken = true;
    expect(() => storage.setItem('a', '2')).not.toThrow();
    expect(storage.getItem('a')).toBe('2');
    expect(onUnavailable).toHaveBeenCalledTimes(1);
  });
});

describe('useStorageWarning (RF-GER-006)', () => {
  beforeEach(() => {
    useStorageStatus.setState({ unavailable: false, warningDismissed: false });
  });

  afterEach(() => {
    useStorageStatus.setState({ unavailable: false, warningDismissed: false });
  });

  it('is hidden while the storage works', () => {
    expect(renderHook(() => useStorageWarning()).result.current.visible).toBe(false);
  });

  it('shows when the storage is unavailable and stays hidden after dismissing', () => {
    const { result } = renderHook(() => useStorageWarning());

    act(() => useStorageStatus.getState().markUnavailable());
    expect(result.current.visible).toBe(true);

    act(() => result.current.dismiss());
    expect(result.current.visible).toBe(false);

    act(() => useStorageStatus.getState().markUnavailable());
    expect(result.current.visible).toBe(false);
  });
});
