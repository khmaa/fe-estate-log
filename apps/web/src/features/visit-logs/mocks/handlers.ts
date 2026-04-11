import { HttpResponse, http } from 'msw';
import type {
  CreateVisitLogInput,
  UpdateVisitLogInput,
  VisitLog,
  VisitLogFilters,
  VisitLogListResponse,
} from '../types/visitLog';
import {
  appendVisitLogMock,
  listVisitLogsMock,
  removeVisitLogMock,
  updateVisitLogMock,
} from './visitLogs.data';

const getVisitLogFilters = (requestUrl: string): VisitLogFilters => {
  const url = new URL(requestUrl);
  const rawPage = Number(url.searchParams.get('page') ?? '1');
  const rawPageSize = Number(url.searchParams.get('pageSize') ?? '2');

  return {
    page: Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1,
    pageSize: rawPageSize === 5 || rawPageSize === 10 ? rawPageSize : 2,
    pinnedOnly: url.searchParams.get('pinned') === 'true',
    query: url.searchParams.get('query') ?? '',
    sort:
      url.searchParams.get('sort') === 'oldest' ||
      url.searchParams.get('sort') === 'district'
        ? (url.searchParams.get('sort') as VisitLogFilters['sort'])
        : 'latest',
  };
};

const applyVisitLogFilters = (logs: VisitLog[], filters: VisitLogFilters) => {
  const normalizedQuery = filters.query.trim().toLowerCase();
  const filteredLogs = logs.filter((log) => {
    if (filters.pinnedOnly && !log.isPinned) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return [log.title, log.district, log.agentName].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    );
  });

  const nextLogs = [...filteredLogs];

  switch (filters.sort) {
    case 'oldest':
      return nextLogs.sort(
        (left, right) =>
          new Date(left.visitedAt).getTime() -
          new Date(right.visitedAt).getTime(),
      );
    case 'district':
      return nextLogs.sort((left, right) =>
        left.district.localeCompare(right.district),
      );
    case 'latest':
    default:
      return nextLogs.sort(
        (left, right) =>
          new Date(right.visitedAt).getTime() -
          new Date(left.visitedAt).getTime(),
      );
  }
};

const paginateVisitLogs = (
  logs: VisitLog[],
  page: number,
  pageSize: number,
): VisitLogListResponse => {
  const totalCount = logs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    items: logs.slice(startIndex, startIndex + pageSize),
    page: currentPage,
    pageSize,
    totalCount,
    totalPages,
  };
};

const visitLogsHandlers = [
  http.get('/api/visit-logs', async ({ request }) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 120);
    });

    const filters = getVisitLogFilters(request.url);

    return HttpResponse.json(
      paginateVisitLogs(
        applyVisitLogFilters(listVisitLogsMock(), filters),
        filters.page,
        filters.pageSize,
      ),
    );
  }),
  http.get('/api/visit-logs/:visitLogId', async ({ params }) => {
    const visitLog = listVisitLogsMock().find(
      (currentVisitLog) => currentVisitLog.id === params.visitLogId,
    );

    if (!visitLog) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    return HttpResponse.json(visitLog);
  }),
  http.post('/api/visit-logs', async ({ request }) => {
    const payload = (await request.json()) as CreateVisitLogInput;
    const createdVisitLog: VisitLog = {
      id: `visit-log-${Date.now()}`,
      title: payload.title,
      district: payload.district,
      propertyType: payload.propertyType,
      status: 'draft',
      visitedAt: new Date().toISOString(),
      priceLabel: payload.priceLabel,
      agentName: 'Mock Agent',
      isPinned: false,
      summary: payload.summary,
    };

    appendVisitLogMock(createdVisitLog);

    return HttpResponse.json(createdVisitLog, {
      status: 201,
    });
  }),
  http.patch('/api/visit-logs/:visitLogId', async ({ params, request }) => {
    const payload = (await request.json()) as UpdateVisitLogInput;
    const currentVisitLog = listVisitLogsMock().find(
      (visitLog) => visitLog.id === params.visitLogId,
    );

    if (!currentVisitLog) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    const updatedVisitLog: VisitLog = {
      ...currentVisitLog,
      title: payload.title,
      district: payload.district,
      propertyType: payload.propertyType,
      priceLabel: payload.priceLabel,
      summary: payload.summary,
    };

    updateVisitLogMock(updatedVisitLog);

    return HttpResponse.json(updatedVisitLog);
  }),
  http.delete('/api/visit-logs/:visitLogId', async ({ params }) => {
    const currentVisitLog = listVisitLogsMock().find(
      (visitLog) => visitLog.id === params.visitLogId,
    );

    if (!currentVisitLog) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    removeVisitLogMock(currentVisitLog.id);

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];

export { visitLogsHandlers };
