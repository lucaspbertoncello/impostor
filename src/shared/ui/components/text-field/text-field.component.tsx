import { FieldError, Input, Label, TextField as AriaTextField } from 'react-aria-components';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Shows the "n/max" counter and stops typing at the limit. */
  maxLength?: number;
  /** Error message. When set, the field is invalid and the message is announced. */
  errorMessage?: string;
  placeholder?: string;
  autoFocus?: boolean;
  /** Called on Enter (RF-JOG-002: Enter adds the player). */
  onSubmit?: () => void;
};

/**
 * Text field with label, optional counter and error. Text is 18 px (16 px or more keeps iOS
 * from zooming on focus). The error also gets a "!" mark, so it never relies on color alone.
 */
export function TextField({
  label,
  value,
  onChange,
  maxLength,
  errorMessage,
  placeholder,
  autoFocus,
  onSubmit,
}: TextFieldProps) {
  return (
    <AriaTextField
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      autoFocus={autoFocus}
      isInvalid={Boolean(errorMessage)}
      validationBehavior="aria"
      onKeyDown={(event) => {
        if (event.key === 'Enter' && onSubmit) onSubmit();
      }}
      className="group flex flex-col gap-2"
    >
      <div className="flex items-baseline justify-between gap-3">
        <Label className="text-[18px] font-semibold">{label}</Label>
        {maxLength === undefined ? null : (
          <span
            aria-hidden="true"
            className="text-[14px] text-text-muted [font-variant-numeric:tabular-nums]"
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <Input
        placeholder={placeholder}
        className="h-14 rounded-md border-solid border-border bg-surface-strong px-4 text-[18px] text-text outline-none [border-width:var(--theme-outline-width)] placeholder:text-text-muted/70 data-[focused]:border-ring data-[invalid]:border-danger-text"
      />
      {errorMessage ? (
        <FieldError className="flex items-center gap-2 text-[15px] font-semibold text-danger-text">
          <span
            aria-hidden="true"
            className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-danger text-[13px] text-text-on-danger"
          >
            !
          </span>
          {errorMessage}
        </FieldError>
      ) : null}
    </AriaTextField>
  );
}
