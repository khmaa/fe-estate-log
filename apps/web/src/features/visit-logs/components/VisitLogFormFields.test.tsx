import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import type { CreateVisitLogInput } from '../types/visitLog';
import { VisitLogFormFields } from './VisitLogFormFields';

const form: CreateVisitLogInput = {
  title: 'Jamsil draft',
  district: 'Songpa-gu',
  priceLabel: 'KRW 1.35B',
  propertyType: 'apartment',
  summary: 'Need a second pass.',
};

describe('VisitLogFormFields', () => {
  it('renders create form values and forwards field changes', () => {
    const handleChange = vi.fn();

    render(
      <AppProviders>
        <VisitLogFormFields
          fieldIdPrefix="test-visit-log"
          form={form}
          labelPrefix="createDialog"
          onChange={handleChange}
        />
      </AppProviders>,
    );

    expect(screen.getByLabelText('Title')).toHaveValue(form.title);
    expect(screen.getByLabelText('District')).toHaveValue(form.district);
    expect(screen.getByLabelText('Price')).toHaveValue(form.priceLabel);
    expect(screen.getByLabelText('Summary')).toHaveValue(form.summary);

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Updated title' },
    });
    fireEvent.change(screen.getByLabelText('District'), {
      target: { value: 'Gangnam-gu' },
    });
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: 'KRW 1.50B' },
    });
    fireEvent.change(screen.getByLabelText('Property type'), {
      target: { value: 'retail' },
    });
    fireEvent.change(screen.getByLabelText('Summary'), {
      target: { value: 'Updated summary.' },
    });

    expect(handleChange).toHaveBeenNthCalledWith(1, {
      ...form,
      title: 'Updated title',
    });
    expect(handleChange).toHaveBeenNthCalledWith(2, {
      ...form,
      district: 'Gangnam-gu',
    });
    expect(handleChange).toHaveBeenNthCalledWith(3, {
      ...form,
      priceLabel: 'KRW 1.50B',
    });
    expect(handleChange).toHaveBeenNthCalledWith(4, {
      ...form,
      propertyType: 'retail',
    });
    expect(handleChange).toHaveBeenNthCalledWith(5, {
      ...form,
      summary: 'Updated summary.',
    });
  });
});
