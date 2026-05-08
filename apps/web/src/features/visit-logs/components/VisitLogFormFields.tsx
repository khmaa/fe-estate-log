import { Field, Input, Select, Textarea } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { CreateVisitLogInput } from '../types/visitLog';
import { getVisitLogPropertyTypeLabel } from '../utils/visitLogLabels';

type VisitLogFormFieldPrefix = 'createDialog' | 'editDialog';

type VisitLogFormFieldsProps = {
  fieldIdPrefix: string;
  form: CreateVisitLogInput;
  labelPrefix: VisitLogFormFieldPrefix;
  onChange: (form: CreateVisitLogInput) => void;
};

const VisitLogFormFields = ({
  fieldIdPrefix,
  form,
  labelPrefix,
  onChange,
}: VisitLogFormFieldsProps) => {
  const { t } = useTranslation();

  const updateForm = <Key extends keyof CreateVisitLogInput>(
    key: Key,
    value: CreateVisitLogInput[Key],
  ) => {
    onChange({
      ...form,
      [key]: value,
    });
  };

  return (
    <>
      <Field
        htmlFor={`${fieldIdPrefix}-title`}
        label={t(`visitLogs.${labelPrefix}.fields.title`)}
      >
        <Input
          id={`${fieldIdPrefix}-title`}
          value={form.title}
          onChange={(event) => updateForm('title', event.target.value)}
          placeholder={t(`visitLogs.${labelPrefix}.placeholders.title`)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          htmlFor={`${fieldIdPrefix}-district`}
          label={t(`visitLogs.${labelPrefix}.fields.district`)}
        >
          <Input
            id={`${fieldIdPrefix}-district`}
            value={form.district}
            onChange={(event) => updateForm('district', event.target.value)}
            placeholder={t(`visitLogs.${labelPrefix}.placeholders.district`)}
          />
        </Field>
        <Field
          htmlFor={`${fieldIdPrefix}-price`}
          label={t(`visitLogs.${labelPrefix}.fields.price`)}
        >
          <Input
            id={`${fieldIdPrefix}-price`}
            value={form.priceLabel}
            onChange={(event) => updateForm('priceLabel', event.target.value)}
            placeholder={t(`visitLogs.${labelPrefix}.placeholders.price`)}
          />
        </Field>
      </div>
      <Field
        htmlFor={`${fieldIdPrefix}-property-type`}
        label={t(`visitLogs.${labelPrefix}.fields.propertyType`)}
      >
        <Select
          id={`${fieldIdPrefix}-property-type`}
          value={form.propertyType}
          onChange={(event) =>
            updateForm(
              'propertyType',
              event.target.value as CreateVisitLogInput['propertyType'],
            )
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
        htmlFor={`${fieldIdPrefix}-summary`}
        label={t(`visitLogs.${labelPrefix}.fields.summary`)}
      >
        <Textarea
          id={`${fieldIdPrefix}-summary`}
          value={form.summary}
          onChange={(event) => updateForm('summary', event.target.value)}
          placeholder={t(`visitLogs.${labelPrefix}.placeholders.summary`)}
        />
      </Field>
    </>
  );
};

export { VisitLogFormFields };
export type { VisitLogFormFieldPrefix };
