import { type QueryClient, useQuery } from '@tanstack/react-query';
import { VisitLogDetailError } from '../api/getVisitLogDetail';
import { loadVisitLogDetail } from '../services/visitLogDetail.service';

type VisitLogDetailErrorType = 'not-found' | 'unknown' | null;

const getVisitLogDetailQueryKey = (visitLogId: string | undefined) =>
  ['visit-log-detail', visitLogId] as const;

const getVisitLogDetailQueryOptions = (visitLogId: string) => ({
  queryKey: getVisitLogDetailQueryKey(visitLogId),
  queryFn: () => loadVisitLogDetail(visitLogId),
  retry: false,
});

const prefetchVisitLogDetail = (
  queryClient: QueryClient,
  visitLogId: string,
) => {
  return queryClient.prefetchQuery(getVisitLogDetailQueryOptions(visitLogId));
};

const useVisitLogDetail = (visitLogId: string | undefined) => {
  const query = useQuery({
    ...(visitLogId
      ? getVisitLogDetailQueryOptions(visitLogId)
      : {
          queryKey: getVisitLogDetailQueryKey(visitLogId),
          queryFn: () => loadVisitLogDetail(visitLogId as string),
          retry: false,
        }),
    enabled: Boolean(visitLogId),
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

export {
  getVisitLogDetailQueryKey,
  getVisitLogDetailQueryOptions,
  prefetchVisitLogDetail,
  useVisitLogDetail,
};
export type { VisitLogDetailErrorType };
