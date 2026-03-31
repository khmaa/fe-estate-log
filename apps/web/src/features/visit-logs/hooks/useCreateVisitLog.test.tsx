import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createVisitLogEntry } from '../services/createVisitLog.service';
import { useCreateVisitLog } from './useCreateVisitLog';

vi.mock('../services/createVisitLog.service', () => ({
  createVisitLogEntry: vi.fn(),
}));

describe('useCreateVisitLog', () => {
  it('invalidates the visit logs query after a successful mutation', async () => {
    vi.mocked(createVisitLogEntry).mockResolvedValue({
      id: 'visit-log-4',
    } as Awaited<ReturnType<typeof createVisitLogEntry>>);

    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCreateVisitLog(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        title: 'Jamsil draft',
        district: 'Songpa-gu',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.35B',
        summary: 'Need a second pass.',
      });
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ['visit-logs'],
      });
    });
  });
});
