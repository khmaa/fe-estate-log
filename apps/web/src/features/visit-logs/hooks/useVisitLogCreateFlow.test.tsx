import { act, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { useVisitLogCreateFlow } from './useVisitLogCreateFlow';

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

    act(() => {
      result.current.setCreateDialogOpen(false);
    });

    expect(result.current.isCreateDialogOpen).toBe(false);
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
});
