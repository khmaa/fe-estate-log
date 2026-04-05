import { VisitLogsScreen } from '../features/visit-logs/components/VisitLogsScreen';
import { useVisitLogFilters } from '../features/visit-logs/hooks/useVisitLogFilters';
import { useVisitLogs } from '../features/visit-logs/hooks/useVisitLogs';

const VisitLogsPage = () => {
  const { filters, setPinnedOnly, setQuery, setSort } = useVisitLogFilters();
  const query = useVisitLogs(filters.sort);

  return (
    <VisitLogsScreen
      logs={query.data ?? []}
      isLoading={query.isLoading}
      filters={filters}
      onPinnedOnlyChange={setPinnedOnly}
      onQueryChange={setQuery}
      onSortChange={setSort}
    />
  );
};

export { VisitLogsPage };
