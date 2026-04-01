import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { useUpdateVisitLog } from '../hooks/useUpdateVisitLog';
import { VisitLogEditDialog } from './VisitLogEditDialog';

vi.mock('../hooks/useUpdateVisitLog', () => ({
  useUpdateVisitLog: vi.fn(),
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

const updateMutationState = (
  overrides?: Partial<ReturnType<typeof useUpdateVisitLog>>,
) => ({
  mutateAsync: vi.fn(),
  reset: vi.fn(),
  isPending: false,
  isError: false,
  ...overrides,
});

describe('VisitLogEditDialog state handling', () => {
  it('renders an error message when the update mutation fails', () => {
    vi.mocked(useUpdateVisitLog).mockReturnValue(
      updateMutationState({ isError: true }) as ReturnType<
        typeof useUpdateVisitLog
      >,
    );

    render(
      <AppProviders>
        <VisitLogEditDialog
          log={visitLog}
          open
          onOpenChange={vi.fn()}
          onUpdated={vi.fn()}
        />
      </AppProviders>,
    );

    expect(
      screen.getByText('Failed to update the visit log.'),
    ).toBeInTheDocument();
  });

  it('resets mutation state when the dialog is closed from the cancel action', async () => {
    const mutation = updateMutationState();
    const onOpenChange = vi.fn();

    vi.mocked(useUpdateVisitLog).mockReturnValue(
      mutation as ReturnType<typeof useUpdateVisitLog>,
    );

    render(
      <AppProviders>
        <VisitLogEditDialog
          log={visitLog}
          open
          onOpenChange={onOpenChange}
          onUpdated={vi.fn()}
        />
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    expect(mutation.reset).toHaveBeenCalled();
  });

  it('keeps the save action disabled while the mutation is pending', () => {
    vi.mocked(useUpdateVisitLog).mockReturnValue(
      updateMutationState({ isPending: true }) as ReturnType<
        typeof useUpdateVisitLog
      >,
    );

    render(
      <AppProviders>
        <VisitLogEditDialog
          log={visitLog}
          open
          onOpenChange={vi.fn()}
          onUpdated={vi.fn()}
        />
      </AppProviders>,
    );

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
  });
});
