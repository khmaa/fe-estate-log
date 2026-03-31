import type { CreateVisitLogInput, VisitLog } from '../types/visitLog';

const createVisitLog = async (
  input: CreateVisitLogInput,
): Promise<VisitLog> => {
  const response = await fetch('/api/visit-logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to create a visit log.');
  }

  return (await response.json()) as VisitLog;
};

export { createVisitLog };
