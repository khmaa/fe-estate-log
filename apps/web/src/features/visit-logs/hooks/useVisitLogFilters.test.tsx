import { act, renderHook } from '@testing-library/react';
import type React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { useVisitLogFilters } from './useVisitLogFilters';

const createWrapper =
  (initialEntry: string) =>
  ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </MemoryRouter>
  );

describe('useVisitLogFilters', () => {
  it('reads the initial filter state from the search params', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper('/?query=gangnam&sort=district&pinned=true'),
    });

    expect(result.current.filters).toEqual({
      page: 1,
      pageSize: 2,
      pinnedOnly: true,
      query: 'gangnam',
      sort: 'district',
    });
  });

  it('falls back to the default sort for invalid query strings', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper('/?sort=invalid&pageSize=999'),
    });

    expect(result.current.filters.sort).toBe('latest');
    expect(result.current.filters.page).toBe(1);
    expect(result.current.filters.pageSize).toBe(2);
  });

  it('updates and clears query string filters through the setter helpers', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper(
        '/?query=gangnam&sort=district&pinned=true&page=3',
      ),
    });

    act(() => {
      result.current.setPinnedOnly(false);
    });

    expect(result.current.filters.pinnedOnly).toBe(false);
    expect(result.current.filters.page).toBe(1);

    act(() => {
      result.current.setQuery('  mapo  ');
    });

    expect(result.current.filters.query).toBe('mapo');

    act(() => {
      result.current.setSort('oldest');
    });

    expect(result.current.filters.sort).toBe('oldest');

    act(() => {
      result.current.setQuery('   ');
    });

    expect(result.current.filters.query).toBe('');

    act(() => {
      result.current.setSort('latest');
    });

    expect(result.current.filters).toEqual({
      page: 1,
      pageSize: 2,
      pinnedOnly: false,
      query: '',
      sort: 'latest',
    });
  });

  it('updates and clears the page through the setter helper', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper('/?page=2'),
    });

    expect(result.current.filters.page).toBe(2);

    act(() => {
      result.current.setPage(4);
    });

    expect(result.current.filters.page).toBe(4);

    act(() => {
      result.current.setPage(1);
    });

    expect(result.current.filters.page).toBe(1);
  });

  it('updates page size and resets the page back to 1', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper('/?page=3&pageSize=5'),
    });

    expect(result.current.filters.pageSize).toBe(5);

    act(() => {
      result.current.setPageSize(10);
    });

    expect(result.current.filters.pageSize).toBe(10);
    expect(result.current.filters.page).toBe(1);

    act(() => {
      result.current.setPageSize(2);
    });

    expect(result.current.filters.pageSize).toBe(2);
    expect(result.current.filters.page).toBe(1);
  });

  it('reports active filters and clears the query string back to defaults', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper(
        '/?query=gangnam&sort=district&pinned=true&page=2&pageSize=5',
      ),
    });

    expect(result.current.hasActiveFilters).toBe(true);

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.hasActiveFilters).toBe(false);
    expect(result.current.filters).toEqual({
      page: 1,
      pageSize: 2,
      pinnedOnly: false,
      query: '',
      sort: 'latest',
    });
  });
});
