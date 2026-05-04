import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogFilters } from './VisitLogFilters';

describe('VisitLogFilters', () => {
  it('forwards search, sort, and page size changes', () => {
    const handleQueryChange = vi.fn();
    const handleSortChange = vi.fn();
    const handlePageSizeChange = vi.fn();

    render(
      <VisitLogFilters
        hasActiveFilters={false}
        pageSize={2}
        pinnedOnly={false}
        query=""
        sort="latest"
        onPageSizeChange={handlePageSizeChange}
        onPinnedOnlyChange={vi.fn()}
        onQueryChange={handleQueryChange}
        onQuickShowAll={vi.fn()}
        onQuickShowPinned={vi.fn()}
        onResetFilters={vi.fn()}
        onSortChange={handleSortChange}
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

  it('forwards quick filter actions', () => {
    const handleQuickShowAll = vi.fn();
    const handleQuickShowPinned = vi.fn();
    const handleSortChange = vi.fn();

    render(
      <VisitLogFilters
        hasActiveFilters={false}
        pageSize={2}
        pinnedOnly={false}
        query=""
        sort="latest"
        onPageSizeChange={vi.fn()}
        onPinnedOnlyChange={vi.fn()}
        onQueryChange={vi.fn()}
        onQuickShowAll={handleQuickShowAll}
        onQuickShowPinned={handleQuickShowPinned}
        onResetFilters={vi.fn()}
        onSortChange={handleSortChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pinned' }));
    fireEvent.click(screen.getByRole('button', { name: 'Oldest' }));
    fireEvent.click(screen.getByRole('button', { name: 'District' }));

    expect(handleQuickShowAll).toHaveBeenCalled();
    expect(handleQuickShowPinned).toHaveBeenCalled();
    expect(handleSortChange).toHaveBeenNthCalledWith(1, 'oldest');
    expect(handleSortChange).toHaveBeenNthCalledWith(2, 'district');
  });

  it('toggles pinned-only state from the popover filter', async () => {
    const handlePinnedOnlyChange = vi.fn();

    render(
      <VisitLogFilters
        hasActiveFilters={false}
        pageSize={2}
        pinnedOnly={false}
        query=""
        sort="latest"
        onPageSizeChange={vi.fn()}
        onPinnedOnlyChange={handlePinnedOnlyChange}
        onQueryChange={vi.fn()}
        onQuickShowAll={vi.fn()}
        onQuickShowPinned={vi.fn()}
        onResetFilters={vi.fn()}
        onSortChange={vi.fn()}
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
        pinnedOnly
        query="gangnam"
        sort="district"
        onPageSizeChange={vi.fn()}
        onPinnedOnlyChange={vi.fn()}
        onQueryChange={vi.fn()}
        onQuickShowAll={vi.fn()}
        onQuickShowPinned={vi.fn()}
        onResetFilters={handleResetFilters}
        onSortChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));

    expect(handleResetFilters).toHaveBeenCalled();
  });
});
