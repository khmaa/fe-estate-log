import { useState } from 'react';
import type { CreateVisitLogInput } from '../types/visitLog';

type VisitLogFormState = CreateVisitLogInput;
type VisitLogFormValidationErrors = Partial<
  Record<'district' | 'priceLabel' | 'summary' | 'title', true>
>;

const isValidVisitLogForm = (form: VisitLogFormState) =>
  Boolean(
    form.title.trim() &&
    form.district.trim() &&
    form.priceLabel.trim() &&
    form.summary.trim(),
  );

const getVisitLogFormValidationErrors = (
  form: VisitLogFormState,
): VisitLogFormValidationErrors => ({
  ...(form.title.trim() ? {} : { title: true }),
  ...(form.district.trim() ? {} : { district: true }),
  ...(form.priceLabel.trim() ? {} : { priceLabel: true }),
  ...(form.summary.trim() ? {} : { summary: true }),
});

const useVisitLogForm = <FormState extends VisitLogFormState>(
  initialForm: FormState,
) => {
  const [form, setForm] = useState<FormState>(initialForm);

  const resetForm = () => {
    setForm(initialForm);
  };

  return {
    form,
    isValid: isValidVisitLogForm(form),
    resetForm,
    setForm,
    validationErrors: getVisitLogFormValidationErrors(form),
  };
};

export {
  getVisitLogFormValidationErrors,
  isValidVisitLogForm,
  useVisitLogForm,
};
export type { VisitLogFormState, VisitLogFormValidationErrors };
