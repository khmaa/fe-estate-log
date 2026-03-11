import type React from "react";
import { cn } from "../utils/cn";

type ButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cn(className)}>
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps };
