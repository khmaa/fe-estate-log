import type { QueryClient, QueryKey } from '@tanstack/react-query';
import type {
  UpdateVisitLogInput,
  VisitLog,
  VisitLogFilters,
  VisitLogListResponse,
} from '../types/visitLog';

const visitLogsQueryPrefix = ['visit-logs'] as const;

const getVisitLogsQueryKey = (filters: VisitLogFilters) =>
  [...visitLogsQueryPrefix, filters] as const;

type VisitLogsCacheSnapshot = [QueryKey, VisitLogListResponse | undefined];

const compareVisitLogs = (
  left: VisitLog,
  right: VisitLog,
  sort: VisitLogFilters['sort'],
) => {
  switch (sort) {
    case 'oldest':
      return (
        new Date(left.visitedAt).getTime() - new Date(right.visitedAt).getTime()
      );
    case 'district':
      return left.district.localeCompare(right.district);
    case 'latest':
    default:
      return (
        new Date(right.visitedAt).getTime() - new Date(left.visitedAt).getTime()
      );
  }
};

const normalizePaginationMeta = (
  current: VisitLogListResponse,
  totalCount: number,
) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / current.pageSize));

  return {
    page: Math.min(current.page, totalPages),
    totalCount,
    totalPages,
  };
};

const matchesVisitLogFilters = (
  visitLog: VisitLog,
  filters: VisitLogFilters,
) => {
  if (filters.pinnedOnly && !visitLog.isPinned) {
    return false;
  }

  const normalizedQuery = filters.query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [visitLog.title, visitLog.district, visitLog.agentName].some((value) =>
    value.toLowerCase().includes(normalizedQuery),
  );
};

const applyCreatedVisitLogToList = (
  current: VisitLogListResponse,
  filters: VisitLogFilters,
  createdVisitLog: VisitLog,
) => {
  if (!matchesVisitLogFilters(createdVisitLog, filters)) {
    return current;
  }

  const nextMeta = normalizePaginationMeta(current, current.totalCount + 1);

  if (filters.page !== 1 || filters.sort !== 'latest') {
    return {
      ...current,
      ...nextMeta,
    };
  }

  return {
    ...current,
    ...nextMeta,
    items: [createdVisitLog, ...current.items].slice(0, current.pageSize),
  };
};

const applyOptimisticVisitLogUpdateToList = (
  current: VisitLogListResponse,
  filters: VisitLogFilters,
  input: UpdateVisitLogInput,
) => {
  const existingIndex = current.items.findIndex(
    (visitLog) => visitLog.id === input.id,
  );

  if (existingIndex === -1) {
    return current;
  }

  const nextVisitLog = {
    ...current.items[existingIndex],
    ...input,
  };

  if (!matchesVisitLogFilters(nextVisitLog, filters)) {
    const nextItems = current.items.filter(
      (visitLog) => visitLog.id !== input.id,
    );
    const nextMeta = normalizePaginationMeta(current, current.totalCount - 1);

    return {
      ...current,
      ...nextMeta,
      items: nextItems,
    };
  }

  const nextItems = [...current.items];
  nextItems[existingIndex] = nextVisitLog;
  nextItems.sort((left, right) => compareVisitLogs(left, right, filters.sort));

  return {
    ...current,
    items: nextItems,
  };
};

const applyUpdatedVisitLogToList = (
  current: VisitLogListResponse,
  filters: VisitLogFilters,
  updatedVisitLog: VisitLog,
) => {
  const existingIndex = current.items.findIndex(
    (visitLog) => visitLog.id === updatedVisitLog.id,
  );

  if (existingIndex === -1) {
    return current;
  }

  if (!matchesVisitLogFilters(updatedVisitLog, filters)) {
    const nextItems = current.items.filter(
      (visitLog) => visitLog.id !== updatedVisitLog.id,
    );
    const nextMeta = normalizePaginationMeta(current, current.totalCount - 1);

    return {
      ...current,
      ...nextMeta,
      items: nextItems,
    };
  }

  const nextItems = [...current.items];
  nextItems[existingIndex] = updatedVisitLog;
  nextItems.sort((left, right) => compareVisitLogs(left, right, filters.sort));

  return {
    ...current,
    items: nextItems,
  };
};

const applyDeletedVisitLogToList = (
  current: VisitLogListResponse,
  visitLogId: string,
) => {
  const nextItems = current.items.filter(
    (visitLog) => visitLog.id !== visitLogId,
  );
  const nextMeta = normalizePaginationMeta(
    current,
    Math.max(0, current.totalCount - 1),
  );

  return {
    ...current,
    ...nextMeta,
    items: nextItems,
  };
};

const getVisitLogsCacheSnapshots = (queryClient: QueryClient) =>
  queryClient.getQueriesData<VisitLogListResponse>({
    queryKey: visitLogsQueryPrefix,
  });

const restoreVisitLogsCacheSnapshots = (
  queryClient: QueryClient,
  snapshots: VisitLogsCacheSnapshot[],
) => {
  snapshots.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data);
  });
};

const syncVisitLogsListCaches = (
  queryClient: QueryClient,
  updater: (
    current: VisitLogListResponse,
    filters: VisitLogFilters,
  ) => VisitLogListResponse,
) => {
  const snapshots = getVisitLogsCacheSnapshots(queryClient);

  snapshots.forEach(([queryKey, current]) => {
    if (!current) {
      return;
    }

    const filters = queryKey[1];

    if (!filters || typeof filters !== 'object') {
      return;
    }

    queryClient.setQueryData(
      queryKey,
      updater(current, filters as VisitLogFilters),
    );
  });
};

export {
  applyCreatedVisitLogToList,
  applyDeletedVisitLogToList,
  applyOptimisticVisitLogUpdateToList,
  applyUpdatedVisitLogToList,
  getVisitLogsCacheSnapshots,
  getVisitLogsQueryKey,
  matchesVisitLogFilters,
  restoreVisitLogsCacheSnapshots,
  syncVisitLogsListCaches,
  visitLogsQueryPrefix,
};
export type { VisitLogsCacheSnapshot };
