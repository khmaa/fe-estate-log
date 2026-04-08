import { useMemo } from 'react';
import { useVisitLogs } from './useVisitLogs';

const defaultVisitLogFilters = {
  pinnedOnly: false,
  query: '',
  sort: 'latest' as const,
};

const useVisitLogDetail = (visitLogId: string | undefined) => {
  const query = useVisitLogs(defaultVisitLogFilters);

  const log = useMemo(() => {
    if (!visitLogId || !query.data) {
      return null;
    }

    return query.data.find((visitLog) => visitLog.id === visitLogId) ?? null;
  }, [query.data, visitLogId]);

  return {
    isLoading: query.isLoading,
    log,
  };
};

export { useVisitLogDetail };
