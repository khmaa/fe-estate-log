import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ShowcasePage } from '../pages/ShowcasePage';
import { VisitLogDetailPage } from '../pages/VisitLogDetailPage';
import { VisitLogsPage } from '../pages/VisitLogsPage';
import { AppShell } from './layouts/AppShell';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/visit-logs" replace />} />
        <Route path="/visit-logs" element={<VisitLogsPage />} />
        <Route
          path="/visit-logs/:visitLogId"
          element={<VisitLogDetailPage />}
        />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
