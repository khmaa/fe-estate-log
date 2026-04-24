import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import type {
  UpdateVisitLogInput,
  VisitLog,
  VisitLogFilters,
  VisitLogListResponse,
} from '../types/visitLog';
import {
  applyCreatedVisitLogToList,
  applyDeletedVisitLogToList,
  applyOptimisticVisitLogUpdateToList,
  applyUpdatedVisitLogToList,
  getVisitLogsCacheSnapshots,
  getVisitLogsQueryKey,
  matchesVisitLogFilters,
  restoreVisitLogsCacheSnapshots,
  syncVisitLogsListCaches,
} from './visitLogQueryCache';

const baseFilters: VisitLogFilters = {
  page: 1,
  pageSize: 2,
  pinnedOnly: false,
  query: '',
  sort: 'latest',
};

const visitLogA: VisitLog = {
  id: 'visit-log-1',
  title: 'Gangnam apartment revisit',
  district: '강남구',
  propertyType: 'apartment',
  status: 'completed',
  visitedAt: '2026-04-20T10:00:00.000Z',
  priceLabel: 'KRW 1.20B',
  agentName: '박민지',
  isPinned: true,
  summary: 'Original summary',
};

const visitLogB: VisitLog = {
  id: 'visit-log-2',
  title: 'Seongsu office floor',
  district: '성동구',
  propertyType: 'office',
  status: 'draft',
  visitedAt: '2026-04-19T10:00:00.000Z',
  priceLabel: 'KRW 900M',
  agentName: '이재호',
  isPinned: false,
  summary: 'Second summary',
};

const baseResponse: VisitLogListResponse = {
  items: [visitLogA, visitLogB],
  page: 1,
  pageSize: 2,
  totalCount: 2,
  totalPages: 1,
};

