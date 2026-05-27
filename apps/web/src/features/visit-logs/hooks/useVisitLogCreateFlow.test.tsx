import { act, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import {
  getDuplicateVisitLogInput,
  useVisitLogCreateFlow,
} from './useVisitLogCreateFlow';

const visitLog = {
  id: 'visit-log-1',
  title: 'Samsung-dong river-view apartment',
  district: 'Gangnam-gu',
  propertyType: 'apartment' as const,
  status: 'completed' as const,
  visitedAt: '2026-03-27T10:30:00.000Z',
  priceLabel: 'KRW 1.28B',
  agentName: 'Minji Park',
  isPinned: true,
  summary: 'Strong sunlight and subway access.',
};

const wrapper = ({ children }: { children: ReactNode }) => {
  return <AppProviders>{children}</AppProviders>;
};

describe('useVisitLogCreateFlow', () => {
  it('opens and closes the create dialog state', () => {
    const { result } = renderHook(() => useVisitLogCreateFlow(), { wrapper });

    expect(result.current.isCreateDialogOpen).toBe(false);

    act(() => {
      result.current.openCreateDialog();
    });

    expect(result.current.isCreateDialogOpen).toBe(true);
    expect(result.current.createInitialValues).toBeUndefined();

    act(() => {
      result.current.handleCreateDialogOpenChange(false);
    });

    expect(result.current.isCreateDialogOpen).toBe(false);
    expect(result.current.createInitialValues).toBeUndefined();
  });

  it('opens the create dialog with duplicate initial values', () => {
    const { result } = renderHook(() => useVisitLogCreateFlow(), { wrapper });

    act(() => {
      result.current.openDuplicateDialog(visitLog);
    });

    expect(result.current.isCreateDialogOpen).toBe(true);
    expect(result.current.createInitialValues).toEqual({
      title: 'Samsung-dong river-view apartment',
      district: 'Gangnam-gu',
      priceLabel: 'KRW 1.28B',
      propertyType: 'apartment',
      summary: 'Strong sunlight and subway access.',
    });

    act(() => {
      result.current.handleCreateDialogOpenChange(false);
    });

    expect(result.current.isCreateDialogOpen).toBe(false);
    expect(result.current.createInitialValues).toBeUndefined();
  });

  it('keeps duplicate initial values when the dialog reports an open state', () => {
    const { result } = renderHook(() => useVisitLogCreateFlow(), { wrapper });

    act(() => {
      result.current.openDuplicateDialog(visitLog);
    });

    act(() => {
      result.current.handleCreateDialogOpenChange(true);
    });

    expect(result.current.isCreateDialogOpen).toBe(true);
    expect(result.current.createInitialValues).toEqual({
      title: 'Samsung-dong river-view apartment',
      district: 'Gangnam-gu',
      priceLabel: 'KRW 1.28B',
      propertyType: 'apartment',
      summary: 'Strong sunlight and subway access.',
    });
  });

  it('closes the create dialog and shows a success toast after creation', () => {
    const { result } = renderHook(() => useVisitLogCreateFlow(), { wrapper });

    act(() => {
      result.current.openCreateDialog();
    });

    expect(result.current.isCreateDialogOpen).toBe(true);

    act(() => {
      result.current.handleCreated();
    });

    expect(result.current.isCreateDialogOpen).toBe(false);
    expect(screen.getByText('Visit log created')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The new draft has been added through the feature mutation flow.',
      ),
    ).toBeInTheDocument();
  });

  it('maps a visit log into duplicate create input', () => {
    expect(getDuplicateVisitLogInput(visitLog)).toEqual({
      title: 'Samsung-dong river-view apartment',
      district: 'Gangnam-gu',
      priceLabel: 'KRW 1.28B',
      propertyType: 'apartment',
      summary: 'Strong sunlight and subway access.',
    });
  });
});
