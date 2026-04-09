import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { VisitLogsPage } from './VisitLogsPage';

const setPage = vi.fn();

vi.mock('../features/visit-logs/hooks/useVisitLogFilters', () => ({
  useVisitLogFilters: () => ({
    filters: {
      page: 99,
      pinnedOnly: false,
      query: '',
      sort: 'latest',
    },
    setPage,
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
    isLoading: false,
  }),
}));

vi.mock('../features/visit-logs/components/VisitLogsScreen', () => ({
  VisitLogsScreen: () => null,
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
});
