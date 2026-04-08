import { getVisitLogs } from '../api/getVisitLogs';
import type { VisitLogFilters } from '../types/visitLog';

const listVisitLogs = async (filters: VisitLogFilters) => {
  return getVisitLogs(filters);
};

export { listVisitLogs };
