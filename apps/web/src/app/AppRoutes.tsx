import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ShowcasePage } from '../pages/ShowcasePage';
import { VisitLogDetailPage } from '../pages/VisitLogDetailPage';
import { VisitLogsPage } from '../pages/VisitLogsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/visit-logs" replace />} />
      <Route path="/visit-logs" element={<VisitLogsPage />} />
      <Route path="/visit-logs/:visitLogId" element={<VisitLogDetailPage />} />
      <Route path="/showcase" element={<ShowcasePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRoutes };
