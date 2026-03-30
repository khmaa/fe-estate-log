import type { VisitLog } from '../types/visitLog';

const visitLogsMock: VisitLog[] = [
  {
    id: 'visit-log-1',
    title: 'Samsung-dong river-view apartment',
    district: 'Gangnam-gu',
    propertyType: 'apartment',
    status: 'completed',
    visitedAt: '2026-03-27T10:30:00.000Z',
    priceLabel: 'KRW 1.28B',
    agentName: 'Minji Park',
    isPinned: true,
    summary:
      'Strong sunlight and subway access, but the lobby and parking flow felt dated.',
  },
  {
    id: 'visit-log-2',
    title: 'Seongsu mixed-use office floor',
    district: 'Seongdong-gu',
    propertyType: 'office',
    status: 'scheduled',
    visitedAt: '2026-04-02T06:00:00.000Z',
    priceLabel: 'KRW 980M',
    agentName: 'Jaeho Lee',
    isPinned: false,
    summary:
      'Need to validate freight elevator access and late-evening foot traffic before closing.',
  },
  {
    id: 'visit-log-3',
    title: 'Yeonnam boutique retail corner',
    district: 'Mapo-gu',
    propertyType: 'retail',
    status: 'draft',
    visitedAt: '2026-03-21T04:15:00.000Z',
    priceLabel: 'KRW 730M',
    agentName: 'Sora Kim',
    isPinned: false,
    summary:
      'Promising storefront visibility. Need a second pass with weekend traffic numbers.',
  },
];

export { visitLogsMock };
