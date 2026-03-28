import type React from "react";
import { cn } from "../utils/cn";

const spinnerSizes = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-[3px]",
} as const;

type SpinnerSize = keyof typeof spinnerSizes;

type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  size?: SpinnerSize;
};

const Spinner = ({
  className,
  label = "Loading",
  size = "md",
  ...props
}: SpinnerProps) => {
  return (
    <span
      {...props}
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "animate-spin rounded-full border-muted border-t-foreground",
          spinnerSizes[size]
        )}
      />
    </span>
  );
};

export { Spinner };
export type { SpinnerProps, SpinnerSize };
