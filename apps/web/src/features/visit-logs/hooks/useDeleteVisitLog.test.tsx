import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { deleteVisitLogEntry } from '../services/deleteVisitLog.service';
import type { VisitLog } from '../types/visitLog';
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

  it('handles an empty visit logs cache when a delete mutation succeeds', async () => {
    vi.mocked(deleteVisitLogEntry).mockResolvedValue(undefined);

    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const setQueriesDataSpy = vi
      .spyOn(queryClient, 'setQueriesData')
      .mockImplementation((filters, updater) => {
        expect(filters).toEqual({ queryKey: ['visit-logs'] });

        const updateLogs = updater as (
          current: VisitLog[] | undefined,
        ) => VisitLog[] | undefined;

        expect(updateLogs(undefined)).toBeUndefined();
        expect(
          updateLogs([
            {
              id: 'visit-log-keep',
              title: 'Keep',
              district: '강남구',
              propertyType: 'apartment',
              status: 'draft',
              visitedAt: '2026-04-02T10:00:00.000Z',
              priceLabel: 'KRW 1.00B',
              agentName: '테스터',
              isPinned: false,
              summary: 'Summary',
            },
            {
              id: 'missing-log',
              title: 'Remove',
              district: '마포구',
              propertyType: 'retail',
              status: 'completed',
              visitedAt: '2026-04-02T11:00:00.000Z',
              priceLabel: 'KRW 900M',
              agentName: '테스터',
              isPinned: true,
              summary: 'Summary',
            },
          ]),
        ).toEqual([
          {
            id: 'visit-log-keep',
            title: 'Keep',
            district: '강남구',
            propertyType: 'apartment',
            status: 'draft',
            visitedAt: '2026-04-02T10:00:00.000Z',
            priceLabel: 'KRW 1.00B',
            agentName: '테스터',
            isPinned: false,
            summary: 'Summary',
          },
        ]);

        return [];
      });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteVisitLog(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync('missing-log');
    });

    expect(setQueriesDataSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ['visit-logs'],
      });
    });
  });
});
