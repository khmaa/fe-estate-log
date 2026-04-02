import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared-ui/core';
import { useDeleteVisitLog } from '../hooks/useDeleteVisitLog';
import type { VisitLog } from '../types/visitLog';

type VisitLogDeleteDialogProps = {
  log: VisitLog | null;
  onDeleted: (visitLogId: string) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const VisitLogDeleteDialog = ({
  log,
  onDeleted,
  onOpenChange,
  open,
}: VisitLogDeleteDialogProps) => {
  const mutation = useDeleteVisitLog();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      mutation.reset();
    }
    onOpenChange(nextOpen);
  };

  const handleConfirm = async () => {
    await mutation.mutateAsync(log.id);
    onDeleted(log.id);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete visit log</DialogTitle>
          <DialogDescription>
            This action removes the selected visit log from the current
            workspace.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              {log ? (
                <>
                  Are you sure you want to delete <strong>{log.title}</strong>?
                </>
              ) : (
                'Are you sure you want to delete this visit log?'
              )}
            </p>
            <p>This action cannot be undone.</p>
            {mutation.isError ? (
              <p className="text-danger">Failed to delete the visit log.</p>
            ) : null}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            variant="secondary"
            className="bg-danger text-white hover:bg-danger"
            disabled={mutation.isPending || !log}
            loading={mutation.isPending}
            onClick={log ? handleConfirm : undefined}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogDeleteDialog };
