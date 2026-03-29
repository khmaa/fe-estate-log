import type React from 'react';
import { cn } from '../utils/cn';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ className, children, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={cn(
        'flex h-11 w-full rounded-ui border border-border bg-surface px-4 text-sm text-foreground shadow-soft transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger-soft/40 aria-[invalid=true]:focus-visible:outline-danger disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
        className,
      )}
    >
      {children}
    </select>
  );
};

export { Select };
export type { SelectProps };
