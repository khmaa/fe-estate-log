import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type {
  CreateVisitLogInput,
  UpdateVisitLogInput,
} from '../types/visitLog';
import { isValidVisitLogForm, useVisitLogForm } from './useVisitLogForm';

const validForm: CreateVisitLogInput = {
  title: 'Jamsil draft',
  district: 'Songpa-gu',
  priceLabel: 'KRW 1.35B',
  propertyType: 'apartment',
  summary: 'Need a second pass.',
};

describe('useVisitLogForm', () => {
  it('validates required visit log form fields', () => {
    expect(
      isValidVisitLogForm({
        ...validForm,
        summary: '',
      }),
    ).toBe(false);
    expect(
      isValidVisitLogForm({
        ...validForm,
        title: '   ',
      }),
    ).toBe(false);
    expect(isValidVisitLogForm(validForm)).toBe(true);
  });

  it('updates and resets create form state', () => {
    const { result } = renderHook(() => useVisitLogForm(validForm));

    act(() => {
      result.current.setForm({
        ...validForm,
        propertyType: 'retail',
        title: 'Updated draft',
      });
    });

    expect(result.current.form).toEqual({
      ...validForm,
      propertyType: 'retail',
      title: 'Updated draft',
    });
    expect(result.current.isValid).toBe(true);

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.form).toEqual(validForm);
  });

  it('preserves extended update form fields', () => {
    const updateForm: UpdateVisitLogInput = {
      ...validForm,
      id: 'visit-log-1',
    };

    const { result } = renderHook(() => useVisitLogForm(updateForm));

    act(() => {
      result.current.setForm({
        ...updateForm,
        summary: 'Updated summary.',
      });
    });

    expect(result.current.form).toEqual({
      ...updateForm,
      summary: 'Updated summary.',
    });
    expect(result.current.form.id).toBe('visit-log-1');
  });
});
