import * as ToastPrimitive from "@radix-ui/react-toast";
import type React from "react";
import { cn } from "../utils/cn";

const toastVariants = {
  info: "border-info bg-surface text-foreground",
  success: "border-success bg-surface text-foreground",
  error: "border-danger bg-surface text-foreground",
} as const;

type ToastVariant = keyof typeof toastVariants;

type ToastProviderProps = React.ComponentProps<typeof ToastPrimitive.Provider>;
type ToastViewportProps = React.ComponentProps<typeof ToastPrimitive.Viewport>;
type ToastProps = React.ComponentProps<typeof ToastPrimitive.Root> & {
  variant?: ToastVariant;
};
type ToastTitleProps = React.ComponentProps<typeof ToastPrimitive.Title>;
type ToastDescriptionProps = React.ComponentProps<
  typeof ToastPrimitive.Description
>;
type ToastCloseProps = React.ComponentProps<typeof ToastPrimitive.Close>;

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = ({ className, ...props }: ToastViewportProps) => {
  return (
    <ToastPrimitive.Viewport
      {...props}
      className={cn(
        "fixed right-4 top-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 outline-none sm:right-6 sm:top-6",
        className
      )}
    />
  );
};

const Toast = ({ className, variant = "info", ...props }: ToastProps) => {
  return (
    <ToastPrimitive.Root
      {...props}
      className={cn(
        "grid gap-2 rounded-[24px] border p-4 shadow-soft data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-full",
        toastVariants[variant],
        className
      )}
    />
  );
};

const ToastTitle = ({ className, ...props }: ToastTitleProps) => {
  return (
    <ToastPrimitive.Title
      {...props}
      className={cn("text-sm font-semibold leading-5", className)}
    />
  );
};

const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => {
  return (
    <ToastPrimitive.Description
      {...props}
      className={cn("text-sm leading-6 text-muted-foreground", className)}
    />
  );
};

const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  return (
    <ToastPrimitive.Close
      {...props}
      className={cn(
        "inline-flex h-8 items-center justify-center self-start rounded-ui px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        className
      )}
    />
  );
};

export {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};
export type {
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
  ToastVariant,
  ToastViewportProps,
};
