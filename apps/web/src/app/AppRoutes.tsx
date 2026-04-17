import { lazy, Suspense, type ReactNode } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import { RouteErrorPage } from '../pages/RouteErrorPage';
import { RouteLoadingFallback } from './components/RouteLoadingFallback';
import { AppShell } from './layouts/AppShell';

const NotFoundPage = lazy(async () => {
  const module = await import('../pages/NotFoundPage');
  return { default: module.NotFoundPage };
});

const ShowcasePage = lazy(async () => {
  const module = await import('../pages/ShowcasePage');
  return { default: module.ShowcasePage };
});

const VisitLogDetailPage = lazy(async () => {
  const module = await import('../pages/VisitLogDetailPage');
  return { default: module.VisitLogDetailPage };
});

const VisitLogsPage = lazy(async () => {
  const module = await import('../pages/VisitLogsPage');
  return { default: module.VisitLogsPage };
});

const withRouteSuspense = (element: ReactNode) => (
  <Suspense fallback={<RouteLoadingFallback />}>{element}</Suspense>
);

const appRoutes = createRoutesFromElements(
  <Route element={<AppShell />} errorElement={<RouteErrorPage />}>
    <Route path="/" element={<Navigate to="/visit-logs" replace />} />
    <Route path="/visit-logs" element={withRouteSuspense(<VisitLogsPage />)} />
    <Route
      path="/visit-logs/:visitLogId"
      element={withRouteSuspense(<VisitLogDetailPage />)}
    />
    <Route path="/showcase" element={withRouteSuspense(<ShowcasePage />)} />
    <Route path="*" element={withRouteSuspense(<NotFoundPage />)} />
  </Route>,
);

const createAppRouter = () => createBrowserRouter(appRoutes);

export { appRoutes, createAppRouter };
