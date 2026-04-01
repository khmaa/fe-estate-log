import type { UpdateVisitLogInput, VisitLog } from '../types/visitLog';

const updateVisitLog = async (
  input: UpdateVisitLogInput,
): Promise<VisitLog> => {
  const response = await fetch(`/api/visit-logs/${input.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to update the visit log.');
  }

  return (await response.json()) as VisitLog;
};

export { updateVisitLog };
