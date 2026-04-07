import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogFilters } from './VisitLogFilters';

describe('VisitLogFilters', () => {
  it('forwards search and sort changes', async () => {
    const handleQueryChange = vi.fn();
    const handleSortChange = vi.fn();

    render(
      <VisitLogFilters
        query=""
        sort="latest"
        pinnedOnly={false}
        onQueryChange={handleQueryChange}
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

    expect(handleQueryChange).toHaveBeenCalledWith('gangnam');
    expect(handleSortChange).toHaveBeenCalledWith('district');
  });

  it('toggles pinned-only state from the popover filter', async () => {
    const handlePinnedOnlyChange = vi.fn();

    render(
      <VisitLogFilters
        query=""
        sort="latest"
        pinnedOnly={false}
        onQueryChange={vi.fn()}
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
});
