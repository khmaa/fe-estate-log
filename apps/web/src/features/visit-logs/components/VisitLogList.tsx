import { EmptyState, EmptyStateAction, Spinner } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLog } from '../types/visitLog';
import { VisitLogCard } from './VisitLogCard';

type VisitLogListProps = {
  isLoading: boolean;
  logs: VisitLog[];
  onCreateFirstLog: () => void;
  onOpenDetails: (visitLogId: string) => void;
};

const VisitLogList = ({
  isLoading,
  logs,
  onCreateFirstLog,
  onOpenDetails,
}: VisitLogListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-[32px] border border-border bg-surface p-10 shadow-soft">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Spinner size="sm" />
          {t('visitLogs.list.loading')}
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        badge={t('visitLogs.list.empty.badge')}
        title={t('visitLogs.list.empty.title')}
        description={t('visitLogs.list.empty.description')}
        action={
          <EmptyStateAction onClick={onCreateFirstLog}>
            {t('visitLogs.list.empty.action')}
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
