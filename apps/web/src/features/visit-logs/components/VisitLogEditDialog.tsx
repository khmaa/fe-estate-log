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
import { useUpdateVisitLog } from '../hooks/useUpdateVisitLog';
import type { UpdateVisitLogInput, VisitLog } from '../types/visitLog';

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
          <DialogTitle>Edit visit log</DialogTitle>
          <DialogDescription>
            Update the draft details through the feature mutation layer.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field htmlFor="edit-visit-log-title" label="Title">
            <Input
              id="edit-visit-log-title"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder="e.g. Gangnam apartment revisit"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field htmlFor="edit-visit-log-district" label="District">
              <Input
                id="edit-visit-log-district"
                value={form.district}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    district: event.target.value,
                  }))
                }
                placeholder="Gangnam-gu"
              />
            </Field>
            <Field htmlFor="edit-visit-log-price" label="Price">
              <Input
                id="edit-visit-log-price"
                value={form.priceLabel}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    priceLabel: event.target.value,
                  }))
                }
                placeholder="KRW 1.10B"
              />
            </Field>
          </div>
          <Field htmlFor="edit-visit-log-property-type" label="Property type">
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
              <option value="apartment">Apartment</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
            </Select>
          </Field>
          <Field htmlFor="edit-visit-log-summary" label="Summary">
            <Textarea
              id="edit-visit-log-summary"
              value={form.summary}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  summary: event.target.value,
                }))
              }
              placeholder="Capture the updated on-site review and the next validation step."
            />
          </Field>
          {mutation.isError ? (
            <p className="text-sm text-danger">
              Failed to update the visit log.
            </p>
          ) : null}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            disabled={isUpdateDisabled}
            loading={mutation.isPending}
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogEditDialog };
