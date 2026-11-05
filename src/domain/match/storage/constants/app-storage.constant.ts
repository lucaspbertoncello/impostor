import { useStorageStatus } from '#/domain/match/storage/stores/storage-status.store.ts';
import { createSafeStorage } from '#/domain/match/storage/utils/create-safe-storage.util.ts';

/** The storage of every persisted store of the app. */
export const APP_STORAGE = createSafeStorage({
  onUnavailable: () => useStorageStatus.getState().markUnavailable(),
});
