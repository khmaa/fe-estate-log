import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ShowcasePage } from '../pages/ShowcasePage';
import { VisitLogsPage } from '../pages/VisitLogsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<VisitLogsPage />} />
      <Route path="/showcase" element={<ShowcasePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRoutes };
