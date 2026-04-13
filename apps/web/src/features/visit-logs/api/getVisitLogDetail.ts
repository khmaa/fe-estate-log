import type { VisitLog } from '../types/visitLog';

class VisitLogDetailError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'VisitLogDetailError';
    this.status = status;
  }
}

const getVisitLogDetail = async (visitLogId: string): Promise<VisitLog> => {
  const response = await fetch(`/api/visit-logs/${visitLogId}`);

  if (!response.ok) {
    throw new VisitLogDetailError(
      'Failed to load the visit log detail.',
      response.status,
    );
  }

  return (await response.json()) as VisitLog;
};

export { getVisitLogDetail, VisitLogDetailError };
