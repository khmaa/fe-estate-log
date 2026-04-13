import { useQuery } from '@tanstack/react-query';
import { VisitLogDetailError } from '../api/getVisitLogDetail';
import { loadVisitLogDetail } from '../services/visitLogDetail.service';

type VisitLogDetailErrorType = 'not-found' | 'unknown' | null;

const useVisitLogDetail = (visitLogId: string | undefined) => {
  const query = useQuery({
    queryKey: ['visit-log-detail', visitLogId],
    queryFn: () => loadVisitLogDetail(visitLogId as string),
    enabled: Boolean(visitLogId),
    retry: false,
  });

  const isNotFound =
    query.error instanceof VisitLogDetailError && query.error.status === 404;

  const errorType: VisitLogDetailErrorType = query.isError
    ? isNotFound
      ? 'not-found'
      : 'unknown'
    : null;

  return {
    errorType,
    isError: query.isError,
    isLoading: query.isPending,
    log: query.data ?? null,
  };
};

export { useVisitLogDetail };
export type { VisitLogDetailErrorType };
