import { EmptyState, EmptyStateAction, Spinner } from '@shared-ui/core';
import type { VisitLog } from '../types/visitLog';
import { VisitLogCard } from './VisitLogCard';

type VisitLogListProps = {
  isLoading: boolean;
  logs: VisitLog[];
  onCreateFirstLog: () => void;
  onOpenDetails: (log: VisitLog) => void;
};

const VisitLogList = ({
  isLoading,
  logs,
  onCreateFirstLog,
  onOpenDetails,
}: VisitLogListProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-[32px] border border-border bg-surface p-10 shadow-soft">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Spinner size="sm" />
          Loading the latest visit logs
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        badge="Visit logs"
        title="No visit logs matched your current filters"
        description="Try widening the search or create a new visit log to seed this screen."
        action={
          <EmptyStateAction onClick={onCreateFirstLog}>
            Add first visit log
          </EmptyStateAction>
        }
      />
    );
  }

  return (
    <div className="grid gap-6">
      {logs.map((log) => (
        <VisitLogCard key={log.id} log={log} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
};

export { VisitLogList };
