import { useStorageStatus } from '#/domain/match/storage/stores/storage-status.store.ts';

export type StorageWarning = {
  /** True once, while the storage is unavailable and the warning was not dismissed (RF-GER-006). */
  visible: boolean;
  dismiss: () => void;
};

export function useStorageWarning(): StorageWarning {
  const unavailable = useStorageStatus((state) => state.unavailable);
  const dismissed = useStorageStatus((state) => state.warningDismissed);
  const dismiss = useStorageStatus((state) => state.dismissWarning);

  return { visible: unavailable && !dismissed, dismiss };
}
