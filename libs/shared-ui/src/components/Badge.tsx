import type React from "react";
import { cn } from "../utils/cn";

const badgeVariants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground ring-1 ring-border",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-danger-soft text-danger",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        badgeVariants[variant],
        className
      )}
    />
  );
};

export { Badge };
export type { BadgeProps, BadgeVariant };
