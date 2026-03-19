import type React from "react";
import { cn } from "../utils/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[28px] border border-border bg-surface p-8 shadow-soft backdrop-blur",
        className
      )}
    />
  );
};

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return <div {...props} className={cn("flex flex-col gap-3", className)} />;
};

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <h2
      {...props}
      className={cn(
        "text-3xl font-semibold tracking-tight text-foreground",
        className
      )}
    />
  );
};

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <p
      {...props}
      className={cn("text-base text-muted-foreground", className)}
    />
  );
};

const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div {...props} className={cn("flex flex-col gap-6", className)} />;
};

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div
      {...props}
      className={cn("flex flex-wrap items-center gap-4", className)}
    />
  );
};

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
export type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
};
