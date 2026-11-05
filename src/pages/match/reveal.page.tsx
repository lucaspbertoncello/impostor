import { getRouteApi } from '@tanstack/react-router';

import { useRevealViewModel } from '#/features/match/reveal/reveal.viewmodel.ts';
import { RevealView } from '#/features/match/reveal/reveal.view.tsx';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { isThemeName } from '#/shared/utils/is-theme-name.util.ts';

const revealApi = getRouteApi('/$mode/reveal');

function RevealScreen({ mode }: { mode: ThemeName }) {
  const props = useRevealViewModel(mode);

  return props === null ? null : <RevealView {...props} />;
}

/** Revelação: each player, in the drawn order, takes the phone and sees the role by holding the card. */
export function RevealPage() {
  const { mode } = revealApi.useParams();

  return isThemeName(mode) ? <RevealScreen mode={mode} /> : null;
}
