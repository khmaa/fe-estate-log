import { afterEach, describe, expect, it, vi } from 'vitest';
import { getVisitLogDetail, VisitLogDetailError } from './getVisitLogDetail';

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

  it('throws a typed error when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    await expect(getVisitLogDetail('missing-log')).rejects.toEqual(
      expect.objectContaining<Partial<VisitLogDetailError>>({
        message: 'Failed to load the visit log detail.',
        name: 'VisitLogDetailError',
        status: 404,
      }),
    );
  });
});
