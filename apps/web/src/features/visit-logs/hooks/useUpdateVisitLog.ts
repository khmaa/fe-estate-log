import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVisitLogEntry } from '../services/updateVisitLog.service';

const useUpdateVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVisitLogEntry,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['visit-logs'],
      });
    },
  });
};

export { useUpdateVisitLog };
