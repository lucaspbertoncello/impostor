type ArenaLogoProps = {
  className?: string;
  title?: string;
};

// Stub: plain text. The real logo (text converted to paths) replaces it and keeps the props.
export function ArenaLogo({ className, title = 'Impostor' }: ArenaLogoProps) {
  return (
    <span className={className} role="img" aria-label={title}>
      IMPOSTOR
    </span>
  );
}
