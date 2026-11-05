/** The configuration of one mode (BR-MAT-031). Arena ignores `categoryIds`: its whole bank is the draw. */
export type MatchSettings = {
  impostorCount: number;
  hintEnabled: boolean;
  categoryIds: string[];
};
