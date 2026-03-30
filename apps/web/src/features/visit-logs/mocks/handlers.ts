import { HttpResponse, http } from 'msw';
import { visitLogsMock } from './visitLogs.data';

const visitLogsHandlers = [
  http.get('/api/visit-logs', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 120);
    });

    return HttpResponse.json(visitLogsMock);
  }),
];

export { visitLogsHandlers };
