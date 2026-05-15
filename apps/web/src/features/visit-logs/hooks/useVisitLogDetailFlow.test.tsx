import { act, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import type { VisitLog } from '../types/visitLog';
import { useVisitLogDetailFlow } from './useVisitLogDetailFlow';

const visitLog: VisitLog = {
  id: 'visit-log-1',
  title: '삼성동 한강뷰 아파트 재방문',
  district: '강남구',
  propertyType: 'apartment',
  status: 'completed',
  visitedAt: '2026-03-27T10:30:00.000Z',
  priceLabel: 'KRW 1.28B',
  agentName: '박민지',
  isPinned: true,
  summary: '초기 메모입니다.',
};

const wrapper = ({ children }: { children: ReactNode }) => {
  return <AppProviders>{children}</AppProviders>;
};

const renderDetailFlow = () => {
  const navigate = vi.fn();
  const hook = renderHook(
    () =>
      useVisitLogDetailFlow({
        navigate,
        returnPath: '/visit-logs?query=gangnam',
      }),
    { wrapper },
  );

  return { ...hook, navigate };
};

describe('useVisitLogDetailFlow', () => {
  it('opens edit and delete dialogs exclusively', () => {
    const { result } = renderDetailFlow();

    act(() => {
      result.current.openEditDialog();
    });

    expect(result.current.isEditDialogOpen).toBe(true);
    expect(result.current.isDeleteDialogOpen).toBe(false);
    expect(result.current.isActionDisabled).toBe(true);

    act(() => {
      result.current.openDeleteDialog();
    });

    expect(result.current.isEditDialogOpen).toBe(false);
    expect(result.current.isDeleteDialogOpen).toBe(true);
    expect(result.current.isActionDisabled).toBe(true);
  });

  it('navigates back to the list return path', () => {
    const { navigate, result } = renderDetailFlow();

    act(() => {
      result.current.handleBack();
    });

    expect(navigate).toHaveBeenCalledWith('/visit-logs?query=gangnam');
  });

  it('closes the edit dialog and shows an update toast', () => {
    const { result } = renderDetailFlow();

    act(() => {
      result.current.openEditDialog();
    });

    act(() => {
      result.current.handleUpdated(visitLog);
    });

    expect(result.current.isEditDialogOpen).toBe(false);
    expect(screen.getByText('Visit log updated')).toBeInTheDocument();
    expect(
      screen.getByText(
        '"삼성동 한강뷰 아파트 재방문" was updated and synced to the detail view.',
      ),
    ).toBeInTheDocument();
  });

  it('closes the delete dialog, shows a delete toast, and replaces navigation', () => {
    const { navigate, result } = renderDetailFlow();

    act(() => {
      result.current.openDeleteDialog();
    });

    act(() => {
      result.current.handleDeleted(visitLog);
    });

    expect(result.current.isDeleteDialogOpen).toBe(false);
    expect(screen.getByText('Visit log deleted')).toBeInTheDocument();
    expect(
      screen.getByText(
        '"삼성동 한강뷰 아파트 재방문" was removed from the current visit log workspace.',
      ),
    ).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith('/visit-logs?query=gangnam', {
      replace: true,
    });
  });
});
