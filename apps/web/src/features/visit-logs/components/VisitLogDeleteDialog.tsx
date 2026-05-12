import { Button, DialogClose, DialogFooter } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import { useDeleteVisitLog } from '../hooks/useDeleteVisitLog';
import type { VisitLog } from '../types/visitLog';
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={mutation.isPending}>
              {t('visitLogs.deleteDialog.cancel')}
            </Button>
          </DialogClose>
          <Button
            variant="secondary"
            className="bg-danger text-white hover:bg-danger"
            disabled={mutation.isPending || !log}
            loading={mutation.isPending}
            onClick={log ? () => handleConfirm(log) : undefined}
          >
            {t('visitLogs.deleteDialog.confirm')}
          </Button>
        </DialogFooter>
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
