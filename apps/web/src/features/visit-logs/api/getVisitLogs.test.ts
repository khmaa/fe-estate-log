import { afterEach, describe, expect, it, vi } from 'vitest';
import { getVisitLogs } from './getVisitLogs';

describe('getVisitLogs', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns visit logs when the request succeeds', async () => {
    const visitLogs = [{ id: 'visit-log-1' }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => visitLogs,
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      getVisitLogs({
        pinnedOnly: true,
        query: 'gangnam',
        sort: 'district',
      }),
    ).resolves.toEqual(visitLogs);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/visit-logs?query=gangnam&sort=district&pinned=true',
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
        pinnedOnly: false,
        query: '',
        sort: 'latest',
      }),
    ).rejects.toThrow('Failed to load visit logs.');
  });
});
