import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VisitLogsScreen } from '../features/visit-logs/components/VisitLogsScreen';
import { prefetchVisitLogDetail } from '../features/visit-logs/hooks/useVisitLogDetail';
import { useVisitLogFilters } from '../features/visit-logs/hooks/useVisitLogFilters';
import { useVisitLogs } from '../features/visit-logs/hooks/useVisitLogs';

const VisitLogsPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    clearPage,
    clearPageSize,
    clearPinnedOnly,
    clearQuery,
    clearSort,
    filters,
    hasActiveFilters,
    resetFilters,
    setPage,
    setPageSize,
    setPinnedOnly,
    setQuery,
    setSort,
  } = useVisitLogFilters();
  const query = useVisitLogs(filters);

  useEffect(() => {
    if (query.data && query.data.page !== filters.page) {
      setPage(query.data.page);
    }
  }, [filters.page, query.data, setPage]);

  const handleOpenDetails = (visitLogId: string) => {
    navigate(`/visit-logs/${visitLogId}${location.search}`);
  };

  const handlePrefetchDetails = (visitLogId: string) => {
    void prefetchVisitLogDetail(queryClient, visitLogId);
  };

  return (
    <VisitLogsScreen
      logs={query.data?.items ?? []}
      totalCount={query.data?.totalCount ?? 0}
      totalPages={query.data?.totalPages ?? 1}
      hasActiveFilters={hasActiveFilters}
      isError={query.isError}
      isLoading={query.isLoading}
      filters={{
        ...filters,
        page: query.data?.page ?? filters.page,
      }}
      onClearPage={clearPage}
      onClearPageSize={clearPageSize}
      onClearPinnedOnly={clearPinnedOnly}
      onClearQuery={clearQuery}
      onClearSort={clearSort}
      onPrefetchDetails={handlePrefetchDetails}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onPinnedOnlyChange={setPinnedOnly}
      onQueryChange={setQuery}
      onQuickShowAll={() => {
        setPinnedOnly(false);
        setSort('latest');
      }}
      onQuickShowPinned={() => setPinnedOnly(true)}
      onResetFilters={resetFilters}
      onRetry={() => {
        void query.refetch();
      }}
      onSortChange={setSort}
      onOpenDetails={handleOpenDetails}
    />
  );
};

export { VisitLogsPage };
