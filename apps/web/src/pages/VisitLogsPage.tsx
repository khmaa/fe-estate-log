import { useLocation, useNavigate } from 'react-router-dom';
import { VisitLogsScreen } from '../features/visit-logs/components/VisitLogsScreen';
import { useVisitLogFilters } from '../features/visit-logs/hooks/useVisitLogFilters';
import { useVisitLogs } from '../features/visit-logs/hooks/useVisitLogs';

const VisitLogsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filters, setPinnedOnly, setQuery, setSort } = useVisitLogFilters();
  const query = useVisitLogs(filters);
  const handleOpenDetails = (visitLogId: string) => {
    navigate(`/visit-logs/${visitLogId}${location.search}`);
  };

  return (
    <VisitLogsScreen
      logs={query.data ?? []}
      isLoading={query.isLoading}
      filters={filters}
      onPinnedOnlyChange={setPinnedOnly}
      onQueryChange={setQuery}
      onSortChange={setSort}
      onOpenDetails={handleOpenDetails}
    />
  );
};

export { VisitLogsPage };
