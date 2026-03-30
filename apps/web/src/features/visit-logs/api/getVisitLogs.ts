import type { VisitLog } from '../types/visitLog';

const getVisitLogs = async (): Promise<VisitLog[]> => {
  const response = await fetch('/api/visit-logs');

  if (!response.ok) {
    throw new Error('Failed to load visit logs.');
  }

  return (await response.json()) as VisitLog[];
};

export { getVisitLogs };
