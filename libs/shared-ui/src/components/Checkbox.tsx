import type React from 'react';
import { cn } from '../utils/cn';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded border border-border bg-surface text-primary shadow-soft transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus checked:border-primary checked:bg-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
        className,
      )}
    />
  );
};

export { Checkbox };
export type { CheckboxProps };
