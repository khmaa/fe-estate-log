import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '../../../app/AppProviders';
import { VisitLogsScreen } from './VisitLogsScreen';

const visitLogs = [
  {
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
  },
  {
    id: 'visit-log-2',
    title: 'Yeonnam boutique retail corner',
    district: 'Mapo-gu',
    propertyType: 'retail' as const,
    status: 'draft' as const,
    visitedAt: '2026-03-21T04:15:00.000Z',
    priceLabel: 'KRW 730M',
    agentName: 'Sora Kim',
    isPinned: false,
    summary: 'Summary',
  },
];

const renderScreen = (
  logs = visitLogs,
  filters = {
    page: 1,
    pageSize: 2,
    pinnedOnly: false,
    query: '',
    sort: 'latest' as const,
  },
  onOpenDetails = vi.fn(),
  onPageChange = vi.fn(),
  onPageSizeChange = vi.fn(),
  onRetry = vi.fn(),
  isError = false,
) =>
  render(
    <AppProviders>
      <VisitLogsScreen
        logs={logs}
        isError={isError}
        isLoading={false}
        filters={filters}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onPinnedOnlyChange={() => {}}
        onQueryChange={() => {}}
        onRetry={onRetry}
        onSortChange={() => {}}
        onOpenDetails={onOpenDetails}
        totalCount={logs.length}
        totalPages={1}
      />
    </AppProviders>,
  );

describe('VisitLogsScreen', () => {
  it('renders the logs provided by the query layer', () => {
    renderScreen(visitLogs, {
      page: 1,
      pageSize: 2,
      pinnedOnly: false,
      query: 'yeonnam',
      sort: 'latest',
    });

    expect(
      screen.getByText('Samsung-dong river-view apartment'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Yeonnam boutique retail corner'),
    ).toBeInTheDocument();
  });

  it('forwards detail navigation from the card actions', async () => {
    const handleOpenDetails = vi.fn();

    renderScreen(visitLogs, undefined, handleOpenDetails);

    fireEvent.click(screen.getAllByRole('button', { name: 'Review note' })[0]);

    expect(handleOpenDetails).toHaveBeenCalledWith('visit-log-1');
  });

  it('forwards pagination changes from the list controls', () => {
    const handlePageChange = vi.fn();

    render(
      <AppProviders>
        <VisitLogsScreen
          logs={visitLogs}
          isError={false}
          isLoading={false}
          filters={{
            page: 1,
            pageSize: 2,
            pinnedOnly: false,
            query: '',
            sort: 'latest',
          }}
          onPageChange={handlePageChange}
          onPageSizeChange={() => {}}
          onPinnedOnlyChange={() => {}}
          onQueryChange={() => {}}
          onRetry={() => {}}
          onSortChange={() => {}}
          onOpenDetails={vi.fn()}
          totalCount={3}
          totalPages={2}
        />
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('opens the create dialog from the empty state action', () => {
    renderScreen([]);

    fireEvent.click(screen.getByRole('button', { name: 'Create a visit log' }));

    expect(
      screen.getByRole('heading', { name: 'Create a new visit log' }),
    ).toBeInTheDocument();
  });

  it('forwards retry actions from the list request error state', () => {
    const handleRetry = vi.fn();

    renderScreen([], undefined, vi.fn(), vi.fn(), vi.fn(), handleRetry, true);

    fireEvent.click(screen.getByRole('button', { name: 'Retry request' }));

    expect(handleRetry).toHaveBeenCalled();
  });
});
