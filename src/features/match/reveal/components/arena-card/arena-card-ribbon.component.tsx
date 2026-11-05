type ArenaCardRibbonProps = {
  children: string;
};

export function ArenaCardRibbon({ children }: ArenaCardRibbonProps) {
  return (
    <div className="arena-card__ribbon-wrap">
      <div className="arena-card__ribbon">{children}</div>
    </div>
  );
}
