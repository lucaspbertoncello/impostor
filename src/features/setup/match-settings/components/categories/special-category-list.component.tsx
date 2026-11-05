import { SETTINGS_COPY } from '#/features/setup/match-settings/constants/settings-copy.constant.ts';
import type { CategoryOption } from '#/features/setup/match-settings/types/category-option.type.ts';
import { CategoryChip } from '#/features/setup/match-settings/components/categories/category-chip.component.tsx';

type SpecialCategoryListProps = {
  categories: CategoryOption[];
  selectedIds: string[];
  onToggle: (categoryId: string) => void;
};

/** The special categories: their own block below the normal ones, big chips with a description. */
export function SpecialCategoryList({
  categories,
  selectedIds,
  onToggle,
}: SpecialCategoryListProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border-2 border-dashed border-special/60 p-3">
      <h3 className="font-display text-[20px] leading-none text-special">
        {SETTINGS_COPY.specialTitle}
      </h3>
      <ul className="flex flex-col gap-3">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryChip
              isSpecial
              label={category.name}
              count={category.wordCount}
              {...(category.description === undefined ? {} : { description: category.description })}
              isSelected={selectedIds.includes(category.id)}
              onChange={() => onToggle(category.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
