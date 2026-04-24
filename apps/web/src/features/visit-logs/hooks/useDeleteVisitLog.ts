import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVisitLogEntry } from '../services/deleteVisitLog.service';
import {
  applyDeletedVisitLogToList,
  getVisitLogsCacheSnapshots,
  restoreVisitLogsCacheSnapshots,
  syncVisitLogsListCaches,
  visitLogsQueryPrefix,
} from '../utils/visitLogQueryCache';
import { getVisitLogDetailQueryKey } from './useVisitLogDetail';

const useDeleteVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVisitLogEntry,
    onMutate: async (visitLogId) => {
      await queryClient.cancelQueries({
        queryKey: visitLogsQueryPrefix,
      });
      await queryClient.cancelQueries({
        queryKey: getVisitLogDetailQueryKey(visitLogId),
      });

      const detailQueryKey = getVisitLogDetailQueryKey(visitLogId);
      const detailSnapshot = queryClient.getQueryData(detailQueryKey);
      const listSnapshots = getVisitLogsCacheSnapshots(queryClient);

      syncVisitLogsListCaches(queryClient, (current) =>
        applyDeletedVisitLogToList(current, visitLogId),
      );
      queryClient.removeQueries({
        queryKey: detailQueryKey,
      });

      return {
        detailQueryKey,
        detailSnapshot,
        listSnapshots,
      };
    },
    onError: (_error, _visitLogId, context) => {
      queryClient.setQueryData(
        context!.detailQueryKey,
        context!.detailSnapshot,
      );
      restoreVisitLogsCacheSnapshots(queryClient, context!.listSnapshots);
    },
    onSuccess: async (_, visitLogId) => {
      queryClient.removeQueries({
        queryKey: getVisitLogDetailQueryKey(visitLogId),
      });

      await queryClient.invalidateQueries({
        queryKey: visitLogsQueryPrefix,
      });
    },
  });
};

export { useDeleteVisitLog };
