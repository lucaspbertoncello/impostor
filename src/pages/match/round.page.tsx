import { useParams } from '@tanstack/react-router';

import { RoundView } from '#/features/match/round/round.view.tsx';
import { useRoundViewModel } from '#/features/match/round/round.viewmodel.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { isThemeName } from '#/shared/utils/is-theme-name.util.ts';

function RoundScreen({ mode }: { mode: ThemeName }) {
  const props = useRoundViewModel(mode);

  return props === null ? null : <RoundView {...props} />;
}

export function RoundPage() {
  const { mode } = useParams({ strict: false });

  return isThemeName(mode) ? <RoundScreen mode={mode} /> : null;
}
