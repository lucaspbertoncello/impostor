import type { ReactNode } from 'react';

export type ScreenHeaderProps = {
  title: string;
  /** When set, a back button appears on the left. */
  onBack?: () => void;
  backLabel?: string;
  /** Optional control on the right (e.g. an IconButton). */
  trailing?: ReactNode;
};
