import { getVisitLogDetail } from '../api/getVisitLogDetail';

const loadVisitLogDetail = async (visitLogId: string) => {
  return getVisitLogDetail(visitLogId);
};

export { loadVisitLogDetail };
