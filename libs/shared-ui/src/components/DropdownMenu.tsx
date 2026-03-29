import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type React from 'react';
import { cn } from '../utils/cn';

type DropdownMenuProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Root
>;
type DropdownMenuTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
>;
type DropdownMenuPortalProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Portal
>;
type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;
type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
>;
type DropdownMenuLabelProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Label
>;
type DropdownMenuSeparatorProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Separator
>;

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuContent = ({
  className,
  sideOffset = 10,
  ...props
}: DropdownMenuContentProps) => {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        {...props}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-52 rounded-[24px] border border-border bg-surface p-2 shadow-soft outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          className,
        )}
      />
    </DropdownMenuPortal>
  );
};

const DropdownMenuItem = ({ className, ...props }: DropdownMenuItemProps) => {
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      className={cn(
        'flex cursor-default select-none items-center rounded-ui px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
    />
  );
};

const DropdownMenuLabel = ({ className, ...props }: DropdownMenuLabelProps) => {
  return (
    <DropdownMenuPrimitive.Label
      {...props}
      className={cn(
        'px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground',
        className,
      )}
    />
  );
};

const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return (
    <DropdownMenuPrimitive.Separator
      {...props}
      className={cn('my-2 h-px bg-border', className)}
    />
  );
};

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
export type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuProps,
  DropdownMenuSeparatorProps,
  DropdownMenuTriggerProps,
};
