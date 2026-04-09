import { afterEach, describe, expect, it, vi } from 'vitest';
import { getVisitLogDetail } from './getVisitLogDetail';

describe('getVisitLogDetail', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the requested visit log when the request succeeds', async () => {
    const visitLog = { id: 'visit-log-1' };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => visitLog,
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(getVisitLogDetail('visit-log-1')).resolves.toEqual(visitLog);
    expect(fetchMock).toHaveBeenCalledWith('/api/visit-logs/visit-log-1');
  });

  it('throws when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(getVisitLogDetail('missing-log')).rejects.toThrow(
      'Failed to load the visit log detail.',
    );
  });
});
