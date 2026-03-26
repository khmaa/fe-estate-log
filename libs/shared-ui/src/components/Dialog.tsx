import * as DialogPrimitive from "@radix-ui/react-dialog";
import type React from "react";
import { cn } from "../utils/cn";

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;
type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>;
type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;
type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>;
type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>;
type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content>;
type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;
type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;
type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;
type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => {
  return (
    <DialogPrimitive.Overlay
      {...props}
      className={cn(
        "fixed inset-0 z-50 bg-foreground/35 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
    />
  );
};

const DialogContent = ({
  className,
  children,
  ...props
}: DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        {...props}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-[32px] border border-border bg-surface p-8 shadow-soft outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col gap-3 text-left", className)}
    />
  );
};

const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      {...props}
      className={cn(
        "text-2xl font-semibold tracking-tight text-foreground",
        className
      )}
    />
  );
};

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Description
      {...props}
      className={cn("text-sm leading-6 text-muted-foreground", className)}
    />
  );
};

const DialogBody = ({ className, ...props }: DialogBodyProps) => {
  return <div {...props} className={cn("flex flex-col gap-4", className)} />;
};

const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className
      )}
    />
  );
};

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
export type {
  DialogBodyProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
};
