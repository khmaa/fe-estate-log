import { cn } from '../utils/cn';

type RadioOption = {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

type RadioGroupProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  name: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  required?: boolean;
  value?: string;
  label: string;
};

const mergeDescribedBy = (existing: string | undefined, nextId: string) => {
  if (!existing) {
    return nextId;
  }

  return `${existing} ${nextId}`;
};

const RadioGroup = ({
  className,
  disabled = false,
  error,
  helperText,
  label,
  name,
  onValueChange,
  options,
  required = false,
  value,
}: RadioGroupProps) => {
  const groupId = `${name}-group`;
  const descriptionId = error
    ? `${name}-error`
    : helperText
      ? `${name}-helper`
      : undefined;

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div className="space-y-1">
        <p className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
          {label}
          {required ? (
            <span aria-hidden="true" className="text-danger">
              *
            </span>
          ) : null}
        </p>
        {error ? (
          <p id={`${name}-error`} className="text-sm text-danger">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${name}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        ) : null}
      </div>
      <div
        role="radiogroup"
        aria-disabled={disabled ? true : undefined}
        aria-describedby={descriptionId}
        aria-errormessage={error ? descriptionId : undefined}
        aria-invalid={error ? true : undefined}
        aria-labelledby={groupId}
        aria-required={required ? true : undefined}
        className="flex flex-col gap-3"
      >
        <span id={groupId} className="sr-only">
          {label}
        </span>
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          const isOptionDisabled = disabled || Boolean(option.disabled);
          const optionDescriptionId = option.description
            ? `${optionId}-description`
            : undefined;
          const finalDescribedBy = descriptionId
            ? mergeDescribedBy(optionDescriptionId, descriptionId)
            : optionDescriptionId;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                'flex items-start gap-3 rounded-ui border border-border bg-surface-alt px-4 py-3 transition-colors duration-200',
                isOptionDisabled && 'cursor-not-allowed opacity-70',
                value === option.value && 'border-primary bg-primary/5',
              )}
            >
              <input
                id={optionId}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                disabled={isOptionDisabled}
                required={required}
                onChange={() => {
                  if (!isOptionDisabled) {
                    onValueChange?.(option.value);
                  }
                }}
                aria-describedby={finalDescribedBy}
                className="mt-0.5 h-4 w-4 border border-border text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-sm font-semibold leading-5 text-foreground">
                  {option.label}
                </span>
                {option.description ? (
                  <span
                    id={`${optionId}-description`}
                    className="text-sm text-muted-foreground"
                  >
                    {option.description}
                  </span>
                ) : null}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export { RadioGroup };
export type { RadioGroupProps, RadioOption };
