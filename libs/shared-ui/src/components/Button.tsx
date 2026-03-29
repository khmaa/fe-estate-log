import type React from "react";
import { Spinner } from "./Spinner";
import { cn } from "../utils/cn";

const buttonVariants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-soft",
  secondary:
    "bg-secondary text-secondary-foreground ring-1 ring-border hover:bg-secondary-hover",
  ghost:
    "bg-transparent text-foreground shadow-none hover:bg-muted active:bg-surface-alt",
} as const;

const buttonSizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

type ButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = ({
  className,
  children,
  disabled,
  loading = false,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const spinnerSize = size === "lg" ? "md" : "sm";

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-ui font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
    >
      {loading ? (
        <span aria-hidden="true">
          <Spinner label="Loading" size={spinnerSize} />
        </span>
      ) : null}
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps, ButtonSize, ButtonVariant };
