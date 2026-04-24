import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createVisitLogEntry } from '../services/createVisitLog.service';
import type { VisitLogListResponse } from '../types/visitLog';
import { useCreateVisitLog } from './useCreateVisitLog';

vi.mock('../services/createVisitLog.service', () => ({
  createVisitLogEntry: vi.fn(),
}));

describe('useCreateVisitLog', () => {
  it('updates the first latest visit logs page cache after a successful mutation', async () => {
    vi.mocked(createVisitLogEntry).mockResolvedValue({
      id: 'visit-log-4',
      title: 'Jamsil draft',
      district: 'Songpa-gu',
      propertyType: 'apartment',
      status: 'draft',
      visitedAt: '2026-04-21T10:00:00.000Z',
      priceLabel: 'KRW 1.35B',
      agentName: 'Mock Agent',
      isPinned: false,
      summary: 'Need a second pass.',
    } as Awaited<ReturnType<typeof createVisitLogEntry>>);

    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    queryClient.setQueryData(
      [
        'visit-logs',
        {
          page: 1,
          pageSize: 2,
          pinnedOnly: false,
          query: '',
          sort: 'latest',
        },
      ],
      {
        items: [
          {
            id: 'visit-log-1',
            title: 'Gangnam revisit',
            district: 'Gangnam-gu',
            propertyType: 'apartment',
            status: 'completed',
            visitedAt: '2026-04-20T10:00:00.000Z',
            priceLabel: 'KRW 1.20B',
            agentName: 'Agent',
            isPinned: true,
            summary: 'Summary',
          },
          {
            id: 'visit-log-2',
            title: 'Seongsu office',
            district: 'Seongdong-gu',
            propertyType: 'office',
            status: 'draft',
            visitedAt: '2026-04-19T10:00:00.000Z',
            priceLabel: 'KRW 900M',
            agentName: 'Agent',
            isPinned: false,
            summary: 'Summary',
          },
        ],
        page: 1,
        pageSize: 2,
        totalCount: 2,
        totalPages: 1,
      } satisfies VisitLogListResponse,
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

    expect(
      queryClient.getQueryData<VisitLogListResponse>([
        'visit-logs',
        {
          page: 1,
          pageSize: 2,
          pinnedOnly: false,
          query: '',
          sort: 'latest',
        },
      ]),
    ).toEqual({
      items: [
        expect.objectContaining({
          id: 'visit-log-4',
          title: 'Jamsil draft',
        }),
        expect.objectContaining({
          id: 'visit-log-1',
        }),
      ],
      page: 1,
      pageSize: 2,
      totalCount: 3,
      totalPages: 2,
    });
  });
});
