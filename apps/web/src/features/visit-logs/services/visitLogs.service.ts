import { getVisitLogs } from '../api/getVisitLogs';
import type { VisitLog, VisitLogSort } from '../types/visitLog';

const sortVisitLogs = (logs: VisitLog[], sort: VisitLogSort) => {
  const nextLogs = [...logs];

  switch (sort) {
    case 'oldest':
      return nextLogs.sort(
        (left, right) =>
          new Date(left.visitedAt).getTime() -
          new Date(right.visitedAt).getTime(),
      );
    case 'district':
      return nextLogs.sort((left, right) =>
        left.district.localeCompare(right.district),
      );
    case 'latest':
    default:
      return nextLogs.sort(
        (left, right) =>
          new Date(right.visitedAt).getTime() -
          new Date(left.visitedAt).getTime(),
      );
  }
};

const listVisitLogs = async (sort: VisitLogSort = 'latest') => {
  const logs = await getVisitLogs();

  return sortVisitLogs(logs, sort);
};

export { listVisitLogs, sortVisitLogs };
