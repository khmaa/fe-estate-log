import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VisitLogsScreen } from '../features/visit-logs/components/VisitLogsScreen';
import { useVisitLogFilters } from '../features/visit-logs/hooks/useVisitLogFilters';
import { useVisitLogs } from '../features/visit-logs/hooks/useVisitLogs';

const VisitLogsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filters, setPage, setPageSize, setPinnedOnly, setQuery, setSort } =
    useVisitLogFilters();
  const query = useVisitLogs(filters);

  useEffect(() => {
    if (query.data && query.data.page !== filters.page) {
      setPage(query.data.page);
    }
  }, [filters.page, query.data, setPage]);

  const handleOpenDetails = (visitLogId: string) => {
    navigate(`/visit-logs/${visitLogId}${location.search}`);
  };

  return (
    <VisitLogsScreen
      logs={query.data?.items ?? []}
      totalCount={query.data?.totalCount ?? 0}
      totalPages={query.data?.totalPages ?? 1}
      isLoading={query.isLoading}
      filters={{
        ...filters,
        page: query.data?.page ?? filters.page,
      }}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onPinnedOnlyChange={setPinnedOnly}
      onQueryChange={setQuery}
      onSortChange={setSort}
      onOpenDetails={handleOpenDetails}
    />
  );
};

export { VisitLogsPage };
