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
import { useCreateVisitLog } from '../hooks/useCreateVisitLog';
import type { CreateVisitLogInput, VisitLog } from '../types/visitLog';

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
          <DialogTitle>Create a new visit log</DialogTitle>
          <DialogDescription>
            This dialog now uses a real mutation boundary. The underlying
            backend is still mocked through MSW.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field htmlFor="create-visit-log-title" label="Title">
            <Input
              id="create-visit-log-title"
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
            <Field htmlFor="create-visit-log-district" label="District">
              <Input
                id="create-visit-log-district"
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
            <Field htmlFor="create-visit-log-price" label="Price">
              <Input
                id="create-visit-log-price"
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
          <Field htmlFor="create-visit-log-property-type" label="Property type">
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
              <option value="apartment">Apartment</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
            </Select>
          </Field>
          <Field htmlFor="create-visit-log-summary" label="Summary">
            <Textarea
              id="create-visit-log-summary"
              value={form.summary}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  summary: event.target.value,
                }))
              }
              placeholder="Capture the first on-site impression and the next validation step."
            />
          </Field>
          {mutation.isError ? (
            <p className="text-sm text-danger">Failed to create a visit log.</p>
          ) : null}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            disabled={isCreateDisabled}
            loading={mutation.isPending}
            onClick={handleSubmit}
          >
            Create draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { VisitLogCreateDialog };
