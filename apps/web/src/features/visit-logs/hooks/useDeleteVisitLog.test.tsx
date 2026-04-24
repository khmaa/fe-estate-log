import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { deleteVisitLogEntry } from '../services/deleteVisitLog.service';
import type { VisitLogListResponse } from '../types/visitLog';
import { useDeleteVisitLog } from './useDeleteVisitLog';

vi.mock('../services/deleteVisitLog.service', () => ({
  deleteVisitLogEntry: vi.fn(),
}));

const visitLogsQueryKey = [
  'visit-logs',
  {
    page: 1,
    pageSize: 2,
    pinnedOnly: false,
    query: '',
    sort: 'latest',
  },
] as const;

const targetVisitLog = {
  id: 'visit-log-1',
  title: 'Delete target',
  district: '강남구',
  propertyType: 'apartment' as const,
  status: 'completed' as const,
  visitedAt: '2026-04-20T10:00:00.000Z',
  priceLabel: 'KRW 1.20B',
  agentName: '박민지',
  isPinned: true,
  summary: 'Summary.',
};

describe('useDeleteVisitLog', () => {
  it('optimistically removes the deleted visit log from detail and list caches', async () => {
    vi.mocked(deleteVisitLogEntry).mockResolvedValue(undefined);

    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    queryClient.setQueryData(
      ['visit-log-detail', 'visit-log-1'],
      targetVisitLog,
    );
    queryClient.setQueryData(visitLogsQueryKey, {
      items: [targetVisitLog],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    } satisfies VisitLogListResponse);

    const { result } = renderHook(() => useDeleteVisitLog(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync('visit-log-1');
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ['visit-logs'],
      });
    });

    expect(
      queryClient.getQueryData(['visit-log-detail', 'visit-log-1']),
    ).toBeUndefined();
    expect(
      queryClient.getQueryData<VisitLogListResponse>(visitLogsQueryKey),
    ).toEqual({
      items: [],
      page: 1,
      pageSize: 2,
      totalCount: 0,
      totalPages: 1,
    });
  });

  it('restores cached detail and list data when the delete mutation fails', async () => {
    vi.mocked(deleteVisitLogEntry).mockRejectedValue(
      new Error('delete failed'),
    );

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    queryClient.setQueryData(
      ['visit-log-detail', 'visit-log-1'],
      targetVisitLog,
    );
    queryClient.setQueryData(visitLogsQueryKey, {
      items: [targetVisitLog],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    } satisfies VisitLogListResponse);

    const { result } = renderHook(() => useDeleteVisitLog(), { wrapper });

    await expect(
      act(async () => {
        await result.current.mutateAsync('visit-log-1');
      }),
    ).rejects.toThrow('delete failed');

    expect(
      queryClient.getQueryData(['visit-log-detail', 'visit-log-1']),
    ).toEqual(targetVisitLog);
    expect(
      queryClient.getQueryData<VisitLogListResponse>(visitLogsQueryKey),
    ).toEqual({
      items: [targetVisitLog],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    });
  });
});
