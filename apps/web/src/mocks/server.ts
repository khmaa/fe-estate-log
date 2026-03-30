import { setupServer } from 'msw/node';
import { visitLogsHandlers } from '../features/visit-logs/mocks/handlers';

const server = setupServer(...visitLogsHandlers);

export { server };
