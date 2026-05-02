import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VisitLogSort } from '../types/visitLog';
import {
  defaultVisitLogFilters,
  getVisitLogPageSize,
  getVisitLogSort,
  hasActiveVisitLogFilters,
  isDefaultVisitLogPage,
  isDefaultVisitLogPageSize,
  isDefaultVisitLogSort,
} from '../utils/visitLogFilters';

const useVisitLogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      page: Math.max(
        defaultVisitLogFilters.page,
        Number(searchParams.get('page') ?? '1') || defaultVisitLogFilters.page,
      ),
      pageSize: getVisitLogPageSize(searchParams.get('pageSize')),
      pinnedOnly: searchParams.get('pinned') === 'true',
      query: searchParams.get('query') ?? '',
      sort: getVisitLogSort(searchParams.get('sort')),
    }),
    [searchParams],
  );

  const hasActiveFilters = hasActiveVisitLogFilters(filters);

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
      if (isDefaultVisitLogSort(updates.sort)) {
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
      if (isDefaultVisitLogPage(updates.page)) {
        nextSearchParams.delete('page');
      } else {
        nextSearchParams.set('page', String(updates.page));
      }
    }

    if (updates.pageSize !== undefined) {
      if (isDefaultVisitLogPageSize(updates.pageSize)) {
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
    hasActiveFilters,
    resetFilters: () =>
      setSearchParams(new URLSearchParams(), { replace: true }),
    clearPage: () => updateSearchParams({ page: defaultVisitLogFilters.page }),
    clearPageSize: () =>
      updateSearchParams({ pageSize: defaultVisitLogFilters.pageSize }),
    clearPinnedOnly: () =>
      updateSearchParams({ pinnedOnly: defaultVisitLogFilters.pinnedOnly }),
    clearQuery: () =>
      updateSearchParams({ query: defaultVisitLogFilters.query }),
    clearSort: () => updateSearchParams({ sort: defaultVisitLogFilters.sort }),
    setPage: (page: number) => updateSearchParams({ page }),
    setPageSize: (pageSize: number) => updateSearchParams({ pageSize }),
    setPinnedOnly: (pinnedOnly: boolean) => updateSearchParams({ pinnedOnly }),
    setQuery: (query: string) => updateSearchParams({ query }),
    setSort: (sort: VisitLogSort) => updateSearchParams({ sort }),
  };
};

export { useVisitLogFilters };
