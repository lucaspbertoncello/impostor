import type { CategoryOption } from '#/features/setup/match-settings/types/category-option.type.ts';
import { CategoryChip } from '#/features/setup/match-settings/components/categories/category-chip.component.tsx';

type NormalCategoryGridProps = {
  categories: CategoryOption[];
  selectedIds: string[];
  onToggle: (categoryId: string) => void;
};

/** The normal categories as chips that flow in rows, each as wide as its name (no cramped columns at 320 px). */
export function NormalCategoryGrid({ categories, selectedIds, onToggle }: NormalCategoryGridProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <li key={category.id} className="max-w-full">
          <CategoryChip
            label={category.name}
            count={category.wordCount}
            isSelected={selectedIds.includes(category.id)}
            onChange={() => onToggle(category.id)}
          />
        </li>
      ))}
    </ul>
  );
}
