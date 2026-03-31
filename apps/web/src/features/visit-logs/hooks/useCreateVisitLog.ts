import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVisitLogEntry } from '../services/createVisitLog.service';

const useCreateVisitLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVisitLogEntry,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['visit-logs'],
      });
    },
  });
};

export { useCreateVisitLog };
