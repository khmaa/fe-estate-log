import { afterEach, describe, expect, it, vi } from 'vitest';
import { deleteVisitLog } from './deleteVisitLog';

describe('deleteVisitLog', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('deletes a visit log when the request succeeds', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(deleteVisitLog('visit-log-1')).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledWith('/api/visit-logs/visit-log-1', {
      method: 'DELETE',
    });
  });

  it('throws when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(deleteVisitLog('visit-log-1')).rejects.toThrow(
      'Failed to delete the visit log.',
    );
  });
});
