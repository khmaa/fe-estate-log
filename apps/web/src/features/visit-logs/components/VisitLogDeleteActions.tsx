import { Button, DialogClose, DialogFooter } from '@shared-ui/core';

type VisitLogDeleteActionsProps = {
  cancelLabel: string;
  confirmLabel: string;
  confirmDisabledReason?: string;
  confirmDisabledReasonId?: string;
  isConfirmDisabled: boolean;
  isPending: boolean;
  onConfirm: () => void;
};

const VisitLogDeleteActions = ({
  cancelLabel,
  confirmLabel,
  confirmDisabledReason,
  confirmDisabledReasonId,
  isConfirmDisabled,
  isPending,
  onConfirm,
}: VisitLogDeleteActionsProps) => {
  const shouldDescribeConfirm =
    isConfirmDisabled &&
    Boolean(confirmDisabledReason && confirmDisabledReasonId);

  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost" disabled={isPending}>
          {cancelLabel}
        </Button>
      </DialogClose>
      <Button
        aria-describedby={
          shouldDescribeConfirm ? confirmDisabledReasonId : undefined
        }
        variant="secondary"
        className="bg-danger text-white hover:bg-danger"
        disabled={isConfirmDisabled}
        loading={isPending}
        onClick={onConfirm}
      >
        {confirmLabel}
      </Button>
      {shouldDescribeConfirm ? (
        <p id={confirmDisabledReasonId} className="sr-only">
          {confirmDisabledReason}
        </p>
      ) : null}
    </DialogFooter>
  );
};

export { VisitLogDeleteActions };
