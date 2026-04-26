import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogsPage } from './VisitLogsPage';

const setPage = vi.fn();
const refetch = vi.fn();
const prefetchQuery = vi.fn();
let lastVisitLogsScreenProps: {
  hasActiveFilters: boolean;
  onPrefetchDetails: (visitLogId: string) => void;
  onResetFilters: () => void;
  onRetry: () => void;
} | null = null;
const resetFilters = vi.fn();

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>(
    '@tanstack/react-query',
  );

  return {
    ...actual,
    useQueryClient: () => ({
      prefetchQuery,
    }),
  };
});

vi.mock('../features/visit-logs/hooks/useVisitLogFilters', () => ({
  useVisitLogFilters: () => ({
    filters: {
      page: 99,
      pageSize: 2,
      pinnedOnly: false,
      query: '',
      sort: 'latest',
    },
    hasActiveFilters: true,
    resetFilters,
    setPage,
    setPageSize: vi.fn(),
    setPinnedOnly: vi.fn(),
    setQuery: vi.fn(),
    setSort: vi.fn(),
  }),
}));

vi.mock('../features/visit-logs/hooks/useVisitLogs', () => ({
  useVisitLogs: () => ({
    data: {
      items: [],
      page: 2,
      pageSize: 2,
      totalCount: 3,
      totalPages: 2,
    },
    isError: false,
    isLoading: false,
    refetch,
  }),
}));

vi.mock('../features/visit-logs/components/VisitLogsScreen', () => ({
  VisitLogsScreen: (props: {
    hasActiveFilters: boolean;
    onPrefetchDetails: (visitLogId: string) => void;
    onResetFilters: () => void;
    onRetry: () => void;
  }) => {
    lastVisitLogsScreenProps = props;
    return null;
  },
}));

describe('VisitLogsPage', () => {
  it('clamps the current page to the server-backed page response', async () => {
    render(
      <MemoryRouter initialEntries={['/visit-logs?page=99']}>
        <VisitLogsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(setPage).toHaveBeenCalledWith(2);
    });
  });

  it('passes a retry handler that triggers the visit logs refetch', async () => {
    lastVisitLogsScreenProps = null;

    render(
      <MemoryRouter initialEntries={['/visit-logs']}>
        <VisitLogsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(lastVisitLogsScreenProps).not.toBeNull();
    });

    if (!lastVisitLogsScreenProps) {
      throw new Error('VisitLogsScreen props were not captured.');
    }

    const props = lastVisitLogsScreenProps as {
      hasActiveFilters: boolean;
      onPrefetchDetails: (visitLogId: string) => void;
      onResetFilters: () => void;
      onRetry: () => void;
    };

    props.onRetry();

    expect(refetch).toHaveBeenCalled();
  });

  it('passes a detail prefetch handler that warms the detail query cache', async () => {
    lastVisitLogsScreenProps = null;
    prefetchQuery.mockClear();

    render(
      <MemoryRouter initialEntries={['/visit-logs']}>
        <VisitLogsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(lastVisitLogsScreenProps).not.toBeNull();
    });

    if (!lastVisitLogsScreenProps) {
      throw new Error('VisitLogsScreen props were not captured.');
    }

    const props = lastVisitLogsScreenProps as {
      hasActiveFilters: boolean;
      onPrefetchDetails: (visitLogId: string) => void;
      onResetFilters: () => void;
      onRetry: () => void;
    };

    props.onPrefetchDetails('visit-log-1');

    expect(prefetchQuery).toHaveBeenCalled();
  });

  it('passes a reset handler and active filter state through to the screen', async () => {
    lastVisitLogsScreenProps = null;
    resetFilters.mockClear();

    render(
      <MemoryRouter initialEntries={['/visit-logs']}>
        <VisitLogsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(lastVisitLogsScreenProps).not.toBeNull();
    });

    if (!lastVisitLogsScreenProps) {
      throw new Error('VisitLogsScreen props were not captured.');
    }

    const props = lastVisitLogsScreenProps as {
      hasActiveFilters: boolean;
      onPrefetchDetails: (visitLogId: string) => void;
      onResetFilters: () => void;
      onRetry: () => void;
    };

    expect(props.hasActiveFilters).toBe(true);

    props.onResetFilters();

    expect(resetFilters).toHaveBeenCalled();
  });
});
