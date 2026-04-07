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
  Field,
  Input,
  Select,
  Textarea,
} from '@shared-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateVisitLog } from '../hooks/useCreateVisitLog';
import type { CreateVisitLogInput, VisitLog } from '../types/visitLog';
import { getVisitLogPropertyTypeLabel } from '../utils/visitLogLabels';

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
  const [form, setForm] = useState<CreateVisitLogInput>(initialFormState);
  const mutation = useCreateVisitLog();
  const { t } = useTranslation();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setForm(initialFormState);
      mutation.reset();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    const createdVisitLog = await mutation.mutateAsync(form);
    onCreated(createdVisitLog);
    handleOpenChange(false);
  };

  const isCreateDisabled =
    mutation.isPending ||
    !form.title.trim() ||
    !form.district.trim() ||
    !form.priceLabel.trim() ||
    !form.summary.trim();

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
          <Field
            htmlFor="create-visit-log-title"
            label={t('visitLogs.createDialog.fields.title')}
          >
            <Input
              id="create-visit-log-title"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder={t('visitLogs.createDialog.placeholders.title')}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              htmlFor="create-visit-log-district"
              label={t('visitLogs.createDialog.fields.district')}
            >
              <Input
                id="create-visit-log-district"
                value={form.district}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    district: event.target.value,
                  }))
                }
                placeholder={t('visitLogs.createDialog.placeholders.district')}
              />
            </Field>
            <Field
              htmlFor="create-visit-log-price"
              label={t('visitLogs.createDialog.fields.price')}
            >
              <Input
                id="create-visit-log-price"
                value={form.priceLabel}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    priceLabel: event.target.value,
                  }))
                }
                placeholder={t('visitLogs.createDialog.placeholders.price')}
              />
            </Field>
          </div>
          <Field
            htmlFor="create-visit-log-property-type"
            label={t('visitLogs.createDialog.fields.propertyType')}
          >
            <Select
              id="create-visit-log-property-type"
              value={form.propertyType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  propertyType: event.target
                    .value as CreateVisitLogInput['propertyType'],
                }))
              }
            >
              <option value="apartment">
                {getVisitLogPropertyTypeLabel(t, 'apartment')}
              </option>
              <option value="office">
                {getVisitLogPropertyTypeLabel(t, 'office')}
              </option>
              <option value="retail">
                {getVisitLogPropertyTypeLabel(t, 'retail')}
              </option>
            </Select>
          </Field>
          <Field
            htmlFor="create-visit-log-summary"
            label={t('visitLogs.createDialog.fields.summary')}
          >
            <Textarea
              id="create-visit-log-summary"
              value={form.summary}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  summary: event.target.value,
                }))
              }
              placeholder={t('visitLogs.createDialog.placeholders.summary')}
            />
          </Field>
          {mutation.isError ? (
            <p className="text-sm text-danger">
              {t('visitLogs.createDialog.error')}
            </p>
          ) : null}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">
              {t('visitLogs.createDialog.cancel')}
            </Button>
          </DialogClose>
          <Button
            disabled={isCreateDisabled}
            loading={mutation.isPending}
            onClick={handleSubmit}
          >
            {t('visitLogs.createDialog.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogCreateDialog };
