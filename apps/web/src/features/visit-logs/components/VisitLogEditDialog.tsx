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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateVisitLog } from '../hooks/useUpdateVisitLog';
import type { UpdateVisitLogInput, VisitLog } from '../types/visitLog';
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
  const [form, setForm] = useState<UpdateVisitLogInput>(toFormState(log));
  const mutation = useUpdateVisitLog();
  const { t } = useTranslation();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && mutation.isPending) {
      return;
    }

    if (!nextOpen) {
      setForm(toFormState(log));
      mutation.reset();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    const updatedVisitLog = await mutation.mutateAsync(form);
    onUpdated(updatedVisitLog);
    handleOpenChange(false);
  };

  const isUpdateDisabled =
    mutation.isPending ||
    !form.title.trim() ||
    !form.district.trim() ||
    !form.priceLabel.trim() ||
    !form.summary.trim();

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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={mutation.isPending}>
              {t('visitLogs.editDialog.cancel')}
            </Button>
          </DialogClose>
          <Button
            disabled={isUpdateDisabled}
            loading={mutation.isPending}
            onClick={handleSubmit}
          >
            {t('visitLogs.editDialog.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogEditDialog };
