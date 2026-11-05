import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { useMatchSettingsModel } from '#/features/setup/match-settings/match-settings.model.ts';
import type { MatchSettingsViewProps } from '#/features/setup/match-settings/types/match-settings-view-props.type.ts';
import type { StartFailure } from '#/features/setup/match-settings/types/start-failure.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

/** Bridges the model and the router to the props of the view (RF-CFG-005 and RF-CFG-006). */
export function useMatchSettingsViewModel(mode: ThemeName): MatchSettingsViewProps {
  const navigate = useNavigate();
  const { settings, settingsActions, startRound, hasSavedRound, categoryOptions } =
    useMatchSettingsModel(mode);
  const [categoriesErrorTick, setCategoriesErrorTick] = useState(0);
  const [hasCategoriesError, setHasCategoriesError] = useState(false);
  const [startFailure, setStartFailure] = useState<StartFailure | null>(null);
  const [isDiscardSheetOpen, setIsDiscardSheetOpen] = useState(false);

  const hasCategories = mode === 'party';
  const normalCategories = categoryOptions.filter((category) => category.kind === 'normal');
  const specialCategories = categoryOptions.filter((category) => category.kind === 'special');
  const knownIds = new Set(categoryOptions.map((category) => category.id));
  const selectedCategoryIds = settings.categoryIds.filter((id) => knownIds.has(id));

  function showCategoriesError() {
    setHasCategoriesError(true);
    setCategoriesErrorTick((tick) => tick + 1);
  }

  function runStart() {
    const result = startRound(mode);
    if (result.ok) {
      void navigate({ to: '/$mode/reveal', params: { mode } });
    } else if (result.reason === 'no-categories') {
      setIsDiscardSheetOpen(false);
      showCategoriesError();
    } else {
      setIsDiscardSheetOpen(false);
      setStartFailure(result.reason);
    }
  }

  function handleStart() {
    setStartFailure(null);
    // The error comes before the discard question: no point asking to throw a round away for nothing.
    if (hasCategories && selectedCategoryIds.length === 0) {
      showCategoriesError();
      return;
    }
    if (hasSavedRound) {
      setIsDiscardSheetOpen(true);
      return;
    }
    runStart();
  }

  function changeCategories(nextIds: string[]) {
    settingsActions.setCategories(mode, nextIds);
    if (nextIds.length > 0) setHasCategoriesError(false);
  }

  function toggleCategory(categoryId: string) {
    const isSelected = selectedCategoryIds.includes(categoryId);
    changeCategories(
      isSelected
        ? selectedCategoryIds.filter((id) => id !== categoryId)
        : [...selectedCategoryIds, categoryId],
    );
  }

  function selectAllNormalCategories() {
    const specialSelected = selectedCategoryIds.filter((id) =>
      specialCategories.some((category) => category.id === id),
    );
    changeCategories([...normalCategories.map((category) => category.id), ...specialSelected]);
  }

  function clearNormalCategories() {
    changeCategories(
      selectedCategoryIds.filter((id) => specialCategories.some((category) => category.id === id)),
    );
  }

  return {
    theme: mode,
    playerCount: settings.playerCount,
    impostorCount: settings.impostorCount,
    maxImpostors: settings.maxImpostors,
    impostorCountWasAdjusted: settings.impostorCountWasAdjusted,
    hintEnabled: settings.hintEnabled,
    hasCategories,
    normalCategories,
    specialCategories,
    selectedCategoryIds,
    categoriesErrorTick,
    hasCategoriesError,
    startFailure,
    isDiscardSheetOpen,
    onBack: () => void navigate({ to: '/$mode/players', params: { mode } }),
    onImpostorCountChange: (count) => settingsActions.setImpostorCount(mode, count),
    onHintChange: (enabled) => settingsActions.setHintEnabled(mode, enabled),
    onToggleCategory: toggleCategory,
    onSelectAllNormalCategories: selectAllNormalCategories,
    onClearNormalCategories: clearNormalCategories,
    onStart: handleStart,
    onDiscardSheetOpenChange: setIsDiscardSheetOpen,
    onConfirmDiscard: () => {
      setIsDiscardSheetOpen(false);
      runStart();
    },
  };
}
