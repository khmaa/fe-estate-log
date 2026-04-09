import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VisitLogSort } from '../types/visitLog';

const validSorts: VisitLogSort[] = ['latest', 'oldest', 'district'];

const getVisitLogSort = (rawSort: string | null): VisitLogSort => {
  if (rawSort && validSorts.includes(rawSort as VisitLogSort)) {
    return rawSort as VisitLogSort;
  }

  return 'latest';
};

const useVisitLogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      page: Math.max(1, Number(searchParams.get('page') ?? '1') || 1),
      pinnedOnly: searchParams.get('pinned') === 'true',
      query: searchParams.get('query') ?? '',
      sort: getVisitLogSort(searchParams.get('sort')),
    }),
    [searchParams],
  );

  const updateSearchParams = (updates: {
    page?: number;
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

    setSearchParams(nextSearchParams, { replace: true });
  };

  return {
    filters,
    setPage: (page: number) => updateSearchParams({ page }),
    setPinnedOnly: (pinnedOnly: boolean) => updateSearchParams({ pinnedOnly }),
    setQuery: (query: string) => updateSearchParams({ query }),
    setSort: (sort: VisitLogSort) => updateSearchParams({ sort }),
  };
};

export { useVisitLogFilters };
