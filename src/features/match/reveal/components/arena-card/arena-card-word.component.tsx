import { getWordFontSize } from '#/features/match/reveal/components/arena-card/utils/get-word-font-size.util.ts';

type ArenaCardWordProps = {
  text: string;
};

// The big lettering of the front: any text, at most two lines, sized to fit the card width.
export function ArenaCardWord({ text }: ArenaCardWordProps) {
  return (
    <p className="arena-card__word" style={{ fontSize: `${getWordFontSize(text)}cqw` }}>
      {text}
    </p>
  );
}
