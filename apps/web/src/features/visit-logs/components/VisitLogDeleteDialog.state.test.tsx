import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { useDeleteVisitLog } from '../hooks/useDeleteVisitLog';
import { VisitLogDeleteDialog } from './VisitLogDeleteDialog';

vi.mock('../hooks/useDeleteVisitLog', () => ({
  useDeleteVisitLog: vi.fn(),
}));

const visitLog = {
  id: 'visit-log-1',
  title: '삼성동 한강뷰 아파트 재방문',
  district: '강남구',
  propertyType: 'apartment' as const,
  status: 'completed' as const,
  visitedAt: '2026-03-27T10:30:00.000Z',
  priceLabel: 'KRW 1.28B',
  agentName: '박민지',
  isPinned: true,
  summary: '초기 메모입니다.',
};

const deleteMutationState = (
  overrides?: Partial<ReturnType<typeof useDeleteVisitLog>>,
) => ({
  mutateAsync: vi.fn(),
  reset: vi.fn(),
  isPending: false,
  isError: false,
  ...overrides,
});

describe('VisitLogDeleteDialog state handling', () => {
  it('renders an error message when the delete mutation fails', () => {
    vi.mocked(useDeleteVisitLog).mockReturnValue(
      deleteMutationState({ isError: true }) as ReturnType<
        typeof useDeleteVisitLog
      >,
    );

    render(
      <AppProviders>
        <VisitLogDeleteDialog
          log={visitLog}
          open
          onDeleted={vi.fn()}
          onOpenChange={vi.fn()}
        />
      </AppProviders>,
    );

    expect(
      screen.getByText('Failed to delete the visit log.'),
    ).toBeInTheDocument();
  });

  it('resets mutation state when the dialog is closed from the cancel action', async () => {
    const mutation = deleteMutationState();
    const onOpenChange = vi.fn();

    vi.mocked(useDeleteVisitLog).mockReturnValue(
      mutation as ReturnType<typeof useDeleteVisitLog>,
    );

    render(
      <AppProviders>
        <VisitLogDeleteDialog
          log={visitLog}
          open
          onDeleted={vi.fn()}
          onOpenChange={onOpenChange}
        />
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    expect(mutation.reset).toHaveBeenCalled();
  });

  it('keeps the delete action disabled while the mutation is pending', () => {
    vi.mocked(useDeleteVisitLog).mockReturnValue(
      deleteMutationState({ isPending: true }) as ReturnType<
        typeof useDeleteVisitLog
      >,
    );

    render(
      <AppProviders>
        <VisitLogDeleteDialog
          log={visitLog}
          open
          onDeleted={vi.fn()}
          onOpenChange={vi.fn()}
        />
      </AppProviders>,
    );

    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });
});
