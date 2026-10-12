import {
  Alert,
  AlertTitle,
  Field,
  Input,
  Select,
  Textarea,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLogFormValidationErrors } from '../hooks/useVisitLogForm';
import type { CreateVisitLogInput } from '../types/visitLog';
import { getVisitLogPropertyTypeLabel } from '../utils/visitLogLabels';

type VisitLogFormFieldPrefix = 'createDialog' | 'editDialog';
type VisitLogFormValidationField = keyof VisitLogFormValidationErrors;

type VisitLogFormFieldsProps = {
  fieldIdPrefix: string;
  form: CreateVisitLogInput;
  labelPrefix: VisitLogFormFieldPrefix;
  onChange: (form: CreateVisitLogInput) => void;
  validationErrors?: VisitLogFormValidationErrors;
};

const validationFieldOrder = [
  'title',
  'district',
  'priceLabel',
  'summary',
] as const satisfies readonly VisitLogFormValidationField[];

const validationFieldLabelKeys = {
  district: 'district',
  priceLabel: 'price',
  summary: 'summary',
  title: 'title',
} as const satisfies Record<VisitLogFormValidationField, string>;

const VisitLogFormFields = ({
  fieldIdPrefix,
  form,
  labelPrefix,
  onChange,
  validationErrors,
}: VisitLogFormFieldsProps) => {
  const { t } = useTranslation();
  const validationErrorCount = Object.keys(validationErrors ?? {}).length;
  const validationSummaryId = `${fieldIdPrefix}-validation-summary`;
  const validationFieldLabels = validationFieldOrder
    .filter((field) => Boolean(validationErrors?.[field]))
    .map((field) =>
      t(`visitLogs.${labelPrefix}.fields.${validationFieldLabelKeys[field]}`),
    );
  const getValidationSummaryDescription = (
    field: VisitLogFormValidationField,
  ) => (validationErrors?.[field] ? validationSummaryId : undefined);
  const getValidationErrorMessageId = (
    field: VisitLogFormValidationField,
    fieldId: string,
  ) => (validationErrors?.[field] ? `${fieldId}-error` : undefined);

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
      {validationErrorCount > 0 ? (
        <Alert variant="error">
          <AlertTitle>
            {t(`visitLogs.${labelPrefix}.validation.summaryTitle`)}
          </AlertTitle>
          <div
            id={validationSummaryId}
            className="text-sm leading-6 text-muted-foreground"
          >
            <p>
              {t(`visitLogs.${labelPrefix}.validation.summary`, {
                count: validationErrorCount,
              })}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {validationFieldLabels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        </Alert>
      ) : null}
      <Field
        error={
          validationErrors?.title
            ? t(`visitLogs.${labelPrefix}.validation.titleRequired`)
            : undefined
        }
        htmlFor={`${fieldIdPrefix}-title`}
        label={t(`visitLogs.${labelPrefix}.fields.title`)}
        required
      >
        <Input
          aria-describedby={getValidationSummaryDescription('title')}
          aria-errormessage={getValidationErrorMessageId(
            'title',
            `${fieldIdPrefix}-title`,
          )}
          id={`${fieldIdPrefix}-title`}
          value={form.title}
          onChange={(event) => updateForm('title', event.target.value)}
          placeholder={t(`visitLogs.${labelPrefix}.placeholders.title`)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          error={
            validationErrors?.district
              ? t(`visitLogs.${labelPrefix}.validation.districtRequired`)
              : undefined
          }
          htmlFor={`${fieldIdPrefix}-district`}
          label={t(`visitLogs.${labelPrefix}.fields.district`)}
          required
        >
          <Input
            aria-describedby={getValidationSummaryDescription('district')}
            aria-errormessage={getValidationErrorMessageId(
              'district',
              `${fieldIdPrefix}-district`,
            )}
            id={`${fieldIdPrefix}-district`}
            value={form.district}
            onChange={(event) => updateForm('district', event.target.value)}
            placeholder={t(`visitLogs.${labelPrefix}.placeholders.district`)}
          />
        </Field>
        <Field
          error={
            validationErrors?.priceLabel
              ? t(`visitLogs.${labelPrefix}.validation.priceRequired`)
              : undefined
          }
          htmlFor={`${fieldIdPrefix}-price`}
          label={t(`visitLogs.${labelPrefix}.fields.price`)}
          required
        >
          <Input
            aria-describedby={getValidationSummaryDescription('priceLabel')}
            aria-errormessage={getValidationErrorMessageId(
              'priceLabel',
              `${fieldIdPrefix}-price`,
            )}
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
        error={
          validationErrors?.summary
            ? t(`visitLogs.${labelPrefix}.validation.summaryRequired`)
            : undefined
        }
        htmlFor={`${fieldIdPrefix}-summary`}
        label={t(`visitLogs.${labelPrefix}.fields.summary`)}
        required
      >
        <Textarea
          aria-describedby={getValidationSummaryDescription('summary')}
          aria-errormessage={getValidationErrorMessageId(
            'summary',
            `${fieldIdPrefix}-summary`,
          )}
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
