import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
    pinnedOnly: false,
    query: '',
    sort: 'latest' as const,
  },
) =>
  render(
    <AppProviders>
      <VisitLogsScreen
        logs={logs}
        isLoading={false}
        filters={filters}
        onPinnedOnlyChange={() => {}}
        onQueryChange={() => {}}
        onSortChange={() => {}}
      />
    </AppProviders>,
  );

describe('VisitLogsScreen', () => {
  it('filters logs by the search query', () => {
    renderScreen(visitLogs, {
      pinnedOnly: false,
      query: 'yeonnam',
      sort: 'latest',
    });

    expect(
      screen.getByText('Yeonnam boutique retail corner'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Samsung-dong river-view apartment'),
    ).not.toBeInTheDocument();
  });

  it('opens details and clears the selected log when the dialog closes', async () => {
    renderScreen();

    fireEvent.click(screen.getAllByRole('button', { name: 'Review note' })[0]);

    expect(
      screen.getByRole('heading', {
        name: 'Samsung-dong river-view apartment',
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });

  it('opens the create dialog from the empty state action', () => {
    renderScreen([]);

    fireEvent.click(
      screen.getByRole('button', { name: 'Add first visit log' }),
    );

    expect(
      screen.getByRole('heading', { name: 'Create a new visit log' }),
    ).toBeInTheDocument();
  });

  it('opens the edit dialog from the detail modal', async () => {
    renderScreen();

    fireEvent.click(screen.getAllByRole('button', { name: 'Review note' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(
      await screen.findByRole('heading', { name: 'Edit visit log' }),
    ).toBeInTheDocument();
  });

  it('opens the delete dialog from the detail modal', async () => {
    renderScreen();

    fireEvent.click(screen.getAllByRole('button', { name: 'Review note' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(
      await screen.findByRole('heading', { name: 'Delete visit log' }),
    ).toBeInTheDocument();
  });

  it('closes the delete dialog and clears the pending delete state', async () => {
    renderScreen();

    fireEvent.click(screen.getAllByRole('button', { name: 'Review note' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: 'Delete visit log' }),
      ).not.toBeInTheDocument();
    });
  });

  it('removes a deleted visit log from the current list and shows a toast', async () => {
    renderScreen();

    fireEvent.click(screen.getAllByRole('button', { name: 'Review note' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(
        screen.queryByText('Samsung-dong river-view apartment'),
      ).not.toBeInTheDocument();
    });
    expect(screen.getByText('Visit log deleted')).toBeInTheDocument();
  });
});
