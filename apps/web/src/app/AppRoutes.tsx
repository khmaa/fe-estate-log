import { Navigate, Route, Routes } from 'react-router-dom';
import { ShowcasePage } from '../pages/ShowcasePage';
import { VisitLogsPage } from '../pages/VisitLogsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<VisitLogsPage />} />
      <Route path="/showcase" element={<ShowcasePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRoutes };
