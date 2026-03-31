import { describe, expect, it, vi } from 'vitest';
import { createVisitLog } from '../api/createVisitLog';
import { createVisitLogEntry } from './createVisitLog.service';

vi.mock('../api/createVisitLog', () => ({
  createVisitLog: vi.fn(),
}));

describe('createVisitLog.service', () => {
  it('creates a visit log through the api layer', async () => {
    vi.mocked(createVisitLog).mockResolvedValue({
      id: 'visit-log-4',
    } as Awaited<ReturnType<typeof createVisitLog>>);

    await expect(
      createVisitLogEntry({
        title: 'Jamsil draft',
        district: 'Songpa-gu',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.35B',
        summary: 'Need a second pass.',
      }),
    ).resolves.toMatchObject({ id: 'visit-log-4' });

    expect(createVisitLog).toHaveBeenCalledWith({
      title: 'Jamsil draft',
      district: 'Songpa-gu',
      propertyType: 'apartment',
      priceLabel: 'KRW 1.35B',
      summary: 'Need a second pass.',
    });
  });
});
