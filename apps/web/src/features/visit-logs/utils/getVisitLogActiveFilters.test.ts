import { describe, expect, it, vi } from 'vitest';
import type { VisitLogFilterTranslator } from './getVisitLogActiveFilters';
import { getVisitLogActiveFilters } from './getVisitLogActiveFilters';

const dictionary = {
  'visitLogs.filters.active.page': ({ page }: { page: number }) =>
    `Page: ${page}`,
  'visitLogs.filters.active.pageSize': ({ pageSize }: { pageSize: number }) =>
    `Page size: ${pageSize}`,
  'visitLogs.filters.active.pinned': () => 'Pinned only',
  'visitLogs.filters.active.query': ({ query }: { query: string }) =>
    `Search: ${query}`,
  'visitLogs.filters.active.remove': ({ label }: { label: string }) =>
    `Clear ${label} filter`,
  'visitLogs.filters.active.sort.district': () => 'Sort: District',
  'visitLogs.filters.active.sort.latest': () => 'Sort: Latest',
  'visitLogs.filters.active.sort.oldest': () => 'Sort: Oldest',
} as const;

const t: VisitLogFilterTranslator = (key, options) => {
  const resolver = dictionary[key as keyof typeof dictionary] as (
    args: Record<string, string | number>,
  ) => string;
  return resolver(options ?? {});
};

describe('getVisitLogActiveFilters', () => {
  it('returns only non-default active filter models', () => {
    const onClearPage = vi.fn();
    const onClearPageSize = vi.fn();
    const onClearPinnedOnly = vi.fn();
    const onClearQuery = vi.fn();
    const onClearSort = vi.fn();

    const filters = getVisitLogActiveFilters(
      {
        page: 2,
        pageSize: 5,
        pinnedOnly: true,
        query: 'gangnam',
        sort: 'district',
      },
      t,
      {
        onClearPage,
        onClearPageSize,
        onClearPinnedOnly,
        onClearQuery,
        onClearSort,
      },
    );

    expect(filters).toEqual([
      {
        key: 'query',
        label: 'Search: gangnam',
        removeLabel: 'Clear Search: gangnam filter',
        onClear: onClearQuery,
      },
      {
        key: 'sort',
        label: 'Sort: District',
        removeLabel: 'Clear Sort: District filter',
        onClear: onClearSort,
      },
      {
        key: 'pinned',
        label: 'Pinned only',
        removeLabel: 'Clear Pinned only filter',
        onClear: onClearPinnedOnly,
      },
      {
        key: 'pageSize',
        label: 'Page size: 5',
        removeLabel: 'Clear Page size: 5 filter',
        onClear: onClearPageSize,
      },
      {
        key: 'page',
        label: 'Page: 2',
        removeLabel: 'Clear Page: 2 filter',
        onClear: onClearPage,
      },
    ]);
  });

  it('returns an empty array for the default filter state', () => {
    expect(
      getVisitLogActiveFilters(
        {
          page: 1,
          pageSize: 2,
          pinnedOnly: false,
          query: '',
          sort: 'latest',
        },
        t,
        {
          onClearPage: vi.fn(),
          onClearPageSize: vi.fn(),
          onClearPinnedOnly: vi.fn(),
          onClearQuery: vi.fn(),
          onClearSort: vi.fn(),
        },
      ),
    ).toEqual([]);
  });
});
