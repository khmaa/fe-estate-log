import { describe, expect, it, vi } from 'vitest';
import { getVisitLogDetail } from '../api/getVisitLogDetail';
import { loadVisitLogDetail } from './visitLogDetail.service';

vi.mock('../api/getVisitLogDetail', () => ({
  getVisitLogDetail: vi.fn(),
}));

describe('visitLogDetail.service', () => {
  it('loads a visit log detail through the api layer', async () => {
    const visitLog = { id: 'visit-log-1' };

    vi.mocked(getVisitLogDetail).mockResolvedValue(visitLog as never);

    await expect(loadVisitLogDetail('visit-log-1')).resolves.toEqual(visitLog);
    expect(getVisitLogDetail).toHaveBeenCalledWith('visit-log-1');
  });
});
