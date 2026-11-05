import { useEffect, useRef } from 'react';

import { NormalCategoryGrid } from '#/features/setup/match-settings/components/categories/normal-category-grid.component.tsx';
import { ShortcutButton } from '#/features/setup/match-settings/components/categories/shortcut-button.component.tsx';
import { SpecialCategoryList } from '#/features/setup/match-settings/components/categories/special-category-list.component.tsx';
import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';
import type { CategoryOption } from '#/features/setup/match-settings/types/category-option.type.ts';
import { AlertIcon } from '#/shared/ui/components/icons/alert-icon.component.tsx';

type CategoriesSectionProps = {
  normalCategories: CategoryOption[];
  specialCategories: CategoryOption[];
  selectedIds: string[];
  hasError: boolean;
  /** Changes at each failed start: the section scrolls itself into view on every change. */
  errorTick: number;
  onToggle: (categoryId: string) => void;
  onSelectAllNormal: () => void;
  onClearNormal: () => void;
};

/** RF-CFG-003 and RF-CFG-005: normal chips, special block, the shortcuts and the error next to the grid. */
export function CategoriesSection({
  normalCategories,
  specialCategories,
  selectedIds,
  hasError,
  errorTick,
  onToggle,
  onSelectAllNormal,
  onClearNormal,
}: CategoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const total = normalCategories.length + specialCategories.length;
  const selectedCount = [...normalCategories, ...specialCategories].filter((category) =>
    selectedIds.includes(category.id),
  ).length;

  useEffect(() => {
    if (errorTick === 0) return;
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sectionRef.current?.scrollIntoView?.({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [errorTick]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="categories-title"
      className="flex scroll-mt-4 flex-col gap-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="categories-title" className="font-display text-[24px] leading-none">
          {SETTINGS_COPY.categoriesTitle}
        </h2>
        <p className="text-[16px] text-text-muted [font-variant-numeric:tabular-nums]">
          {selectedCount} de {total}
        </p>
      </div>

      <div className="-mt-2 -ml-3 flex flex-wrap gap-x-1">
        <ShortcutButton onPress={onSelectAllNormal}>{SETTINGS_COPY.selectAll}</ShortcutButton>
        <ShortcutButton onPress={onClearNormal}>{SETTINGS_COPY.clear}</ShortcutButton>
      </div>

      {hasError ? (
        <p
          role="alert"
          className="flex items-center gap-3 rounded-md bg-danger px-4 py-3 text-[16px] leading-snug font-semibold text-text-on-danger"
        >
          <AlertIcon size={20} className="shrink-0" />
          {SETTINGS_COPY.categoriesError}
        </p>
      ) : null}

      <NormalCategoryGrid
        categories={normalCategories}
        selectedIds={selectedIds}
        onToggle={onToggle}
      />
      <SpecialCategoryList
        categories={specialCategories}
        selectedIds={selectedIds}
        onToggle={onToggle}
      />
    </section>
  );
}
