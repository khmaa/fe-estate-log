import { describe, expect, it, vi } from 'vitest';
import { updateVisitLog } from '../api/updateVisitLog';
import { updateVisitLogEntry } from './updateVisitLog.service';

vi.mock('../api/updateVisitLog', () => ({
  updateVisitLog: vi.fn(),
}));

describe('updateVisitLog.service', () => {
  it('updates a visit log through the api layer', async () => {
    vi.mocked(updateVisitLog).mockResolvedValue({
      id: 'visit-log-1',
    } as Awaited<ReturnType<typeof updateVisitLog>>);

    await expect(
      updateVisitLogEntry({
        id: 'visit-log-1',
        title: 'Updated title',
        district: '송파구',
        propertyType: 'apartment',
        priceLabel: 'KRW 1.40B',
        summary: 'Updated summary.',
      }),
    ).resolves.toMatchObject({ id: 'visit-log-1' });

    expect(updateVisitLog).toHaveBeenCalledWith({
      id: 'visit-log-1',
      title: 'Updated title',
      district: '송파구',
      propertyType: 'apartment',
      priceLabel: 'KRW 1.40B',
      summary: 'Updated summary.',
    });
  });
});
