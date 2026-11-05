import { ArenaWordsNote } from '#/features/setup/match-settings/components/arena-words-note.component.tsx';
import { CategoriesSection } from '#/features/setup/match-settings/components/categories/categories-section.component.tsx';
import { DiscardRoundSheet } from '#/features/setup/match-settings/components/discard-round-sheet.component.tsx';
import { HintSection } from '#/features/setup/match-settings/components/hint-section.component.tsx';
import { ImpostorSection } from '#/features/setup/match-settings/components/impostor-section.component.tsx';
import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';
import type { MatchSettingsViewProps } from '#/features/setup/match-settings/types/match-settings-view-props.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { NoticeBanner } from '#/shared/ui/components/notice-banner/notice-banner.component.tsx';
import { ScreenHeader } from '#/shared/ui/components/screen-header/screen-header.component.tsx';

/** Configuração (RF-CFG): impostors, hint, categories (Party) and the main action fixed at the bottom. */
export function MatchSettingsView(props: MatchSettingsViewProps) {
  const { theme } = props;

  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader theme={theme} title={SETTINGS_COPY.title} onBack={props.onBack} />

      <main className="flex flex-1 flex-col gap-6 px-4 pt-4 pb-8">
        <ImpostorSection
          playerCount={props.playerCount}
          impostorCount={props.impostorCount}
          maxImpostors={props.maxImpostors}
          wasAdjusted={props.impostorCountWasAdjusted}
          onChange={props.onImpostorCountChange}
        />
        <HintSection isEnabled={props.hintEnabled} onChange={props.onHintChange} />
        {props.hasCategories ? (
          <CategoriesSection
            normalCategories={props.normalCategories}
            specialCategories={props.specialCategories}
            selectedIds={props.selectedCategoryIds}
            hasError={props.hasCategoriesError}
            errorTick={props.categoriesErrorTick}
            onToggle={props.onToggleCategory}
            onSelectAllNormal={props.onSelectAllNormalCategories}
            onClearNormal={props.onClearNormalCategories}
          />
        ) : (
          <ArenaWordsNote />
        )}
      </main>

      <footer className="sticky bottom-0 z-10 flex flex-col gap-3 border-t-2 border-solid border-border bg-bg-elevated px-4 pt-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        {props.startFailure ? (
          <NoticeBanner>{SETTINGS_COPY.failures[props.startFailure]}</NoticeBanner>
        ) : null}
        <Button size="lg" fullWidth onPress={props.onStart}>
          {SETTINGS_COPY.start}
        </Button>
      </footer>

      <DiscardRoundSheet
        theme={theme}
        isOpen={props.isDiscardSheetOpen}
        onOpenChange={props.onDiscardSheetOpenChange}
        onConfirm={props.onConfirmDiscard}
      />
    </div>
  );
}
