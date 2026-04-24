import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVisitLogEntry } from '../services/updateVisitLog.service';
import {
  applyOptimisticVisitLogUpdateToList,
  applyUpdatedVisitLogToList,
  getVisitLogsCacheSnapshots,
  restoreVisitLogsCacheSnapshots,
  syncVisitLogsListCaches,
  visitLogsQueryPrefix,
} from '../utils/visitLogQueryCache';
import { getVisitLogDetailQueryKey } from './useVisitLogDetail';

const useUpdateVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVisitLogEntry,
    onMutate: async (input) => {
      await queryClient.cancelQueries({
        queryKey: visitLogsQueryPrefix,
      });
      await queryClient.cancelQueries({
        queryKey: getVisitLogDetailQueryKey(input.id),
      });

      const detailQueryKey = getVisitLogDetailQueryKey(input.id);
      const detailSnapshot = queryClient.getQueryData(detailQueryKey);
      const listSnapshots = getVisitLogsCacheSnapshots(queryClient);

      if (detailSnapshot) {
        queryClient.setQueryData(detailQueryKey, {
          ...detailSnapshot,
          ...input,
        });
      }

      syncVisitLogsListCaches(queryClient, (current, filters) =>
        applyOptimisticVisitLogUpdateToList(current, filters, input),
      );

      return {
        detailQueryKey,
        detailSnapshot,
        listSnapshots,
      };
    },
    onError: (_error, _input, context) => {
      queryClient.setQueryData(
        context!.detailQueryKey,
        context!.detailSnapshot,
      );
      restoreVisitLogsCacheSnapshots(queryClient, context!.listSnapshots);
    },
    onSuccess: async (updatedVisitLog) => {
      queryClient.setQueryData(
        getVisitLogDetailQueryKey(updatedVisitLog.id),
        updatedVisitLog,
      );
      syncVisitLogsListCaches(queryClient, (current, filters) =>
        applyUpdatedVisitLogToList(current, filters, updatedVisitLog),
      );

      await queryClient.invalidateQueries({
        queryKey: visitLogsQueryPrefix,
      });
    },
  });
};

export { useUpdateVisitLog };
