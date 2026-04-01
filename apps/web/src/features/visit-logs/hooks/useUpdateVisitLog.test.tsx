import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { updateVisitLogEntry } from '../services/updateVisitLog.service';
import { useUpdateVisitLog } from './useUpdateVisitLog';

vi.mock('../services/updateVisitLog.service', () => ({
  updateVisitLogEntry: vi.fn(),
}));

describe('useUpdateVisitLog', () => {
  it('invalidates the visit logs query after a successful mutation', async () => {
    vi.mocked(updateVisitLogEntry).mockResolvedValue({
      id: 'visit-log-1',
    } as Awaited<ReturnType<typeof updateVisitLogEntry>>);

    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUpdateVisitLog(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        id: 'visit-log-1',
        title: 'Updated title',
        district: '송파구',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.40B',
        summary: 'Updated summary.',
      });
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ['visit-logs'],
      });
    });
  });
});
