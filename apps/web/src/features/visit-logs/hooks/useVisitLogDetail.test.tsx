import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it } from 'vitest';
import type { VisitLog } from '../types/visitLog';
import { useVisitLogDetail } from './useVisitLogDetail';

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
  it('returns the matching visit log from the query cache', () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(
      ['visit-logs', { pinnedOnly: false, query: '', sort: 'latest' }],
      visitLogs,
    );

    const { result } = renderHook(() => useVisitLogDetail('visit-log-1'), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.log?.id).toBe('visit-log-1');
    expect(result.current.isLoading).toBe(false);
  });

  it('returns null when the visit log id is missing or not found', () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(
      ['visit-logs', { pinnedOnly: false, query: '', sort: 'latest' }],
      visitLogs,
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

    expect(result.current.log).toBeNull();
  });
});
