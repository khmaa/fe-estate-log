import type { VisitLogFilters, VisitLogSort } from '../types/visitLog';
import {
  defaultVisitLogFilters,
  getVisitLogPageSize,
  getVisitLogSort,
  isDefaultVisitLogPage,
  isDefaultVisitLogPageSize,
  isDefaultVisitLogSort,
} from './visitLogFilters';

type VisitLogFilterUpdates = {
  page?: number;
  pageSize?: number;
  pinnedOnly?: boolean;
  query?: string;
  sort?: VisitLogSort;
};

const parseVisitLogFilters = (
  searchParams: URLSearchParams,
): VisitLogFilters => ({
  page: Math.max(
    defaultVisitLogFilters.page,
    Number(searchParams.get('page') ?? String(defaultVisitLogFilters.page)) ||
      defaultVisitLogFilters.page,
  ),
  pageSize: getVisitLogPageSize(searchParams.get('pageSize')),
  pinnedOnly: searchParams.get('pinned') === 'true',
  query: searchParams.get('query') ?? defaultVisitLogFilters.query,
  sort: getVisitLogSort(searchParams.get('sort')),
});

const buildVisitLogSearchParams = (
  currentSearchParams: URLSearchParams,
  updates: VisitLogFilterUpdates,
) => {
  const nextSearchParams = new URLSearchParams(currentSearchParams);

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

  return nextSearchParams;
};

export { buildVisitLogSearchParams, parseVisitLogFilters };
export type { VisitLogFilterUpdates };