describe('visitLogQueryCache', () => {
  it('matches visit logs against pinned and query filters', () => {
    expect(matchesVisitLogFilters(visitLogA, baseFilters)).toBe(true);
    expect(
      matchesVisitLogFilters(visitLogB, {
        ...baseFilters,
        pinnedOnly: true,
      }),
    ).toBe(false);
    expect(
      matchesVisitLogFilters(visitLogB, {
        ...baseFilters,
        query: 'seongsu',
      }),
    ).toBe(true);
  });

  it('prepends a created visit log for the first latest page when it matches filters', () => {
    const createdVisitLog: VisitLog = {
      ...visitLogB,
      id: 'visit-log-3',
      title: 'Newest visit log',
      visitedAt: '2026-04-21T10:00:00.000Z',
    };

    expect(
      applyCreatedVisitLogToList(baseResponse, baseFilters, createdVisitLog),
    ).toEqual({
      items: [createdVisitLog, visitLogA],
      page: 1,
      pageSize: 2,
      totalCount: 3,
      totalPages: 2,
    });
  });

  it('keeps create cache updates count-only when the current page is not the first latest page', () => {
    const createdVisitLog: VisitLog = {
      ...visitLogB,
      id: 'visit-log-3',
      title: 'Newest visit log',
      visitedAt: '2026-04-21T10:00:00.000Z',
    };

    expect(
      applyCreatedVisitLogToList(
        {
          ...baseResponse,
          page: 2,
        },
        {
          ...baseFilters,
          page: 2,
        },
        createdVisitLog,
      ),
    ).toEqual({
      ...baseResponse,
      page: 2,
      totalCount: 3,
      totalPages: 2,
    });
  });

  it('keeps the current list unchanged when a created visit log does not match filters', () => {
    const createdVisitLog: VisitLog = {
      ...visitLogB,
      id: 'visit-log-3',
      title: 'Newest visit log',
      isPinned: false,
      visitedAt: '2026-04-21T10:00:00.000Z',
    };

    expect(
      applyCreatedVisitLogToList(
        baseResponse,
        {
          ...baseFilters,
          pinnedOnly: true,
        },
        createdVisitLog,
      ),
    ).toEqual(baseResponse);
  });

  it('removes an optimistically updated visit log when it no longer matches the current filters', () => {
    const input: UpdateVisitLogInput = {
      id: 'visit-log-1',
      title: 'Mapo apartment revisit',
      district: '마포구',
      propertyType: 'apartment',
      priceLabel: 'KRW 1.10B',
      summary: 'Updated summary',
    };

    expect(
      applyOptimisticVisitLogUpdateToList(
        baseResponse,
        {
          ...baseFilters,
          query: 'gangnam',
        },
        input,
      ),
    ).toEqual({
      items: [visitLogB],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    });
  });

  it('keeps the current list unchanged when an optimistic update target is missing', () => {
    expect(
      applyOptimisticVisitLogUpdateToList(baseResponse, baseFilters, {
        id: 'missing-log',
        title: 'Updated title',
        district: '송파구',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.40B',
        summary: 'Updated summary.',
      }),
    ).toEqual(baseResponse);
  });

  it('replaces and sorts a fully updated visit log in the cached list', () => {
    const updatedVisitLog: VisitLog = {
      ...visitLogA,
      district: '가산구',
      title: 'Updated title',
    };

    expect(
      applyUpdatedVisitLogToList(
        baseResponse,
        {
          ...baseFilters,
          sort: 'district',
        },
        updatedVisitLog,
      ),
    ).toEqual({
      ...baseResponse,
      items: [updatedVisitLog, visitLogB],
    });
  });

  it('removes an updated visit log when it no longer matches the current filters', () => {
    const updatedVisitLog: VisitLog = {
      ...visitLogA,
      title: 'Mapo apartment revisit',
      district: '마포구',
    };

    expect(
      applyUpdatedVisitLogToList(
        baseResponse,
        {
          ...baseFilters,
          query: 'gangnam',
        },
        updatedVisitLog,
      ),
    ).toEqual({
      items: [visitLogB],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    });
  });

  it('keeps the current list unchanged when a fully updated visit log is not cached on the page', () => {
    expect(
      applyUpdatedVisitLogToList(baseResponse, baseFilters, {
        ...visitLogA,
        id: 'missing-log',
      }),
    ).toEqual(baseResponse);
  });

  it('removes a deleted visit log and normalizes pagination meta', () => {
    expect(applyDeletedVisitLogToList(baseResponse, 'visit-log-1')).toEqual({
      items: [visitLogB],
      page: 1,
      pageSize: 2,
      totalCount: 1,
      totalPages: 1,
    });
  });

  it('normalizes pagination meta when the current page exceeds the next total pages', () => {
    expect(
      applyDeletedVisitLogToList(
        {
          ...baseResponse,
          page: 2,
          totalCount: 3,
          totalPages: 2,
        },
        'visit-log-1',
      ),
    ).toEqual({
      items: [visitLogB],
      page: 1,
      pageSize: 2,
      totalCount: 2,
      totalPages: 1,
    });
  });

  it('snapshots, restores, and skips invalid visit log cache entries', () => {
    const queryClient = new QueryClient();
    const validQueryKey = getVisitLogsQueryKey(baseFilters);

    queryClient.setQueryData(validQueryKey, baseResponse);
    queryClient.setQueryData(['visit-logs', 'invalid'], baseResponse);

    const snapshots = getVisitLogsCacheSnapshots(queryClient);

    syncVisitLogsListCaches(queryClient, (current) => ({
      ...current,
      totalCount: current.totalCount + 1,
    }));

    expect(
      queryClient.getQueryData<VisitLogListResponse>(validQueryKey),
    ).toEqual({
      ...baseResponse,
      totalCount: 3,
    });
    expect(queryClient.getQueryData(['visit-logs', 'invalid'])).toEqual(
      baseResponse,
    );

    restoreVisitLogsCacheSnapshots(queryClient, snapshots);

    expect(queryClient.getQueryData(validQueryKey)).toEqual(baseResponse);
  });
});
