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

type CreateVisitLogInput = {
  district: string;
  priceLabel: string;
  propertyType: VisitLog['propertyType'];
  summary: string;
  title: string;
};

export type { CreateVisitLogInput, VisitLog, VisitLogSort, VisitLogStatus };
