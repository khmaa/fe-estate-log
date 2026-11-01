import React from 'react';
import { cn } from '../utils/cn';
import { Label } from './Label';
import { Switch } from './Switch';

type SwitchFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  className?: string;
  error?: string;
  helperText?: string;
  label: string;
  switchClassName?: string;
};

const mergeDescribedBy = (existing: string | undefined, nextId: string) => {
  if (!existing) {
    return nextId;
  }

  return `${existing} ${nextId}`;
};

const SwitchField = ({
  className,
  error,
  helperText,
  id,
  label,
  switchClassName,
  ...props
}: SwitchFieldProps) => {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const descriptionId = error
    ? `${fieldId}-error`
    : helperText
      ? `${fieldId}-helper`
      : undefined;

  return (
    <div
      className={cn(
        'flex w-full items-start justify-between gap-4',
        props.disabled && 'cursor-not-allowed opacity-70',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Label htmlFor={fieldId} className="leading-5">
          {label}
          {props.required ? (
            <span aria-hidden="true" className="ml-1 text-danger">
              *
            </span>
          ) : null}
        </Label>
        {error ? (
          <p id={`${fieldId}-error`} className="text-sm text-danger">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${fieldId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        ) : null}
      </div>
      <Switch
        {...props}
        id={fieldId}
        aria-describedby={
          descriptionId
            ? mergeDescribedBy(props['aria-describedby'], descriptionId)
            : props['aria-describedby']
        }
        aria-errormessage={error ? descriptionId : props['aria-errormessage']}
        aria-invalid={error ? true : props['aria-invalid']}
        className={cn('mt-0.5 shrink-0', switchClassName)}
        onChange={(event) => {
          if (!props.disabled) {
            props.onChange?.(event);
          }
        }}
      />
    </div>
  );
};

export { SwitchField };
export type { SwitchFieldProps };
