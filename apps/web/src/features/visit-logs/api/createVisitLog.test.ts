import { afterEach, describe, expect, it, vi } from 'vitest';
import { createVisitLog } from './createVisitLog';

describe('createVisitLog', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('creates a visit log when the request succeeds', async () => {
    const createdVisitLog = { id: 'visit-log-4' };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => createdVisitLog,
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      createVisitLog({
        title: 'Jamsil draft',
        district: 'Songpa-gu',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.35B',
        summary: 'Need a second pass.',
      }),
    ).resolves.toEqual(createdVisitLog);

    expect(fetchMock).toHaveBeenCalledWith('/api/visit-logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Jamsil draft',
        district: 'Songpa-gu',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.35B',
        summary: 'Need a second pass.',
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
      createVisitLog({
        title: 'Jamsil draft',
        district: 'Songpa-gu',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.35B',
        summary: 'Need a second pass.',
      }),
    ).rejects.toThrow('Failed to create a visit log.');
  });
});
