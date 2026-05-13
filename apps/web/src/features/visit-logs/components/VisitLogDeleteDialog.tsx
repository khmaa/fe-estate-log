import { useTranslation } from 'react-i18next';
import { useDeleteVisitLog } from '../hooks/useDeleteVisitLog';
import type { VisitLog } from '../types/visitLog';
import { VisitLogDeleteActions } from './VisitLogDeleteActions';
import { VisitLogDialogShell } from './VisitLogDialogShell';

type VisitLogDeleteDialogProps = {
  log: VisitLog | null;
  onDeleted: (visitLog: VisitLog) => void;
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
  const { t } = useTranslation();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && mutation.isPending) {
      return;
    }

    if (!nextOpen) {
      mutation.reset();
    }
    onOpenChange(nextOpen);
  };

  const handleConfirm = async (visitLog: VisitLog) => {
    await mutation.mutateAsync(visitLog.id);
    onDeleted(visitLog);
    handleOpenChange(false);
  };

  return (
    <VisitLogDialogShell
      actions={
        <VisitLogDeleteActions
          cancelLabel={t('visitLogs.deleteDialog.cancel')}
          confirmLabel={t('visitLogs.deleteDialog.confirm')}
          isConfirmDisabled={mutation.isPending || !log}
          isPending={mutation.isPending}
          onConfirm={log ? () => handleConfirm(log) : () => undefined}
        />
      }
      description={t('visitLogs.deleteDialog.description')}
      onOpenChange={handleOpenChange}
      open={open}
      title={t('visitLogs.deleteDialog.title')}
    >
      <div className="space-y-3 text-sm leading-6 text-muted-foreground">
        <p>
          {log
            ? t('visitLogs.deleteDialog.message.withTitle', {
                title: log.title,
              })
            : t('visitLogs.deleteDialog.message.fallback')}
        </p>
        <p>{t('visitLogs.deleteDialog.warning')}</p>
        {mutation.isError ? (
          <p className="text-danger">{t('visitLogs.deleteDialog.error')}</p>
        ) : null}
      </div>
    </VisitLogDialogShell>
  );
};

export { VisitLogDeleteDialog };
