import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { listVisitLogs } from '../services/visitLogs.service';
import type { VisitLog } from '../types/visitLog';
import { useVisitLogs } from './useVisitLogs';

vi.mock('../services/visitLogs.service', () => ({
  listVisitLogs: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useVisitLogs', () => {
  it('queries visit logs with filter-aware query keys', async () => {
    const visitLogs: VisitLog[] = [
      {
        id: 'visit-log-1',
        title: 'Alpha',
        district: 'Gangnam-gu',
        propertyType: 'apartment',
        status: 'completed',
        visitedAt: '2026-03-27T10:30:00.000Z',
        priceLabel: 'KRW 1.28B',
        agentName: 'Minji Park',
        isPinned: true,
        summary: 'Summary',
      },
    ];
    const filters = {
      pinnedOnly: true,
      query: 'gangnam',
      sort: 'district' as const,
    };

    vi.mocked(listVisitLogs).mockResolvedValue(visitLogs);

    const { result } = renderHook(() => useVisitLogs(filters), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(listVisitLogs).toHaveBeenCalledWith(filters);
    expect(result.current.data).toEqual(visitLogs);
  });
});
