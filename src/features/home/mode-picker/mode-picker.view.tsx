import { DiscardRoundSheet } from '#/features/home/mode-picker/components/discard-round-sheet/discard-round-sheet.component.tsx';
import { IntroNote } from '#/features/home/mode-picker/components/intro-note/intro-note.component.tsx';
import { ArenaModeCard } from '#/features/home/mode-picker/components/mode-card/arena-mode-card.component.tsx';
import { PartyModeCard } from '#/features/home/mode-picker/components/mode-card/party-mode-card.component.tsx';
import { ResumeStrip } from '#/features/home/mode-picker/components/resume-strip/resume-strip.component.tsx';
import { HOME_PRESENTATION } from '#/features/home/mode-picker/constants/mode-copy.constant.ts';
import type { ModePickerViewProps } from '#/features/home/mode-picker/types/mode-picker-view-props.type.ts';

/** The Início: app logo, presentation, resumable rounds and the two mode cards (RF-INI-001). */
export function ModePickerView({
  hasPlayed,
  resumeItems,
  onChooseMode,
  onContinueRound,
  onAskDiscard,
  discardTarget,
  onCancelDiscard,
  onConfirmDiscard,
}: ModePickerViewProps) {
  return (
    <main className="flex flex-1 flex-col px-4 pt-[calc(24px+env(safe-area-inset-top))] pb-[calc(32px+env(safe-area-inset-bottom))]">
      <div className="my-auto flex flex-col gap-6">
        <header className="flex flex-col items-center gap-4 text-center">
          <img
            src="/icons/favicon.svg"
            alt=""
            width={72}
            height={72}
            className="size-[72px] rounded-lg shadow-[0_4px_0_rgb(0_0_0/0.35)]"
          />
          <h1 className="sr-only">Início</h1>
          <p className="font-display text-[24px] leading-tight font-semibold text-balance">
            {HOME_PRESENTATION}
          </p>
        </header>

        {resumeItems.length > 0 ? (
          <div className="flex flex-col gap-4">
            {resumeItems.map((item) => (
              <ResumeStrip
                key={item.mode}
                item={item}
                onContinue={() => onContinueRound(item.mode)}
                onDiscard={() => onAskDiscard(item.mode)}
              />
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-6">
          <ArenaModeCard onPress={() => onChooseMode('arena')} />
          <PartyModeCard onPress={() => onChooseMode('party')} />
        </div>

        <IntroNote startCollapsed={hasPlayed} />
      </div>

      <DiscardRoundSheet
        target={discardTarget}
        onCancel={onCancelDiscard}
        onConfirm={onConfirmDiscard}
      />
    </main>
  );
}
