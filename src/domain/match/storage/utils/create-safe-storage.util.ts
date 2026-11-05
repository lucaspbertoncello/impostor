import type { StateStorage } from 'zustand/middleware';

export type SafeStorageOptions = {
  getBackend?: () => Storage;
  onUnavailable?: () => void;
};

const PROBE_KEY = '__impostor_storage_probe__';

/**
 * A storage that never throws: with the browser storage blocked or full it keeps the data in memory
 * and calls `onUnavailable` once (BR-MAT-030). It never logs anything.
 */
export function createSafeStorage({
  getBackend = () => window.localStorage,
  onUnavailable = () => {},
}: SafeStorageOptions = {}): StateStorage {
  const memory = new Map<string, string>();
  let backend: Storage | null | undefined;

  function fallToMemory(): null {
    if (backend !== null) {
      backend = null;
      onUnavailable();
    }
    return null;
  }

  function resolveBackend(): Storage | null {
    if (backend !== undefined) return backend;

    try {
      const candidate = getBackend();
      candidate.setItem(PROBE_KEY, '1');
      candidate.removeItem(PROBE_KEY);
      backend = candidate;
    } catch {
      fallToMemory();
    }

    return backend ?? null;
  }

  return {
    getItem: (name) => {
      const storage = resolveBackend();
      if (storage !== null) {
        try {
          return storage.getItem(name);
        } catch {
          fallToMemory();
        }
      }
      return memory.get(name) ?? null;
    },
    setItem: (name, value) => {
      const storage = resolveBackend();
      if (storage !== null) {
        try {
          storage.setItem(name, value);
          return;
        } catch {
          fallToMemory();
        }
      }
      memory.set(name, value);
    },
    removeItem: (name) => {
      const storage = resolveBackend();
      if (storage !== null) {
        try {
          storage.removeItem(name);
          return;
        } catch {
          fallToMemory();
        }
      }
      memory.delete(name);
    },
  };
}
