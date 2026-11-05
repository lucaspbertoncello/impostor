/** What the chips need of a category (the view does not import the domain, so the type lives here). */
export type CategoryOption = {
  id: string;
  name: string;
  kind: 'normal' | 'special';
  description?: string;
  wordCount: number;
};
