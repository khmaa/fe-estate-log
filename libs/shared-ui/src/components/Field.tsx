import React from 'react';
import { cn } from '../utils/cn';
import { Label } from './Label';

type FieldControlProps = {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
};

type FieldProps = {
  children: React.ReactElement<FieldControlProps>;
  className?: string;
  error?: string;
  helperText?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
};

const mergeDescribedBy = (
  existing: FieldControlProps['aria-describedby'],
  nextId: string,
) => {
  if (!existing) {
    return nextId;
  }

  return `${existing} ${nextId}`;
};

const Field = ({
  children,
  className,
  error,
  helperText,
  htmlFor,
  label,
  required = false,
}: FieldProps) => {
  const descriptionId = error
    ? `${htmlFor}-error`
    : helperText
      ? `${htmlFor}-helper`
      : undefined;
  const control = React.cloneElement(children, {
    id: children.props.id ?? htmlFor,
    'aria-describedby': descriptionId
      ? mergeDescribedBy(children.props['aria-describedby'], descriptionId)
      : children.props['aria-describedby'],
    'aria-invalid': error ? true : children.props['aria-invalid'],
  });

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="inline-flex items-center gap-1">
        <Label htmlFor={htmlFor}>{label}</Label>
        {required ? (
          <span className="text-sm font-semibold text-danger">*</span>
        ) : null}
      </div>
      {control}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${htmlFor}-helper`} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export { Field };
export type { FieldProps };
