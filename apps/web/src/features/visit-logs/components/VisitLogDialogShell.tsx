import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared-ui/core';
import type { ReactNode } from 'react';

type VisitLogDialogShellProps = {
  actions: ReactNode;
  children: ReactNode;
  description: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
};

const VisitLogDialogShell = ({
  actions,
  children,
  description,
  onOpenChange,
  open,
  title,
}: VisitLogDialogShellProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        {actions}
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogDialogShell };
