import { describe, expect, it, vi } from 'vitest';
import { getVisitLogs } from '../api/getVisitLogs';
import type { VisitLog, VisitLogFilters } from '../types/visitLog';
import { listVisitLogs } from './visitLogs.service';

vi.mock('../api/getVisitLogs', () => ({
  getVisitLogs: vi.fn(),
}));

const visitLogs: VisitLog[] = [
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
  {
    id: 'visit-log-2',
    title: 'Beta',
    district: 'Mapo-gu',
    propertyType: 'retail',
    status: 'draft',
    visitedAt: '2026-03-21T04:15:00.000Z',
    priceLabel: 'KRW 730M',
    agentName: 'Sora Kim',
    isPinned: false,
    summary: 'Summary',
  },
  {
    id: 'visit-log-3',
    title: 'Gamma',
    district: 'Seongdong-gu',
    propertyType: 'office',
    status: 'scheduled',
    visitedAt: '2026-04-02T06:00:00.000Z',
    priceLabel: 'KRW 980M',
    agentName: 'Jaeho Lee',
    isPinned: false,
    summary: 'Summary',
  },
];

describe('visitLogs.service', () => {
  it('loads visit logs through the api layer with the current filters', async () => {
    const filters: VisitLogFilters = {
      pinnedOnly: true,
      query: 'gangnam',
      sort: 'oldest',
    };

    vi.mocked(getVisitLogs).mockResolvedValue(visitLogs);

    await expect(listVisitLogs(filters)).resolves.toEqual(visitLogs);
    expect(getVisitLogs).toHaveBeenCalledWith(filters);
  });
});
