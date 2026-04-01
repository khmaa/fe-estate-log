import { updateVisitLog } from '../api/updateVisitLog';
import type { UpdateVisitLogInput } from '../types/visitLog';

const updateVisitLogEntry = async (input: UpdateVisitLogInput) => {
  return updateVisitLog(input);
};

export { updateVisitLogEntry };
