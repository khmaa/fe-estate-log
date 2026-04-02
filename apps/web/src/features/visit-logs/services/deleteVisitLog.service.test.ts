import { describe, expect, it, vi } from 'vitest';
import { deleteVisitLog } from '../api/deleteVisitLog';
import { deleteVisitLogEntry } from './deleteVisitLog.service';

vi.mock('../api/deleteVisitLog', () => ({
  deleteVisitLog: vi.fn(),
}));

describe('deleteVisitLog.service', () => {
  it('deletes a visit log through the api layer', async () => {
    vi.mocked(deleteVisitLog).mockResolvedValue(undefined);

    await expect(deleteVisitLogEntry('visit-log-1')).resolves.toBeUndefined();

    expect(deleteVisitLog).toHaveBeenCalledWith('visit-log-1');
  });
});
