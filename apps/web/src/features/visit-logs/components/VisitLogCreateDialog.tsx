import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import { useCreateVisitLog } from '../hooks/useCreateVisitLog';
import { useVisitLogForm } from '../hooks/useVisitLogForm';
import type { CreateVisitLogInput, VisitLog } from '../types/visitLog';
import { VisitLogFormActions } from './VisitLogFormActions';
import { VisitLogFormFields } from './VisitLogFormFields';

type VisitLogCreateDialogProps = {
  onCreated: (visitLog: VisitLog) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const initialFormState: CreateVisitLogInput = {
  title: '',
  district: '',
  priceLabel: '',
  propertyType: 'apartment',
  summary: '',
};

const VisitLogCreateDialog = ({
  onCreated,
  onOpenChange,
  open,
}: VisitLogCreateDialogProps) => {
  const { form, isValid, resetForm, setForm } =
    useVisitLogForm(initialFormState);
  const mutation = useCreateVisitLog();
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
    const createdVisitLog = await mutation.mutateAsync(form);
    onCreated(createdVisitLog);
    handleOpenChange(false);
  };

  const isCreateDisabled = mutation.isPending || !isValid;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('visitLogs.createDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('visitLogs.createDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <VisitLogFormFields
            fieldIdPrefix="create-visit-log"
            form={form}
            labelPrefix="createDialog"
            onChange={setForm}
          />
          {mutation.isError ? (
            <p className="text-sm text-danger">
              {t('visitLogs.createDialog.error')}
            </p>
          ) : null}
        </DialogBody>
        <VisitLogFormActions
          cancelLabel={t('visitLogs.createDialog.cancel')}
          isPending={mutation.isPending}
          isSubmitDisabled={isCreateDisabled}
          onSubmit={handleSubmit}
          submitLabel={t('visitLogs.createDialog.create')}
        />
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogCreateDialog };
