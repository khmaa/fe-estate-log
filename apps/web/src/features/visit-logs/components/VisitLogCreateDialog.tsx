import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateVisitLog } from '../hooks/useCreateVisitLog';
import { useVisitLogForm } from '../hooks/useVisitLogForm';
import type { CreateVisitLogInput, VisitLog } from '../types/visitLog';
import { VisitLogDialogShell } from './VisitLogDialogShell';
import { VisitLogFormActions } from './VisitLogFormActions';
import { VisitLogFormFields } from './VisitLogFormFields';

type VisitLogCreateDialogProps = {
  initialValues?: CreateVisitLogInput;
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
  initialValues,
  onCreated,
  onOpenChange,
  open,
}: VisitLogCreateDialogProps) => {
  const initialForm = initialValues ?? initialFormState;
  const { form, isValid, resetForm, setForm } = useVisitLogForm(initialForm);
  const mutation = useCreateVisitLog();
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      setForm(initialForm);
    }
  }, [initialForm, open, setForm]);

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
    <VisitLogDialogShell
      actions={
        <VisitLogFormActions
          cancelLabel={t('visitLogs.createDialog.cancel')}
          isPending={mutation.isPending}
          isSubmitDisabled={isCreateDisabled}
          onSubmit={handleSubmit}
          submitLabel={t('visitLogs.createDialog.create')}
        />
      }
      description={t('visitLogs.createDialog.description')}
      onOpenChange={handleOpenChange}
      open={open}
      title={t('visitLogs.createDialog.title')}
    >
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
    </VisitLogDialogShell>
  );
};

export { VisitLogCreateDialog };
