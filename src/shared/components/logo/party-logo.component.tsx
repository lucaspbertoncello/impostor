type PartyLogoProps = {
  variant: 'on-dark' | 'on-light';
  className?: string;
  title?: string;
};

// Stub: plain text. The real logo (text converted to paths) replaces it and keeps the props.
export function PartyLogo({ variant, className, title = 'Impostor' }: PartyLogoProps) {
  return (
    <span
      className={className}
      role="img"
      aria-label={title}
      style={{ color: variant === 'on-dark' ? '#ffffff' : '#1f1147' }}
    >
      Impostor
    </span>
  );
}
