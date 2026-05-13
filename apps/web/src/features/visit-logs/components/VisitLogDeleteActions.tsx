import { Button, DialogClose, DialogFooter } from '@shared-ui/core';

type VisitLogDeleteActionsProps = {
  cancelLabel: string;
  confirmLabel: string;
  isConfirmDisabled: boolean;
  isPending: boolean;
  onConfirm: () => void;
};

const VisitLogDeleteActions = ({
  cancelLabel,
  confirmLabel,
  isConfirmDisabled,
  isPending,
  onConfirm,
}: VisitLogDeleteActionsProps) => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost" disabled={isPending}>
          {cancelLabel}
        </Button>
      </DialogClose>
      <Button
        variant="secondary"
        className="bg-danger text-white hover:bg-danger"
        disabled={isConfirmDisabled}
        loading={isPending}
        onClick={onConfirm}
      >
        {confirmLabel}
      </Button>
    </DialogFooter>
  );
};

export { VisitLogDeleteActions };
