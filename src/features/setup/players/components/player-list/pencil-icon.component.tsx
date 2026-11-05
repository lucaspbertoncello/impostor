type PencilIconProps = { size?: number; className?: string };

export function PencilIcon({ size = 24, className }: PencilIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 20l1.2-4.6L16.6 4a2.2 2.2 0 013.1 3.1L8.3 18.6 4 20z" />
    </svg>
  );
}
