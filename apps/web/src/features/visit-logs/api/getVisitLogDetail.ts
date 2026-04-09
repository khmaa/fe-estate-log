import type { VisitLog } from '../types/visitLog';

const getVisitLogDetail = async (visitLogId: string): Promise<VisitLog> => {
  const response = await fetch(`/api/visit-logs/${visitLogId}`);

  if (!response.ok) {
    throw new Error('Failed to load the visit log detail.');
  }

  return (await response.json()) as VisitLog;
};

export { getVisitLogDetail };
