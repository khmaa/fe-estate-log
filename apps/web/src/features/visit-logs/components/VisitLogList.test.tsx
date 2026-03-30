import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogList } from './VisitLogList';

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
  summary: 'Summary',
};

describe('VisitLogList', () => {
  it('renders a loading state', () => {
    render(
      <VisitLogList
        isLoading
        logs={[]}
        onCreateFirstLog={vi.fn()}
        onOpenDetails={vi.fn()}
      />,
    );

    expect(
      screen.getByText('Loading the latest visit logs'),
    ).toBeInTheDocument();
  });

  it('renders an empty state and forwards the action', () => {
    const handleCreateFirstLog = vi.fn();

    render(
      <VisitLogList
        isLoading={false}
        logs={[]}
        onCreateFirstLog={handleCreateFirstLog}
        onOpenDetails={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Add first visit log' }),
    );

    expect(handleCreateFirstLog).toHaveBeenCalled();
  });

  it('renders visit log cards when data is present', () => {
    render(
      <VisitLogList
        isLoading={false}
        logs={[visitLog]}
        onCreateFirstLog={vi.fn()}
        onOpenDetails={vi.fn()}
      />,
    );

    expect(
      screen.getByText('Samsung-dong river-view apartment'),
    ).toBeInTheDocument();
  });
});
