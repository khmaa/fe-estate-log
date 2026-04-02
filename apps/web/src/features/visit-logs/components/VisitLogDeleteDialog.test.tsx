import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { VisitLogDeleteDialog } from './VisitLogDeleteDialog';

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

describe('VisitLogDeleteDialog', () => {
  it('renders the target visit log title when opened', () => {
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

    expect(screen.getByText(/삼성동 한강뷰 아파트 재방문/)).toBeInTheDocument();
  });

  it('deletes the visit log and closes the dialog', async () => {
    const onDeleted = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <AppProviders>
        <VisitLogDeleteDialog
          log={visitLog}
          open
          onDeleted={onDeleted}
          onOpenChange={onOpenChange}
        />
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(onDeleted).toHaveBeenCalledWith('visit-log-1');
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not submit a delete mutation when no log is provided', () => {
    const onDeleted = vi.fn();

    render(
      <AppProviders>
        <VisitLogDeleteDialog
          log={null}
          open
          onDeleted={onDeleted}
          onOpenChange={vi.fn()}
        />
      </AppProviders>,
    );

    expect(
      screen.getByText('Are you sure you want to delete this visit log?'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    expect(onDeleted).not.toHaveBeenCalled();
  });
});
