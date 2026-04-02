import { afterEach, describe, expect, it } from 'vitest';
import { listVisitLogsMock, resetVisitLogsMock } from './visitLogs.data';

describe('visitLogsHandlers', () => {
  afterEach(() => {
    resetVisitLogsMock();
  });

  it('returns 404 when trying to delete a missing visit log', async () => {
    const response = await fetch('/api/visit-logs/missing-log', {
      method: 'DELETE',
    });

    expect(response.status).toBe(404);
  });

  it('returns 204 and removes the visit log when deleting an existing entry', async () => {
    const response = await fetch('/api/visit-logs/visit-log-1', {
      method: 'DELETE',
    });

    expect(response.status).toBe(204);
    expect(listVisitLogsMock().map((visitLog) => visitLog.id)).not.toContain(
      'visit-log-1',
    );
  });
});
