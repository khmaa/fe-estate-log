import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VisitLogSort } from '../types/visitLog';
import {
  buildVisitLogSearchParams,
  parseVisitLogFilters,
} from '../utils/visitLogFilterSearchParams';
import {
  defaultVisitLogFilters,
  hasActiveVisitLogFilters,
} from '../utils/visitLogFilters';

const useVisitLogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => parseVisitLogFilters(searchParams),
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
    setSearchParams(buildVisitLogSearchParams(searchParams, updates), {
      replace: true,
    });
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
