import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { deleteVisitLogEntry } from '../services/deleteVisitLog.service';
import { useDeleteVisitLog } from './useDeleteVisitLog';

vi.mock('../services/deleteVisitLog.service', () => ({
  deleteVisitLogEntry: vi.fn(),
}));

describe('useDeleteVisitLog', () => {
  it('invalidates the visit logs query after a successful mutation', async () => {
    vi.mocked(deleteVisitLogEntry).mockResolvedValue(undefined);

    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteVisitLog(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync('visit-log-1');
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ['visit-logs'],
      });
    });
  });
});
