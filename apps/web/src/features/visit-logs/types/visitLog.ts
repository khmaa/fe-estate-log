type VisitLogStatus = 'draft' | 'scheduled' | 'completed';

type VisitLog = {
  agentName: string;
  district: string;
  id: string;
  isPinned: boolean;
  priceLabel: string;
  propertyType: 'apartment' | 'office' | 'retail';
  status: VisitLogStatus;
  summary: string;
  title: string;
  visitedAt: string;
};

type VisitLogSort = 'latest' | 'oldest' | 'district';

export type { VisitLog, VisitLogSort, VisitLogStatus };
