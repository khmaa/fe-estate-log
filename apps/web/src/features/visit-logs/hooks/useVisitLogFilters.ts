import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VisitLogSort } from '../types/visitLog';

const validSorts: VisitLogSort[] = ['latest', 'oldest', 'district'];
const validPageSizes = [2, 5, 10] as const;

const getVisitLogSort = (rawSort: string | null): VisitLogSort => {
  if (rawSort && validSorts.includes(rawSort as VisitLogSort)) {
    return rawSort as VisitLogSort;
  }

  return 'latest';
};

const getVisitLogPageSize = (rawPageSize: string | null) => {
  const parsedPageSize = Number(rawPageSize ?? '2');

  if (
    Number.isFinite(parsedPageSize) &&
    validPageSizes.includes(parsedPageSize as (typeof validPageSizes)[number])
  ) {
    return parsedPageSize as (typeof validPageSizes)[number];
  }

  return 2;
};

const useVisitLogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      page: Math.max(1, Number(searchParams.get('page') ?? '1') || 1),
      pageSize: getVisitLogPageSize(searchParams.get('pageSize')),
      pinnedOnly: searchParams.get('pinned') === 'true',
      query: searchParams.get('query') ?? '',
      sort: getVisitLogSort(searchParams.get('sort')),
    }),
    [searchParams],
  );

  const updateSearchParams = (updates: {
    page?: number;
    pageSize?: number;
    pinnedOnly?: boolean;
    query?: string;
    sort?: VisitLogSort;
  }) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (updates.query !== undefined) {
      const normalizedQuery = updates.query.trim();

      if (normalizedQuery) {
        nextSearchParams.set('query', normalizedQuery);
      } else {
        nextSearchParams.delete('query');
      }

      nextSearchParams.delete('page');
    }

    if (updates.sort !== undefined) {
      if (updates.sort === 'latest') {
        nextSearchParams.delete('sort');
      } else {
        nextSearchParams.set('sort', updates.sort);
      }

      nextSearchParams.delete('page');
    }

    if (updates.pinnedOnly !== undefined) {
      if (updates.pinnedOnly) {
        nextSearchParams.set('pinned', 'true');
      } else {
        nextSearchParams.delete('pinned');
      }

      nextSearchParams.delete('page');
    }

    if (updates.page !== undefined) {
      if (updates.page <= 1) {
        nextSearchParams.delete('page');
      } else {
        nextSearchParams.set('page', String(updates.page));
      }
    }

    if (updates.pageSize !== undefined) {
      if (updates.pageSize === 2) {
        nextSearchParams.delete('pageSize');
      } else {
        nextSearchParams.set('pageSize', String(updates.pageSize));
      }

      nextSearchParams.delete('page');
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  return {
    filters,
    setPage: (page: number) => updateSearchParams({ page }),
    setPageSize: (pageSize: number) => updateSearchParams({ pageSize }),
    setPinnedOnly: (pinnedOnly: boolean) => updateSearchParams({ pinnedOnly }),
    setQuery: (query: string) => updateSearchParams({ query }),
    setSort: (sort: VisitLogSort) => updateSearchParams({ sort }),
  };
};

export { useVisitLogFilters };
