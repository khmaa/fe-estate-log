import type React from "react";
import { cn } from "../utils/cn";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={cn(
        "inline-flex text-sm font-semibold leading-none text-foreground",
        className,
      )}
    />
  );
};

export { Label };
export type { LabelProps };
