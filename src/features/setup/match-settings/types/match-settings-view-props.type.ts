import type { CategoryOption } from '#/features/setup/match-settings/types/category-option.type.ts';
import type { StartFailure } from '#/features/setup/match-settings/types/start-failure.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';

export type MatchSettingsViewProps = {
  theme: ThemeName;
  playerCount: number;
  impostorCount: number;
  maxImpostors: number;
  impostorCountWasAdjusted: boolean;
  hintEnabled: boolean;
  /** Only the Party mode has categories; Arena gets an empty list and `hasCategories` false. */
  hasCategories: boolean;
  normalCategories: CategoryOption[];
  specialCategories: CategoryOption[];
  selectedCategoryIds: string[];
  /** Grows at each tap on "Começar rodada" with no category: the view scrolls to the grid on every change. */
  categoriesErrorTick: number;
  hasCategoriesError: boolean;
  startFailure: StartFailure | null;
  isDiscardSheetOpen: boolean;
  onBack: () => void;
  onImpostorCountChange: (count: number) => void;
  onHintChange: (enabled: boolean) => void;
  onToggleCategory: (categoryId: string) => void;
  onSelectAllNormalCategories: () => void;
  onClearNormalCategories: () => void;
  onStart: () => void;
  onDiscardSheetOpenChange: (isOpen: boolean) => void;
  onConfirmDiscard: () => void;
};
