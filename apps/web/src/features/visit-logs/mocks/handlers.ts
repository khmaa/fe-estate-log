import { HttpResponse, http } from 'msw';
import type { CreateVisitLogInput, VisitLog } from '../types/visitLog';
import { appendVisitLogMock, listVisitLogsMock } from './visitLogs.data';

const visitLogsHandlers = [
  http.get('/api/visit-logs', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 120);
    });

    return HttpResponse.json(listVisitLogsMock());
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
];

export { visitLogsHandlers };
