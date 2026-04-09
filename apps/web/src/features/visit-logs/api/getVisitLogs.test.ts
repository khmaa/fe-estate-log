import { afterEach, describe, expect, it, vi } from 'vitest';
import { getVisitLogs } from './getVisitLogs';

describe('getVisitLogs', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns visit logs when the request succeeds', async () => {
    const visitLogs = {
      items: [{ id: 'visit-log-1' }],
      page: 2,
      pageSize: 2,
      totalCount: 3,
      totalPages: 2,
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => visitLogs,
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      getVisitLogs({
        page: 2,
        pinnedOnly: true,
        query: 'gangnam',
        sort: 'district',
      }),
    ).resolves.toEqual(visitLogs);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/visit-logs?query=gangnam&sort=district&pinned=true&page=2',
    );
  });

  it('throws when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(
      getVisitLogs({
        page: 1,
        pinnedOnly: false,
        query: '',
        sort: 'latest',
      }),
    ).rejects.toThrow('Failed to load visit logs.');
  });
});
