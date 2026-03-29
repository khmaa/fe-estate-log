import type React from 'react';
import { cn } from '../utils/cn';

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Switch = ({ className, type = 'checkbox', ...props }: SwitchProps) => {
  return (
    <label className={cn('relative inline-flex items-center', className)}>
      <input {...props} type={type} className="peer sr-only" />
      <span className="h-7 w-12 rounded-full bg-muted transition-colors duration-200 peer-checked:bg-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus peer-disabled:cursor-not-allowed peer-disabled:opacity-70" />
      <span className="absolute left-1 h-5 w-5 rounded-full bg-surface-alt shadow transition-transform duration-200 peer-checked:translate-x-5 peer-disabled:bg-surface" />
    </label>
  );
};

export { Switch };
export type { SwitchProps };
