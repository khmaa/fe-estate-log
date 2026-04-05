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
      pinnedOnly: true,
      query: 'gangnam',
      sort: 'district',
    });
  });

  it('falls back to the default sort for invalid query strings', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper('/?sort=invalid'),
    });

    expect(result.current.filters.sort).toBe('latest');
  });

  it('updates and clears query string filters through the setter helpers', () => {
    const { result } = renderHook(() => useVisitLogFilters(), {
      wrapper: createWrapper('/?query=gangnam&sort=district&pinned=true'),
    });

    act(() => {
      result.current.setPinnedOnly(false);
    });

    expect(result.current.filters.pinnedOnly).toBe(false);

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
      pinnedOnly: false,
      query: '',
      sort: 'latest',
    });
  });
});
