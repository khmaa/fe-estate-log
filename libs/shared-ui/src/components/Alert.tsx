import type React from 'react';
import { cn } from '../utils/cn';

const alertVariants = {
  info: 'border-info bg-info-soft text-foreground',
  success: 'border-success bg-success-soft text-foreground',
  warning: 'border-warning bg-warning-soft text-foreground',
  error: 'border-danger bg-danger-soft text-foreground',
} as const;

type AlertVariant = keyof typeof alertVariants;

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
};

type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const Alert = ({ className, variant = 'info', ...props }: AlertProps) => {
  return (
    <div
      {...props}
      role="alert"
      className={cn(
        'flex flex-col gap-2 rounded-ui border px-4 py-4 shadow-soft',
        alertVariants[variant],
        className,
      )}
    />
  );
};

const AlertTitle = ({ className, ...props }: AlertTitleProps) => {
  return (
    <h3
      {...props}
      className={cn('text-sm font-semibold leading-5', className)}
    />
  );
};

const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => {
  return (
    <p
      {...props}
      className={cn('text-sm leading-6 text-muted-foreground', className)}
    />
  );
};

export { Alert, AlertDescription, AlertTitle };
export type {
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
  AlertVariant,
};
