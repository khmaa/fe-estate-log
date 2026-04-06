import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogDetailScreen } from './VisitLogDetailScreen';

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
  summary:
    'Strong sunlight and subway access, but the lobby and parking flow felt dated.',
};

describe('VisitLogDetailScreen', () => {
  it('renders a visit log detail view', () => {
    render(
      <VisitLogDetailScreen
        log={visitLog}
        isLoading={false}
        onBack={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Samsung-dong river-view apartment',
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Handled by Minji Park')).toBeNull();
    expect(screen.getByText('Minji Park')).toBeInTheDocument();
  });

  it('renders an empty state when the visit log is missing', () => {
    render(
      <VisitLogDetailScreen
        log={null}
        isLoading={false}
        onBack={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText('Visit log not found')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Back to visit logs' }),
    ).toBeInTheDocument();
  });

  it('forwards action button clicks', () => {
    const onBack = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <VisitLogDetailScreen
        log={visitLog}
        isLoading={false}
        onBack={onBack}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back to visit logs' }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onBack).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });
});
