import { Button } from '@shared-ui/core';

type VisitLogDetailActionsProps = {
  backLabel: string;
  deleteLabel: string;
  editLabel: string;
  isActionDisabled: boolean;
  onBack: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const VisitLogDetailActions = ({
  backLabel,
  deleteLabel,
  editLabel,
  isActionDisabled,
  onBack,
  onDelete,
  onEdit,
}: VisitLogDetailActionsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Button variant="ghost" onClick={onBack}>
        {backLabel}
      </Button>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          disabled={isActionDisabled}
          onClick={onEdit}
        >
          {editLabel}
        </Button>
        <Button
          variant="ghost"
          className="text-danger hover:bg-danger-soft/50"
          disabled={isActionDisabled}
          onClick={onDelete}
        >
          {deleteLabel}
        </Button>
      </div>
    </div>
  );
};

export { VisitLogDetailActions };
