import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVisitLogEntry } from '../services/deleteVisitLog.service';
import type { VisitLogListResponse } from '../types/visitLog';

const useDeleteVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVisitLogEntry,
    onSuccess: async (_, visitLogId) => {
      queryClient.setQueriesData(
        { queryKey: ['visit-logs'] },
        (current: VisitLogListResponse | undefined) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            items: current.items.filter(
              (visitLog) => visitLog.id !== visitLogId,
            ),
            totalCount: Math.max(0, current.totalCount - 1),
          };
        },
      );
      queryClient.removeQueries({
        queryKey: ['visit-log-detail', visitLogId],
      });

      await queryClient.invalidateQueries({
        queryKey: ['visit-logs'],
      });
    },
  });
};

export { useDeleteVisitLog };
