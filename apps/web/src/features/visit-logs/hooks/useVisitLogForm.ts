import { useState } from 'react';
import type { CreateVisitLogInput } from '../types/visitLog';

type VisitLogFormState = CreateVisitLogInput;

const isValidVisitLogForm = (form: VisitLogFormState) =>
  Boolean(
    form.title.trim() &&
    form.district.trim() &&
    form.priceLabel.trim() &&
    form.summary.trim(),
  );

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
  };
};

export { isValidVisitLogForm, useVisitLogForm };
export type { VisitLogFormState };
