import { ArenaResultWord } from '#/features/match/result/components/arena-result-word.component.tsx';
import { HintPanel } from '#/features/match/result/components/hint-panel.component.tsx';
import { ImpostorList } from '#/features/match/result/components/impostor-list.component.tsx';
import { PartyResultWord } from '#/features/match/result/components/party-result-word.component.tsx';
import { ResultDock } from '#/features/match/result/components/result-dock.component.tsx';
import type { ResultPlayer } from '#/features/match/result/types/result-player.type.ts';
import type { ThemeName } from '#/shared/types/theme-name.type.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { ScreenHeader } from '#/shared/ui/components/screen-header/screen-header.component.tsx';

export type ResultViewProps = {
  theme: ThemeName;
  word: string;
  categoryName: string;
  categoryColor: string | null;
  impostors: ResultPlayer[];
  /** `null` when the hint was off: the line does not appear (RF-RES-005). */
  hint: string | null;
  onNewRound: () => void;
  onChangeSettings: () => void;
  onSwitchMode: () => void;
};

/** RF-RES-001: the climax of the match. The word first, then the impostors, then the hint. */
export function ResultView({
  theme,
  word,
  categoryName,
  categoryColor,
  impostors,
  hint,
  onNewRound,
  onChangeSettings,
  onSwitchMode,
}: ResultViewProps) {
  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader theme={theme} title="Resultado" />
      <main className="flex flex-col gap-6 px-4 pt-4 pb-8">
        {theme === 'arena' ? (
          <ArenaResultWord word={word} />
        ) : (
          <PartyResultWord word={word} categoryName={categoryName} categoryColor={categoryColor} />
        )}
        <ImpostorList theme={theme} impostors={impostors} />
        {hint === null ? null : <HintPanel hint={hint} />}
      </main>
      <ResultDock>
        <Button variant="primary" size="lg" fullWidth onPress={onNewRound}>
          Nova rodada
        </Button>
        <Button variant="secondary" fullWidth onPress={onChangeSettings}>
          Mudar configuração
        </Button>
        <Button variant="secondary" fullWidth onPress={onSwitchMode}>
          Trocar modo
        </Button>
      </ResultDock>
    </div>
  );
}
