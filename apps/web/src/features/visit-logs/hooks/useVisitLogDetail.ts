import { useMemo } from 'react';
import { useVisitLogs } from './useVisitLogs';

const useVisitLogDetail = (visitLogId: string | undefined) => {
  const query = useVisitLogs('latest');

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
