import { useQuery } from '@tanstack/react-query';
import { loadVisitLogDetail } from '../services/visitLogDetail.service';

const useVisitLogDetail = (visitLogId: string | undefined) => {
  const query = useQuery({
    queryKey: ['visit-log-detail', visitLogId],
    queryFn: () => loadVisitLogDetail(visitLogId as string),
    enabled: Boolean(visitLogId),
    retry: false,
  });

  return {
    isLoading: query.isPending,
    log: query.data ?? null,
  };
};

export { useVisitLogDetail };
