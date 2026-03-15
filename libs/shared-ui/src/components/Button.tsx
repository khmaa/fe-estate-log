import type React from "react";
import { cn } from "../utils/cn";

type ButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-ui bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors duration-200 hover:bg-primary-hover active:bg-primary-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
        className,
      )}
    >
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps };
