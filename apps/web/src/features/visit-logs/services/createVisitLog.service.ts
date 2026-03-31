import { createVisitLog } from '../api/createVisitLog';
import type { CreateVisitLogInput } from '../types/visitLog';

const createVisitLogEntry = async (input: CreateVisitLogInput) => {
  return createVisitLog(input);
};

export { createVisitLogEntry };
