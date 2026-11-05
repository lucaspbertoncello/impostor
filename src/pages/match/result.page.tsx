import { useParams } from '@tanstack/react-router';

import { ResultView } from '#/features/match/result/result.view.tsx';
import { useResultViewModel } from '#/features/match/result/result.viewmodel.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { isThemeName } from '#/shared/utils/is-theme-name.util.ts';

function ResultScreen({ mode }: { mode: ThemeName }) {
  const props = useResultViewModel(mode);

  return props === null ? null : <ResultView {...props} />;
}

export function ResultPage() {
  const { mode } = useParams({ strict: false });

  return isThemeName(mode) ? <ResultScreen mode={mode} /> : null;
}
