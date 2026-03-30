import { fireEvent, render, screen } from '@testing-library/react';
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

const renderScreen = (logs = visitLogs) =>
  render(
    <AppProviders>
      <VisitLogsScreen logs={logs} isLoading={false} />
    </AppProviders>,
  );

describe('VisitLogsScreen', () => {
  it('filters logs by the search query', () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText('Search visit logs'), {
      target: { value: 'yeonnam' },
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
});
