import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { queryClient } from '../app/queryClient';
import { resetVisitLogsMock } from '../features/visit-logs/mocks/visitLogs.data';
import { server } from '../mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
  resetVisitLogsMock();
});

afterAll(() => {
  server.close();
});
