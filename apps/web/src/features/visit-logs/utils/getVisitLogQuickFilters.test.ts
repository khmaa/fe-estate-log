import { describe, expect, it, vi } from 'vitest';
import { getVisitLogQuickFilters } from './getVisitLogQuickFilters';

const t = (key: string) => key;

describe('getVisitLogQuickFilters', () => {
  it('builds default quick filters with all and latest active', () => {
    const quickFilters = getVisitLogQuickFilters({
      pinnedOnly: false,
      sort: 'latest',
      onQuickShowAll: vi.fn(),
      onQuickShowPinned: vi.fn(),
      onSortChange: vi.fn(),
      t,
    });

    expect(
      quickFilters.map(({ active, key, label }) => ({ active, key, label })),
    ).toEqual([
      {
        key: 'all',
        label: 'visitLogs.filters.quick.all',
        active: true,
      },
      {
        key: 'pinned',
        label: 'visitLogs.filters.quick.pinned',
        active: false,
      },
      {
        key: 'latest',
        label: 'visitLogs.filters.quick.latest',
        active: true,
      },
      {
        key: 'oldest',
        label: 'visitLogs.filters.quick.oldest',
        active: false,
      },
      {
        key: 'district',
        label: 'visitLogs.filters.quick.district',
        active: false,
      },
    ]);
  });

  it('marks pinned and district filters as active', () => {
    const quickFilters = getVisitLogQuickFilters({
      pinnedOnly: true,
      sort: 'district',
      onQuickShowAll: vi.fn(),
      onQuickShowPinned: vi.fn(),
      onSortChange: vi.fn(),
      t,
    });

    expect(quickFilters.find((filter) => filter.key === 'all')?.active).toBe(
      false,
    );
    expect(quickFilters.find((filter) => filter.key === 'pinned')?.active).toBe(
      true,
    );
    expect(
      quickFilters.find((filter) => filter.key === 'district')?.active,
    ).toBe(true);
  });

  it('wires quick filter handlers', () => {
    const handleQuickShowAll = vi.fn();
    const handleQuickShowPinned = vi.fn();
    const handleSortChange = vi.fn();

    const quickFilters = getVisitLogQuickFilters({
      pinnedOnly: false,
      sort: 'latest',
      onQuickShowAll: handleQuickShowAll,
      onQuickShowPinned: handleQuickShowPinned,
      onSortChange: handleSortChange,
      t,
    });

    quickFilters.find((filter) => filter.key === 'all')?.onClick();
    quickFilters.find((filter) => filter.key === 'pinned')?.onClick();
    quickFilters.find((filter) => filter.key === 'latest')?.onClick();
    quickFilters.find((filter) => filter.key === 'oldest')?.onClick();
    quickFilters.find((filter) => filter.key === 'district')?.onClick();

    expect(handleQuickShowAll).toHaveBeenCalled();
    expect(handleQuickShowPinned).toHaveBeenCalled();
    expect(handleSortChange).toHaveBeenNthCalledWith(1, 'latest');
    expect(handleSortChange).toHaveBeenNthCalledWith(2, 'oldest');
    expect(handleSortChange).toHaveBeenNthCalledWith(3, 'district');
  });
});
