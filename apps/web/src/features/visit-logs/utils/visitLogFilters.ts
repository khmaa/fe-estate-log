import type { VisitLogFilters, VisitLogSort } from '../types/visitLog';

const validVisitLogSorts: VisitLogSort[] = ['latest', 'oldest', 'district'];
const validVisitLogPageSizes = [2, 5, 10] as const;

const defaultVisitLogFilters: VisitLogFilters = {
  page: 1,
  pageSize: 2,
  pinnedOnly: false,
  query: '',
  sort: 'latest',
};

const getVisitLogSort = (rawSort: string | null): VisitLogSort => {
  if (rawSort && validVisitLogSorts.includes(rawSort as VisitLogSort)) {
    return rawSort as VisitLogSort;
  }

  return defaultVisitLogFilters.sort;
};

const getVisitLogPageSize = (rawPageSize: string | null) => {
  const parsedPageSize = Number(
    rawPageSize ?? String(defaultVisitLogFilters.pageSize),
  );

  if (
    Number.isFinite(parsedPageSize) &&
    validVisitLogPageSizes.includes(
      parsedPageSize as (typeof validVisitLogPageSizes)[number],
    )
  ) {
    return parsedPageSize as (typeof validVisitLogPageSizes)[number];
  }

  return defaultVisitLogFilters.pageSize;
};

const isDefaultVisitLogPage = (page: number) =>
  page <= defaultVisitLogFilters.page;

const isDefaultVisitLogPageSize = (pageSize: number) =>
  pageSize === defaultVisitLogFilters.pageSize;

const isDefaultVisitLogSort = (sort: VisitLogSort) =>
  sort === defaultVisitLogFilters.sort;

const hasActiveVisitLogFilters = (filters: VisitLogFilters) =>
  filters.page !== defaultVisitLogFilters.page ||
  filters.pageSize !== defaultVisitLogFilters.pageSize ||
  filters.pinnedOnly !== defaultVisitLogFilters.pinnedOnly ||
  filters.query !== defaultVisitLogFilters.query ||
  filters.sort !== defaultVisitLogFilters.sort;

export {
  defaultVisitLogFilters,
  getVisitLogPageSize,
  getVisitLogSort,
  hasActiveVisitLogFilters,
  isDefaultVisitLogPage,
  isDefaultVisitLogPageSize,
  isDefaultVisitLogSort,
  validVisitLogPageSizes,
  validVisitLogSorts,
};
