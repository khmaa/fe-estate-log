import { useQuery } from '@tanstack/react-query';
import { listVisitLogs } from '../services/visitLogs.service';
import type { VisitLogFilters } from '../types/visitLog';

const useVisitLogs = (filters: VisitLogFilters) => {
  return useQuery({
    queryKey: ['visit-logs', filters],
    queryFn: () => listVisitLogs(filters),
  });
};

export { useVisitLogs };
