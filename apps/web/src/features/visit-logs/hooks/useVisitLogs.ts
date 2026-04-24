import { useQuery } from '@tanstack/react-query';
import { listVisitLogs } from '../services/visitLogs.service';
import type { VisitLogFilters } from '../types/visitLog';
import { getVisitLogsQueryKey } from '../utils/visitLogQueryCache';

const useVisitLogs = (filters: VisitLogFilters) => {
  return useQuery({
    queryKey: getVisitLogsQueryKey(filters),
    queryFn: () => listVisitLogs(filters),
  });
};

export { useVisitLogs };
