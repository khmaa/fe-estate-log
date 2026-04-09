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

type VisitLogFilters = {
  page: number;
  pinnedOnly: boolean;
  query: string;
  sort: VisitLogSort;
};

type VisitLogListResponse = {
  items: VisitLog[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

type CreateVisitLogInput = {
  district: string;
  priceLabel: string;
  propertyType: VisitLog['propertyType'];
  summary: string;
  title: string;
};

type UpdateVisitLogInput = CreateVisitLogInput & {
  id: string;
};

export type {
  CreateVisitLogInput,
  UpdateVisitLogInput,
  VisitLog,
  VisitLogFilters,
  VisitLogListResponse,
  VisitLogSort,
  VisitLogStatus,
};
