import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVisitLogEntry } from '../services/deleteVisitLog.service';
import type { VisitLog } from '../types/visitLog';

const useDeleteVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVisitLogEntry,
    onSuccess: async (_, visitLogId) => {
      queryClient.setQueriesData(
        { queryKey: ['visit-logs'] },
        (current: VisitLog[] | undefined) =>
          current?.filter((visitLog) => visitLog.id !== visitLogId) ?? current,
      );

      await queryClient.invalidateQueries({
        queryKey: ['visit-logs'],
      });
    },
  });
};

export { useDeleteVisitLog };
