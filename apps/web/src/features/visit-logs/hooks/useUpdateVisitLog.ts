import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVisitLogEntry } from '../services/updateVisitLog.service';

const useUpdateVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVisitLogEntry,
    onSuccess: async (updatedVisitLog) => {
      queryClient.setQueryData(
        ['visit-log-detail', updatedVisitLog.id],
        updatedVisitLog,
      );

      await queryClient.invalidateQueries({
        queryKey: ['visit-logs'],
      });
    },
  });
};

export { useUpdateVisitLog };
