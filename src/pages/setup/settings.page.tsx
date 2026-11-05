import { useParams } from '@tanstack/react-router';

import { MatchSettingsView } from '#/features/setup/match-settings/match-settings.view.tsx';
import { useMatchSettingsViewModel } from '#/features/setup/match-settings/match-settings.viewmodel.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { isThemeName } from '#/shared/utils/is-theme-name.util.ts';

/** Connects the `/$mode/settings` route to the Configuração feature. */
export function SettingsPage() {
  const { mode } = useParams({ strict: false });
  // The mode route already sends an unknown mode back to the Início; the fallback only satisfies the types.
  const theme: ThemeName = isThemeName(mode) ? mode : 'party';

  return <SettingsScreen mode={theme} />;
}

function SettingsScreen({ mode }: { mode: ThemeName }) {
  const props = useMatchSettingsViewModel(mode);
  return <MatchSettingsView {...props} />;
}
