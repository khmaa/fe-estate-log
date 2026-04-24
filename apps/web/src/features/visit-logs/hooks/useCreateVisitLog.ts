import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVisitLogEntry } from '../services/createVisitLog.service';
import {
  applyCreatedVisitLogToList,
  syncVisitLogsListCaches,
  visitLogsQueryPrefix,
} from '../utils/visitLogQueryCache';

const useCreateVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVisitLogEntry,
    onSuccess: async (createdVisitLog) => {
      syncVisitLogsListCaches(queryClient, (current, filters) =>
        applyCreatedVisitLogToList(current, filters, createdVisitLog),
      );

      await queryClient.invalidateQueries({
        queryKey: visitLogsQueryPrefix,
      });
    },
  });
};

export { useCreateVisitLog };
