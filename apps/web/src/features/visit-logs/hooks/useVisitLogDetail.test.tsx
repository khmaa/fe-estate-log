import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogDetailError } from '../api/getVisitLogDetail';
import type { VisitLog } from '../types/visitLog';
import {
  getVisitLogDetailQueryKey,
  prefetchVisitLogDetail,
  useVisitLogDetail,
} from './useVisitLogDetail';

vi.mock('../services/visitLogDetail.service', () => ({
  loadVisitLogDetail: vi.fn(),
}));

import { loadVisitLogDetail } from '../services/visitLogDetail.service';

const visitLogs: VisitLog[] = [
  {
    id: 'visit-log-1',
    title: '삼성동 한강뷰 아파트 재방문',
    district: '강남구',
    propertyType: 'apartment',
    status: 'completed',
    visitedAt: '2026-03-27T10:30:00.000Z',
    priceLabel: 'KRW 1.28B',
    agentName: '박민지',
    isPinned: true,
    summary: '요약입니다.',
  },
];

const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useVisitLogDetail', () => {
  it('loads the matching visit log through the detail query', async () => {
    const queryClient = new QueryClient();
    vi.mocked(loadVisitLogDetail).mockResolvedValue(visitLogs[0] as VisitLog);

    const { result } = renderHook(() => useVisitLogDetail('visit-log-1'), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.log?.id).toBe('visit-log-1');
    expect(result.current.errorType).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('returns a not-found state when the detail query returns 404', async () => {
    const queryClient = new QueryClient();
    vi.mocked(loadVisitLogDetail).mockRejectedValue(
      new VisitLogDetailError('Failed to load the visit log detail.', 404),
    );

    const { result, rerender } = renderHook(
      ({ visitLogId }) => useVisitLogDetail(visitLogId),
      {
        initialProps: { visitLogId: undefined as string | undefined },
        wrapper: createWrapper(queryClient),
      },
    );

    expect(result.current.log).toBeNull();

    rerender({ visitLogId: 'missing-log' });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.log).toBeNull();
    expect(result.current.errorType).toBe('not-found');
    expect(result.current.isError).toBe(true);
  });

  it('returns an unknown error state for non-404 failures', async () => {
    const queryClient = new QueryClient();
    vi.mocked(loadVisitLogDetail).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useVisitLogDetail('visit-log-1'), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.log).toBeNull();
    expect(result.current.errorType).toBe('unknown');
    expect(result.current.isError).toBe(true);
  });

  it('prefetches the visit log detail into the query cache', async () => {
    const queryClient = new QueryClient();
    vi.mocked(loadVisitLogDetail).mockResolvedValue(visitLogs[0] as VisitLog);

    await prefetchVisitLogDetail(queryClient, 'visit-log-1');

    expect(
      queryClient.getQueryData(getVisitLogDetailQueryKey('visit-log-1')),
    ).toEqual(visitLogs[0]);
  });
});
