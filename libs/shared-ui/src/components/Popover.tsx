import * as PopoverPrimitive from '@radix-ui/react-popover';
import type React from 'react';
import { cn } from '../utils/cn';

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;
type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;
type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>;
type PopoverPortalProps = React.ComponentProps<typeof PopoverPrimitive.Portal>;
type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;
type PopoverCloseProps = React.ComponentProps<typeof PopoverPrimitive.Close>;

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverPortal = PopoverPrimitive.Portal;
const PopoverClose = PopoverPrimitive.Close;

const PopoverContent = ({
  className,
  sideOffset = 10,
  ...props
}: PopoverContentProps) => {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        {...props}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-[min(24rem,calc(100vw-2rem))] rounded-[28px] border border-border bg-surface p-5 shadow-soft outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          className,
        )}
      />
    </PopoverPortal>
  );
};

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
};
export type {
  PopoverAnchorProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverPortalProps,
  PopoverProps,
  PopoverTriggerProps,
};
