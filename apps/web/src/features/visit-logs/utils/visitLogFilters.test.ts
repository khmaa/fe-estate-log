import { describe, expect, it } from 'vitest';
import {
  defaultVisitLogFilters,
  getVisitLogPageSize,
  getVisitLogSort,
  hasActiveVisitLogFilters,
  isDefaultVisitLogPage,
  isDefaultVisitLogPageSize,
  isDefaultVisitLogSort,
} from './visitLogFilters';

describe('visitLogFilters utils', () => {
  it('exposes the default visit log filter state', () => {
    expect(defaultVisitLogFilters).toEqual({
      page: 1,
      pageSize: 2,
      pinnedOnly: false,
      query: '',
      sort: 'latest',
    });
  });

  it('parses valid sort and page size values and falls back on invalid input', () => {
    expect(getVisitLogSort('district')).toBe('district');
    expect(getVisitLogSort('invalid')).toBe('latest');
    expect(getVisitLogSort(null)).toBe('latest');

    expect(getVisitLogPageSize('5')).toBe(5);
    expect(getVisitLogPageSize('999')).toBe(2);
    expect(getVisitLogPageSize(null)).toBe(2);
  });

  it('detects default values for page, page size, and sort', () => {
    expect(isDefaultVisitLogPage(1)).toBe(true);
    expect(isDefaultVisitLogPage(0)).toBe(true);
    expect(isDefaultVisitLogPage(2)).toBe(false);

    expect(isDefaultVisitLogPageSize(2)).toBe(true);
    expect(isDefaultVisitLogPageSize(5)).toBe(false);

    expect(isDefaultVisitLogSort('latest')).toBe(true);
    expect(isDefaultVisitLogSort('oldest')).toBe(false);
  });

  it('detects whether any non-default filter is active', () => {
    expect(hasActiveVisitLogFilters(defaultVisitLogFilters)).toBe(false);
    expect(
      hasActiveVisitLogFilters({
        ...defaultVisitLogFilters,
        query: 'gangnam',
      }),
    ).toBe(true);
  });
});
