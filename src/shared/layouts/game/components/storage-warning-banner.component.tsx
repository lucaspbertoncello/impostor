import { useStorageWarning } from '#/domain/match/storage/hooks/use-storage-warning.hook.ts';
import { CloseIcon } from '#/shared/ui/components/icons/close-icon.component.tsx';
import { IconButton } from '#/shared/ui/components/icon-button/icon-button.component.tsx';
import { NoticeBanner } from '#/shared/ui/components/notice-banner/notice-banner.component.tsx';

/** RF-GER-006: shown once, while the browser storage is unavailable; the player can dismiss it. */
export function StorageWarningBanner() {
  const { visible, dismiss } = useStorageWarning();

  if (!visible) return null;

  return (
    <div className="flex items-start gap-2 px-4 pt-[calc(16px+env(safe-area-inset-top))]">
      <div className="min-w-0 flex-1">
        <NoticeBanner>
          Não consigo guardar a partida neste navegador. Se recarregar, perde tudo.
        </NoticeBanner>
      </div>
      <IconButton aria-label="Dispensar aviso" onPress={dismiss}>
        <CloseIcon size={22} />
      </IconButton>
    </div>
  );
}
