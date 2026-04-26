import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogFilters } from './VisitLogFilters';

describe('VisitLogFilters', () => {
  it('forwards search and sort changes', async () => {
    const handleQueryChange = vi.fn();
    const handleSortChange = vi.fn();
    const handlePageSizeChange = vi.fn();

    render(
      <VisitLogFilters
        hasActiveFilters={false}
        pageSize={2}
        query=""
        sort="latest"
        pinnedOnly={false}
        onPageSizeChange={handlePageSizeChange}
        onQueryChange={handleQueryChange}
        onResetFilters={vi.fn()}
        onSortChange={handleSortChange}
        onPinnedOnlyChange={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Search visit logs'), {
      target: { value: 'gangnam' },
    });
    fireEvent.change(screen.getByLabelText('Sort by'), {
      target: { value: 'district' },
    });
    fireEvent.change(screen.getByLabelText('Page size'), {
      target: { value: '5' },
    });

    expect(handleQueryChange).toHaveBeenCalledWith('gangnam');
    expect(handleSortChange).toHaveBeenCalledWith('district');
    expect(handlePageSizeChange).toHaveBeenCalledWith(5);
  });

  it('toggles pinned-only state from the popover filter', async () => {
    const handlePinnedOnlyChange = vi.fn();

    render(
      <VisitLogFilters
        hasActiveFilters={false}
        pageSize={2}
        query=""
        sort="latest"
        pinnedOnly={false}
        onPageSizeChange={vi.fn()}
        onQueryChange={vi.fn()}
        onResetFilters={vi.fn()}
        onSortChange={vi.fn()}
        onPinnedOnlyChange={handlePinnedOnlyChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Advanced filters' }));
    fireEvent.click(
      await screen.findByRole('checkbox', {
        name: 'Pinned only',
      }),
    );

    expect(handlePinnedOnlyChange).toHaveBeenCalledWith(true);
  });

  it('shows and forwards the reset action when filters are active', () => {
    const handleResetFilters = vi.fn();

    render(
      <VisitLogFilters
        hasActiveFilters
        pageSize={5}
        query="gangnam"
        sort="district"
        pinnedOnly
        onPageSizeChange={vi.fn()}
        onQueryChange={vi.fn()}
        onResetFilters={handleResetFilters}
        onSortChange={vi.fn()}
        onPinnedOnlyChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));

    expect(handleResetFilters).toHaveBeenCalled();
  });
});
