import { afterEach, describe, expect, it, vi } from 'vitest';
import { updateVisitLog } from './updateVisitLog';

describe('updateVisitLog', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('updates a visit log when the request succeeds', async () => {
    const updatedVisitLog = { id: 'visit-log-1' };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => updatedVisitLog,
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      updateVisitLog({
        id: 'visit-log-1',
        title: 'Updated title',
        district: '송파구',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.40B',
        summary: 'Updated summary.',
      }),
    ).resolves.toEqual(updatedVisitLog);

    expect(fetchMock).toHaveBeenCalledWith('/api/visit-logs/visit-log-1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'visit-log-1',
        title: 'Updated title',
        district: '송파구',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.40B',
        summary: 'Updated summary.',
      }),
    });
  });

  it('throws when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(
      updateVisitLog({
        id: 'visit-log-1',
        title: 'Updated title',
        district: '송파구',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.40B',
        summary: 'Updated summary.',
      }),
    ).rejects.toThrow('Failed to update the visit log.');
  });
});
