import { VisitLogsScreen } from '../features/visit-logs/components/VisitLogsScreen';
import { useVisitLogs } from '../features/visit-logs/hooks/useVisitLogs';

const VisitLogsPage = () => {
  const query = useVisitLogs('latest');

  return (
    <VisitLogsScreen logs={query.data ?? []} isLoading={query.isLoading} />
  );
};

export { VisitLogsPage };
