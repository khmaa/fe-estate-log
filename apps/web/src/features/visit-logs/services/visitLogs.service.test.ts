import { describe, expect, it, vi } from 'vitest';
import { getVisitLogs } from '../api/getVisitLogs';
import type { VisitLogFilters, VisitLogListResponse } from '../types/visitLog';
import { listVisitLogs } from './visitLogs.service';

vi.mock('../api/getVisitLogs', () => ({
  getVisitLogs: vi.fn(),
}));

const visitLogs: VisitLogListResponse = {
  items: [
    {
      id: 'visit-log-1',
      title: 'Alpha',
      district: 'Gangnam-gu',
      propertyType: 'apartment',
      status: 'completed',
      visitedAt: '2026-03-27T10:30:00.000Z',
      priceLabel: 'KRW 1.28B',
      agentName: 'Minji Park',
      isPinned: true,
      summary: 'Summary',
    },
  ],
  page: 1,
  pageSize: 2,
  totalCount: 1,
  totalPages: 1,
};

describe('visitLogs.service', () => {
  it('loads visit logs through the api layer with the current filters', async () => {
    const filters: VisitLogFilters = {
      page: 1,
      pageSize: 10,
      pinnedOnly: true,
      query: 'gangnam',
      sort: 'oldest',
    };

    vi.mocked(getVisitLogs).mockResolvedValue(visitLogs);

    await expect(listVisitLogs(filters)).resolves.toEqual(visitLogs);
    expect(getVisitLogs).toHaveBeenCalledWith(filters);
  });
});
