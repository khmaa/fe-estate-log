import type { VisitLogFilters } from '../types/visitLog';
import {
  isDefaultVisitLogPage,
  isDefaultVisitLogPageSize,
  isDefaultVisitLogSort,
} from './visitLogFilters';
import { getVisitLogActiveSortLabel } from './visitLogLabels';

type VisitLogActiveFilterKey =
  | 'page'
  | 'pageSize'
  | 'pinned'
  | 'query'
  | 'sort';

type VisitLogActiveFilter = {
  key: VisitLogActiveFilterKey;
  label: string;
  removeLabel: string;
  onClear: () => void;
};

type VisitLogActiveFilterHandlers = {
  onClearPage: () => void;
  onClearPageSize: () => void;
  onClearPinnedOnly: () => void;
  onClearQuery: () => void;
  onClearSort: () => void;
};

type VisitLogFilterTranslator = (
  key: string,
  options?: Record<string, string | number>,
) => string;

const getVisitLogActiveFilters = (
  filters: VisitLogFilters,
  t: VisitLogFilterTranslator,
  {
    onClearPage,
    onClearPageSize,
    onClearPinnedOnly,
    onClearQuery,
    onClearSort,
  }: VisitLogActiveFilterHandlers,
): VisitLogActiveFilter[] => {
  return [
    filters.query
      ? {
          key: 'query' as const,
          label: t('visitLogs.filters.active.query', { query: filters.query }),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.query', {
              query: filters.query,
            }),
          }),
          onClear: onClearQuery,
        }
      : null,
    !isDefaultVisitLogSort(filters.sort)
      ? {
          key: 'sort' as const,
          label: getVisitLogActiveSortLabel(t, filters.sort),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: getVisitLogActiveSortLabel(t, filters.sort),
          }),
          onClear: onClearSort,
        }
      : null,
    filters.pinnedOnly
      ? {
          key: 'pinned' as const,
          label: t('visitLogs.filters.active.pinned'),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.pinned'),
          }),
          onClear: onClearPinnedOnly,
        }
      : null,
    !isDefaultVisitLogPageSize(filters.pageSize)
      ? {
          key: 'pageSize' as const,
          label: t('visitLogs.filters.active.pageSize', {
            pageSize: filters.pageSize,
          }),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.pageSize', {
              pageSize: filters.pageSize,
            }),
          }),
          onClear: onClearPageSize,
        }
      : null,
    !isDefaultVisitLogPage(filters.page)
      ? {
          key: 'page' as const,
          label: t('visitLogs.filters.active.page', { page: filters.page }),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.page', { page: filters.page }),
          }),
          onClear: onClearPage,
        }
      : null,
  ].filter((filter): filter is VisitLogActiveFilter => Boolean(filter));
};

export { getVisitLogActiveFilters };
export type {
  VisitLogActiveFilter,
  VisitLogActiveFilterHandlers,
  VisitLogActiveFilterKey,
  VisitLogFilterTranslator,
};
