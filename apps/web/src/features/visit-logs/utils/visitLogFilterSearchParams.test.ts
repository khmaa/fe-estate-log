import { describe, expect, it } from 'vitest';
import {
  buildVisitLogSearchParams,
  parseVisitLogFilters,
} from './visitLogFilterSearchParams';

describe('visitLogFilterSearchParams', () => {
  it('parses filters from search params with fallback defaults', () => {
    expect(
      parseVisitLogFilters(
        new URLSearchParams(
          'query=gangnam&sort=invalid&pinned=true&page=0&pageSize=999',
        ),
      ),
    ).toEqual({
      page: 1,
      pageSize: 2,
      pinnedOnly: true,
      query: 'gangnam',
      sort: 'latest',
    });
  });

  it('builds search params while trimming query and removing defaults', () => {
    const result = buildVisitLogSearchParams(
      new URLSearchParams(
        'query=gangnam&sort=district&pinned=true&page=3&pageSize=5',
      ),
      {
        query: '  mapo  ',
        sort: 'latest',
        pinnedOnly: false,
        pageSize: 2,
      },
    );

    expect(result.toString()).toBe('query=mapo');
  });

  it('resets the page when query, sort, pinned, or page size changes', () => {
    expect(
      buildVisitLogSearchParams(new URLSearchParams('page=3'), {
        query: 'seongsu',
      }).toString(),
    ).toBe('query=seongsu');

    expect(
      buildVisitLogSearchParams(new URLSearchParams('page=3'), {
        sort: 'district',
      }).toString(),
    ).toBe('sort=district');

    expect(
      buildVisitLogSearchParams(new URLSearchParams('page=3'), {
        pinnedOnly: true,
      }).toString(),
    ).toBe('pinned=true');

    expect(
      buildVisitLogSearchParams(new URLSearchParams('page=3'), {
        pageSize: 5,
      }).toString(),
    ).toBe('pageSize=5');
  });

  it('keeps non-default page values and clears the default page', () => {
    expect(
      buildVisitLogSearchParams(new URLSearchParams(), {
        page: 4,
      }).toString(),
    ).toBe('page=4');

    expect(
      buildVisitLogSearchParams(new URLSearchParams('page=4'), {
        page: 1,
      }).toString(),
    ).toBe('');
  });
});
