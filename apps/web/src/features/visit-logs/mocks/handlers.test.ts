import { afterEach, describe, expect, it } from 'vitest';
import { listVisitLogsMock, resetVisitLogsMock } from './visitLogs.data';

describe('visitLogsHandlers', () => {
  afterEach(() => {
    resetVisitLogsMock();
  });

  it('filters and sorts visit logs from query params', async () => {
    const response = await fetch(
      '/api/visit-logs?query=%EA%B0%95%EB%82%A8&sort=district&pinned=true',
    );

    const visitLogs = await response.json();

    expect(response.status).toBe(200);
    expect(visitLogs).toHaveLength(1);
    expect(visitLogs[0]?.id).toBe('visit-log-1');
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
