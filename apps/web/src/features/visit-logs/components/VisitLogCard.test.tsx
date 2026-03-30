import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogCard } from './VisitLogCard';

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

describe('VisitLogCard', () => {
  it('renders visit log details and pinned badge', () => {
    render(<VisitLogCard log={visitLog} onOpenDetails={vi.fn()} />);

    expect(
      screen.getByText('Samsung-dong river-view apartment'),
    ).toBeInTheDocument();
    expect(screen.getByText('Pinned')).toBeInTheDocument();
    expect(screen.getByText('KRW 1.28B')).toBeInTheDocument();
    expect(screen.getByText('Handled by Minji Park')).toBeInTheDocument();
  });

  it('opens details from the card action button', () => {
    const handleOpenDetails = vi.fn();

    render(<VisitLogCard log={visitLog} onOpenDetails={handleOpenDetails} />);

    fireEvent.click(screen.getByRole('button', { name: 'Review note' }));

    expect(handleOpenDetails).toHaveBeenCalledWith(visitLog);
  });

  it('opens details from the dropdown action', async () => {
    const handleOpenDetails = vi.fn();

    render(<VisitLogCard log={visitLog} onOpenDetails={handleOpenDetails} />);

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(
      await screen.findByRole('menuitem', { name: 'Open details' }),
    );

    expect(handleOpenDetails).toHaveBeenCalledWith(visitLog);
  });
});
