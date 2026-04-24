import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { updateVisitLogEntry } from '../services/updateVisitLog.service';
import type { VisitLogListResponse } from '../types/visitLog';
import { useUpdateVisitLog } from './useUpdateVisitLog';

vi.mock('../services/updateVisitLog.service', () => ({
  updateVisitLogEntry: vi.fn(),
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

const originalVisitLog = {
  id: 'visit-log-1',
  title: 'Original title',
  district: '강남구',
  propertyType: 'apartment' as const,
  status: 'completed' as const,
  visitedAt: '2026-04-20T10:00:00.000Z',
  priceLabel: 'KRW 1.20B',
  agentName: '박민지',
  isPinned: true,
  summary: 'Original summary.',
};

describe('useUpdateVisitLog', () => {
  it('optimistically syncs and then commits visit log updates to detail and list caches', async () => {
    vi.mocked(updateVisitLogEntry).mockResolvedValue({
      ...originalVisitLog,
      title: 'Updated title',
      district: '송파구',
      priceLabel: 'KRW 1.40B',
      summary: 'Updated summary.',
    } as Awaited<ReturnType<typeof updateVisitLogEntry>>);

    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    queryClient.setQueryData(
      ['visit-log-detail', 'visit-log-1'],
      originalVisitLog,
    );
    queryClient.setQueryData(visitLogsQueryKey, {
      items: [originalVisitLog],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    } satisfies VisitLogListResponse);

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

    expect(
      queryClient.getQueryData(['visit-log-detail', 'visit-log-1']),
    ).toEqual(
      expect.objectContaining({
        id: 'visit-log-1',
        title: 'Updated title',
        district: '송파구',
      }),
    );
    expect(
      queryClient.getQueryData<VisitLogListResponse>(visitLogsQueryKey),
    ).toEqual(
      expect.objectContaining({
        items: [
          expect.objectContaining({
            id: 'visit-log-1',
            title: 'Updated title',
            district: '송파구',
          }),
        ],
      }),
    );
  });

  it('restores cached detail and list data when the update mutation fails', async () => {
    vi.mocked(updateVisitLogEntry).mockRejectedValue(
      new Error('update failed'),
    );

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    queryClient.setQueryData(
      ['visit-log-detail', 'visit-log-1'],
      originalVisitLog,
    );
    queryClient.setQueryData(visitLogsQueryKey, {
      items: [originalVisitLog],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    } satisfies VisitLogListResponse);

    const { result } = renderHook(() => useUpdateVisitLog(), { wrapper });

    await expect(
      act(async () => {
        await result.current.mutateAsync({
          id: 'visit-log-1',
          title: 'Updated title',
          district: '송파구',
          propertyType: 'apartment',
          priceLabel: 'KRW 1.40B',
          summary: 'Updated summary.',
        });
      }),
    ).rejects.toThrow('update failed');

    expect(
      queryClient.getQueryData(['visit-log-detail', 'visit-log-1']),
    ).toEqual(originalVisitLog);
    expect(
      queryClient.getQueryData<VisitLogListResponse>(visitLogsQueryKey),
    ).toEqual(
      expect.objectContaining({
        items: [expect.objectContaining({ title: 'Original title' })],
      }),
    );
  });
});
