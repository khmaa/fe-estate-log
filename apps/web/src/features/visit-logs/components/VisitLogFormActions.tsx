import { Button, DialogClose, DialogFooter } from '@shared-ui/core';

type VisitLogFormActionsProps = {
  cancelLabel: string;
  isPending: boolean;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  submitLabel: string;
};

const VisitLogFormActions = ({
  cancelLabel,
  isPending,
  isSubmitDisabled,
  onSubmit,
  submitLabel,
}: VisitLogFormActionsProps) => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost" disabled={isPending}>
          {cancelLabel}
        </Button>
      </DialogClose>
      <Button
        disabled={isSubmitDisabled}
        loading={isPending}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
    </DialogFooter>
  );
};

export { VisitLogFormActions };
