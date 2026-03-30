import { useQuery } from '@tanstack/react-query';
import { listVisitLogs } from '../services/visitLogs.service';
import type { VisitLogSort } from '../types/visitLog';

const useVisitLogs = (sort: VisitLogSort) => {
  return useQuery({
    queryKey: ['visit-logs', sort],
    queryFn: () => listVisitLogs(sort),
  });
};

export { useVisitLogs };
