import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import { useUpdateVisitLog } from '../hooks/useUpdateVisitLog';
import { useVisitLogForm } from '../hooks/useVisitLogForm';
import type { UpdateVisitLogInput, VisitLog } from '../types/visitLog';
import { VisitLogFormActions } from './VisitLogFormActions';
import { VisitLogFormFields } from './VisitLogFormFields';

type VisitLogEditDialogProps = {
  log: VisitLog | null;
  onOpenChange: (open: boolean) => void;
  onUpdated: (visitLog: VisitLog) => void;
  open: boolean;
};

const toFormState = (log: VisitLog | null): UpdateVisitLogInput => ({
  id: log?.id ?? '',
  title: log?.title ?? '',
  district: log?.district ?? '',
  priceLabel: log?.priceLabel ?? '',
  propertyType: log?.propertyType ?? 'apartment',
  summary: log?.summary ?? '',
});

const VisitLogEditDialog = ({
  log,
  onOpenChange,
  onUpdated,
  open,
}: VisitLogEditDialogProps) => {
  const { form, isValid, resetForm, setForm } = useVisitLogForm(
    toFormState(log),
  );
  const mutation = useUpdateVisitLog();
  const { t } = useTranslation();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && mutation.isPending) {
      return;
    }

    if (!nextOpen) {
      resetForm();
      mutation.reset();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    const updatedVisitLog = await mutation.mutateAsync(form);
    onUpdated(updatedVisitLog);
    handleOpenChange(false);
  };

  const isUpdateDisabled = mutation.isPending || !isValid;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('visitLogs.editDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('visitLogs.editDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <VisitLogFormFields
            fieldIdPrefix="edit-visit-log"
            form={form}
            labelPrefix="editDialog"
            onChange={(nextForm) =>
              setForm((current) => ({
                ...current,
                ...nextForm,
              }))
            }
          />
          {mutation.isError ? (
            <p className="text-sm text-danger">
              {t('visitLogs.editDialog.error')}
            </p>
          ) : null}
        </DialogBody>
        <VisitLogFormActions
          cancelLabel={t('visitLogs.editDialog.cancel')}
          isPending={mutation.isPending}
          isSubmitDisabled={isUpdateDisabled}
          onSubmit={handleSubmit}
          submitLabel={t('visitLogs.editDialog.save')}
        />
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogEditDialog };
