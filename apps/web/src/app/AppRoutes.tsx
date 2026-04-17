import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RouteErrorPage } from '../pages/RouteErrorPage';
import { ShowcasePage } from '../pages/ShowcasePage';
import { VisitLogDetailPage } from '../pages/VisitLogDetailPage';
import { VisitLogsPage } from '../pages/VisitLogsPage';
import { AppShell } from './layouts/AppShell';

const appRoutes = createRoutesFromElements(
  <Route element={<AppShell />} errorElement={<RouteErrorPage />}>
    <Route path="/" element={<Navigate to="/visit-logs" replace />} />
    <Route path="/visit-logs" element={<VisitLogsPage />} />
    <Route path="/visit-logs/:visitLogId" element={<VisitLogDetailPage />} />
    <Route path="/showcase" element={<ShowcasePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>,
);

const createAppRouter = () => createBrowserRouter(appRoutes);

export { appRoutes, createAppRouter };
