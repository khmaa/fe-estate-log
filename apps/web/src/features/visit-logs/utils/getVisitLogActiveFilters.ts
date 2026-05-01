import type { VisitLogFilters } from '../types/visitLog';

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
    filters.sort !== 'latest'
      ? {
          key: 'sort' as const,
          label: t(`visitLogs.filters.active.sort.${filters.sort}`),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t(`visitLogs.filters.active.sort.${filters.sort}`),
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
    filters.pageSize !== 2
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
    filters.page > 1
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
