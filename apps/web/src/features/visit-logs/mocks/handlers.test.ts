import { afterEach, describe, expect, it } from 'vitest';
import { listVisitLogsMock, resetVisitLogsMock } from './visitLogs.data';

describe('visitLogsHandlers', () => {
  afterEach(() => {
    resetVisitLogsMock();
  });

  it('falls back to latest sorting when the sort param is missing or invalid', async () => {
    const latestResponse = await fetch('/api/visit-logs');
    const latestVisitLogs = await latestResponse.json();

    expect(latestResponse.status).toBe(200);
    expect(
      latestVisitLogs.items.map((visitLog: { id: string }) => visitLog.id),
    ).toEqual(['visit-log-2', 'visit-log-1']);
    expect(latestVisitLogs.totalPages).toBe(2);

    const invalidSortResponse = await fetch('/api/visit-logs?sort=unknown');
    const invalidSortVisitLogs = await invalidSortResponse.json();

    expect(invalidSortResponse.status).toBe(200);
    expect(
      invalidSortVisitLogs.items.map((visitLog: { id: string }) => visitLog.id),
    ).toEqual(['visit-log-2', 'visit-log-1']);
  });

  it('filters and sorts visit logs from query params', async () => {
    const response = await fetch(
      '/api/visit-logs?query=%EA%B0%95%EB%82%A8&sort=district&pinned=true',
    );

    const visitLogs = await response.json();

    expect(response.status).toBe(200);
    expect(visitLogs.items).toHaveLength(1);
    expect(visitLogs.items[0]?.id).toBe('visit-log-1');
  });

  it('sorts visit logs by oldest visit date', async () => {
    const response = await fetch('/api/visit-logs?sort=oldest');
    const visitLogs = await response.json();

    expect(response.status).toBe(200);
    expect(
      visitLogs.items.map((visitLog: { id: string }) => visitLog.id),
    ).toEqual(['visit-log-3', 'visit-log-1']);
  });

  it('returns the requested page of filtered visit logs', async () => {
    const response = await fetch('/api/visit-logs?page=2');
    const visitLogs = await response.json();

    expect(response.status).toBe(200);
    expect(visitLogs.page).toBe(2);
    expect(
      visitLogs.items.map((visitLog: { id: string }) => visitLog.id),
    ).toEqual(['visit-log-3']);
  });

  it('falls back to page 1 for invalid page params', async () => {
    const response = await fetch('/api/visit-logs?page=invalid');
    const visitLogs = await response.json();

    expect(response.status).toBe(200);
    expect(visitLogs.page).toBe(1);
  });

  it('returns 404 when requesting a missing visit log detail', async () => {
    const response = await fetch('/api/visit-logs/missing-log');

    expect(response.status).toBe(404);
  });

  it('returns a visit log detail for an existing entry', async () => {
    const response = await fetch('/api/visit-logs/visit-log-1');
    const visitLog = await response.json();

    expect(response.status).toBe(200);
    expect(visitLog.id).toBe('visit-log-1');
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
