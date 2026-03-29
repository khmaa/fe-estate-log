import React from 'react';
import { cn } from '../utils/cn';
import { Checkbox } from './Checkbox';
import { Label } from './Label';

type CheckboxFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  checkboxClassName?: string;
  className?: string;
  error?: string;
  helperText?: string;
  label: string;
};

const mergeDescribedBy = (existing: string | undefined, nextId: string) => {
  if (!existing) {
    return nextId;
  }

  return `${existing} ${nextId}`;
};

const CheckboxField = ({
  checkboxClassName,
  className,
  error,
  helperText,
  id,
  label,
  ...props
}: CheckboxFieldProps) => {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const descriptionId = error
    ? `${fieldId}-error`
    : helperText
      ? `${fieldId}-helper`
      : undefined;

  return (
    <div className={cn('flex w-full items-start gap-3', className)}>
      <Checkbox
        {...props}
        id={fieldId}
        aria-describedby={
          descriptionId
            ? mergeDescribedBy(props['aria-describedby'], descriptionId)
            : props['aria-describedby']
        }
        aria-invalid={error ? true : props['aria-invalid']}
        className={cn('mt-0.5', checkboxClassName)}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Label htmlFor={fieldId} className="leading-5">
          {label}
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
    </div>
  );
};

export { CheckboxField };
export type { CheckboxFieldProps };
