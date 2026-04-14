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
        isError={false}
        isLoading
        logs={[]}
        onCreateFirstLog={vi.fn()}
        onOpenDetails={vi.fn()}
        onPageChange={vi.fn()}
        onRetry={vi.fn()}
        page={1}
        pageSize={2}
        totalCount={0}
        totalPages={1}
      />,
    );

    expect(screen.getByTestId('visit-log-list-skeleton')).toBeInTheDocument();
    expect(screen.getAllByTestId('visit-log-card-skeleton')).toHaveLength(2);
  });

  it('renders an empty state and forwards the action', () => {
    const handleCreateFirstLog = vi.fn();

    render(
      <VisitLogList
        isError={false}
        isLoading={false}
        logs={[]}
        onCreateFirstLog={handleCreateFirstLog}
        onOpenDetails={vi.fn()}
        onPageChange={vi.fn()}
        onRetry={vi.fn()}
        page={1}
        pageSize={2}
        totalCount={0}
        totalPages={1}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create a visit log' }));

    expect(handleCreateFirstLog).toHaveBeenCalled();
  });

  it('renders a request error state and forwards retry actions', () => {
    const handleRetry = vi.fn();

    render(
      <VisitLogList
        isError={true}
        isLoading={false}
        logs={[]}
        onCreateFirstLog={vi.fn()}
        onOpenDetails={vi.fn()}
        onPageChange={vi.fn()}
        onRetry={handleRetry}
        page={1}
        pageSize={2}
        totalCount={0}
        totalPages={1}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Retry request' }));

    expect(screen.getByText('Failed to load visit logs')).toBeInTheDocument();
    expect(handleRetry).toHaveBeenCalled();
  });

  it('renders visit log cards when data is present', () => {
    render(
      <VisitLogList
        isError={false}
        isLoading={false}
        logs={[visitLog]}
        onCreateFirstLog={vi.fn()}
        onOpenDetails={vi.fn()}
        onPageChange={vi.fn()}
        onRetry={vi.fn()}
        page={1}
        pageSize={2}
        totalCount={1}
        totalPages={1}
      />,
    );

    expect(
      screen.getByText('Samsung-dong river-view apartment'),
    ).toBeInTheDocument();
  });

  it('renders pagination controls when multiple pages exist', () => {
    const handlePageChange = vi.fn();

    render(
      <VisitLogList
        isError={false}
        isLoading={false}
        logs={[visitLog]}
        onCreateFirstLog={vi.fn()}
        onOpenDetails={vi.fn()}
        onPageChange={handlePageChange}
        onRetry={vi.fn()}
        page={1}
        pageSize={2}
        totalCount={3}
        totalPages={2}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
