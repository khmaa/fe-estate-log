import { Button, DialogClose, DialogFooter } from '@shared-ui/core';

type VisitLogFormActionsProps = {
  cancelLabel: string;
  isPending: boolean;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  submitDisabledReason?: string;
  submitDisabledReasonId?: string;
  submitLabel: string;
};

const VisitLogFormActions = ({
  cancelLabel,
  isPending,
  isSubmitDisabled,
  onSubmit,
  submitDisabledReason,
  submitDisabledReasonId,
  submitLabel,
}: VisitLogFormActionsProps) => {
  const shouldDescribeSubmit =
    isSubmitDisabled && Boolean(submitDisabledReason && submitDisabledReasonId);

  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost" disabled={isPending}>
          {cancelLabel}
        </Button>
      </DialogClose>
      <Button
        aria-describedby={
          shouldDescribeSubmit ? submitDisabledReasonId : undefined
        }
        disabled={isSubmitDisabled}
        loading={isPending}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
      {shouldDescribeSubmit ? (
        <p id={submitDisabledReasonId} className="sr-only">
          {submitDisabledReason}
        </p>
      ) : null}
    </DialogFooter>
  );
};

export { VisitLogFormActions };
