import { PlayersHeader } from '#/features/setup/players/components/header/players-header.component.tsx';
import { PlayerList } from '#/features/setup/players/components/player-list/player-list.component.tsx';
import { PlayerSheet } from '#/features/setup/players/components/player-sheet/player-sheet.component.tsx';
import { DiscardRoundSheet } from '#/features/setup/players/components/states/discard-round-sheet.component.tsx';
import { EmptyPlayers } from '#/features/setup/players/components/states/empty-players.component.tsx';
import type { PlayersViewProps } from '#/features/setup/players/types/players-view-props.type.ts';
import { getPlayerCountHint } from '#/features/setup/players/utils/get-player-count-hint.util.ts';
import { Button } from '#/shared/ui/components/button/button.component.tsx';
import { PlusIcon } from '#/shared/ui/components/icons/plus-icon.component.tsx';
import { NoticeBanner } from '#/shared/ui/components/notice-banner/notice-banner.component.tsx';

/** RF-JOG-001: header, counter, list, "Adicionar jogador" and, fixed at the bottom, "Continuar". */
export function PlayersView(props: PlayersViewProps) {
  const { theme, players, minPlayers, maxPlayers, isRosterFull, canContinue } = props;
  const countHint = getPlayerCountHint(players.length, props.missingPlayers);

  return (
    <main className="flex flex-1 flex-col">
      <PlayersHeader theme={theme} onBack={props.onBack} />

      <div className="flex flex-1 flex-col gap-4 px-4 pt-4 pb-6">
        {props.hasRoundInProgress ? (
          <NoticeBanner>Há uma rodada em andamento. Editar os jogadores a descarta.</NoticeBanner>
        ) : null}

        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[18px] font-semibold [font-variant-numeric:tabular-nums]">
            {players.length} de {maxPlayers} jogadores
          </p>
          <p className="text-[16px] text-text-muted">mínimo {minPlayers}</p>
        </div>

        {players.length === 0 ? (
          <EmptyPlayers theme={theme} minPlayers={minPlayers} />
        ) : (
          <PlayerList
            theme={theme}
            players={players}
            lastAddedId={props.lastAddedId}
            onEdit={props.onEditPlayer}
          />
        )}

        <Button
          variant={canContinue ? 'secondary' : 'primary'}
          fullWidth
          isDisabled={isRosterFull}
          onPress={props.onAddPlayer}
        >
          {isRosterFull ? (
            `Máximo de ${maxPlayers} jogadores`
          ) : (
            <>
              <PlusIcon size={22} />
              Adicionar jogador
            </>
          )}
        </Button>
      </div>

      <footer className="sticky bottom-0 z-10 flex flex-col gap-2 border-t-2 border-solid border-border/60 bg-bg px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {countHint ? (
          <p role="status" className="text-center text-[16px] font-semibold text-text-muted">
            {countHint}
          </p>
        ) : null}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          isDisabled={!canContinue}
          onPress={props.onContinue}
        >
          Continuar
        </Button>
      </footer>

      <PlayerSheet
        theme={theme}
        sheet={props.sheet}
        editingPlayer={props.editingPlayer}
        usedIcons={props.usedIcons}
        suggestedIcon={props.suggestedIcon}
        maxNameLength={props.maxNameLength}
        onClose={props.onCloseSheet}
        onSubmit={props.onSubmitPlayer}
        onValidateName={props.onValidateName}
        onRemove={props.onRemovePlayer}
      />
      <DiscardRoundSheet
        theme={theme}
        isOpen={props.isDiscardSheetOpen}
        onConfirm={props.onConfirmDiscard}
        onCancel={props.onCancelDiscard}
      />
    </main>
  );
}
