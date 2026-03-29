import type React from 'react';
import { cn } from '../utils/cn';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      {...props}
      className={cn(
        'flex min-h-28 w-full rounded-ui border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-soft transition-colors duration-200 placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger-soft/40 aria-[invalid=true]:focus-visible:outline-danger disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
        className,
      )}
    />
  );
};

export { Textarea };
export type { TextareaProps };
