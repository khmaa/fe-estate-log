import { setupWorker } from 'msw/browser';
import { visitLogsHandlers } from '../features/visit-logs/mocks/handlers';

const worker = setupWorker(...visitLogsHandlers);

export { worker };
