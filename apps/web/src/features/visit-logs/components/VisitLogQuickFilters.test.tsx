import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogQuickFilters } from './VisitLogQuickFilters';

describe('VisitLogQuickFilters', () => {
  it('forwards quick filter actions', () => {
    const handleQuickShowAll = vi.fn();
    const handleQuickShowPinned = vi.fn();
    const handleSortChange = vi.fn();

    render(
      <VisitLogQuickFilters
        pinnedOnly={false}
        sort="latest"
        onQuickShowAll={handleQuickShowAll}
        onQuickShowPinned={handleQuickShowPinned}
        onSortChange={handleSortChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pinned' }));
    fireEvent.click(screen.getByRole('button', { name: 'Latest' }));
    fireEvent.click(screen.getByRole('button', { name: 'Oldest' }));
    fireEvent.click(screen.getByRole('button', { name: 'District' }));

    expect(handleQuickShowAll).toHaveBeenCalled();
    expect(handleQuickShowPinned).toHaveBeenCalled();
    expect(handleSortChange).toHaveBeenNthCalledWith(1, 'latest');
    expect(handleSortChange).toHaveBeenNthCalledWith(2, 'oldest');
    expect(handleSortChange).toHaveBeenNthCalledWith(3, 'district');
  });

  it('marks the pinned and district quick filters as active', () => {
    render(
      <VisitLogQuickFilters
        pinnedOnly
        sort="district"
        onQuickShowAll={vi.fn()}
        onQuickShowPinned={vi.fn()}
        onSortChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Pinned' })).toHaveClass(
      'bg-primary',
    );
    expect(screen.getByRole('button', { name: 'District' })).toHaveClass(
      'bg-primary',
    );
    expect(screen.getByRole('button', { name: 'All' })).toHaveClass(
      'bg-secondary',
    );
  });
});
