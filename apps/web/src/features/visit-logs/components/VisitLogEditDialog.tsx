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
import { useUpdateVisitLog } from '../hooks/useUpdateVisitLog';
import type { UpdateVisitLogInput, VisitLog } from '../types/visitLog';
import { getVisitLogPropertyTypeLabel } from '../utils/visitLogLabels';

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
          <Field
            htmlFor="edit-visit-log-title"
            label={t('visitLogs.editDialog.fields.title')}
          >
            <Input
              id="edit-visit-log-title"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder={t('visitLogs.editDialog.placeholders.title')}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              htmlFor="edit-visit-log-district"
              label={t('visitLogs.editDialog.fields.district')}
            >
              <Input
                id="edit-visit-log-district"
                value={form.district}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    district: event.target.value,
                  }))
                }
                placeholder={t('visitLogs.editDialog.placeholders.district')}
              />
            </Field>
            <Field
              htmlFor="edit-visit-log-price"
              label={t('visitLogs.editDialog.fields.price')}
            >
              <Input
                id="edit-visit-log-price"
                value={form.priceLabel}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    priceLabel: event.target.value,
                  }))
                }
                placeholder={t('visitLogs.editDialog.placeholders.price')}
              />
            </Field>
          </div>
          <Field
            htmlFor="edit-visit-log-property-type"
            label={t('visitLogs.editDialog.fields.propertyType')}
          >
            <Select
              id="edit-visit-log-property-type"
              value={form.propertyType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  propertyType: event.target
                    .value as UpdateVisitLogInput['propertyType'],
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
            htmlFor="edit-visit-log-summary"
            label={t('visitLogs.editDialog.fields.summary')}
          >
            <Textarea
              id="edit-visit-log-summary"
              value={form.summary}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  summary: event.target.value,
                }))
              }
              placeholder={t('visitLogs.editDialog.placeholders.summary')}
            />
          </Field>
          {mutation.isError ? (
            <p className="text-sm text-danger">
              {t('visitLogs.editDialog.error')}
            </p>
          ) : null}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t('visitLogs.editDialog.cancel')}</Button>
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
