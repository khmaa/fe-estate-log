import type { VisitLogFilters, VisitLogListResponse } from '../types/visitLog';
import {
  isDefaultVisitLogPage,
  isDefaultVisitLogPageSize,
  isDefaultVisitLogSort,
} from '../utils/visitLogFilters';

const getVisitLogs = async (
  filters: VisitLogFilters,
): Promise<VisitLogListResponse> => {
  const searchParams = new URLSearchParams();

  if (filters.query.trim()) {
    searchParams.set('query', filters.query.trim());
  }

  if (!isDefaultVisitLogSort(filters.sort)) {
    searchParams.set('sort', filters.sort);
  }

  if (filters.pinnedOnly) {
    searchParams.set('pinned', 'true');
  }

  if (!isDefaultVisitLogPage(filters.page)) {
    searchParams.set('page', String(filters.page));
  }

  if (!isDefaultVisitLogPageSize(filters.pageSize)) {
    searchParams.set('pageSize', String(filters.pageSize));
  }

  const requestPath = searchParams.size
    ? `/api/visit-logs?${searchParams.toString()}`
    : '/api/visit-logs';

  const response = await fetch(requestPath);

  if (!response.ok) {
    throw new Error('Failed to load visit logs.');
  }

  return (await response.json()) as VisitLogListResponse;
};

export { getVisitLogs };
