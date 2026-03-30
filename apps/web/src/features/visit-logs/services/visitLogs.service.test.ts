import { describe, expect, it, vi } from 'vitest';
import { getVisitLogs } from '../api/getVisitLogs';
import type { VisitLog } from '../types/visitLog';
import { listVisitLogs, sortVisitLogs } from './visitLogs.service';

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
  it('sorts visit logs by latest visit by default', () => {
    const result = sortVisitLogs(visitLogs, 'latest');

    expect(result.map((log) => log.id)).toEqual([
      'visit-log-3',
      'visit-log-1',
      'visit-log-2',
    ]);
  });

  it('sorts visit logs by oldest visit', () => {
    const result = sortVisitLogs(visitLogs, 'oldest');

    expect(result.map((log) => log.id)).toEqual([
      'visit-log-2',
      'visit-log-1',
      'visit-log-3',
    ]);
  });

  it('sorts visit logs by district', () => {
    const result = sortVisitLogs(visitLogs, 'district');

    expect(result.map((log) => log.id)).toEqual([
      'visit-log-1',
      'visit-log-2',
      'visit-log-3',
    ]);
  });

  it('loads visit logs through the api layer and sorts them', async () => {
    vi.mocked(getVisitLogs).mockResolvedValue(visitLogs);

    await expect(listVisitLogs('oldest')).resolves.toMatchObject([
      { id: 'visit-log-2' },
      { id: 'visit-log-1' },
      { id: 'visit-log-3' },
    ]);
  });
});
