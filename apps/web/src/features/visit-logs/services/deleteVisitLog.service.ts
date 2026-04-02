import { deleteVisitLog } from '../api/deleteVisitLog';

const deleteVisitLogEntry = async (visitLogId: string) => {
  await deleteVisitLog(visitLogId);
};

export { deleteVisitLogEntry };
