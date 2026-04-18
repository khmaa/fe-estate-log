import { EmptyState, EmptyStateAction } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLog } from '../types/visitLog';
import { VisitLogCard } from './VisitLogCard';
import { VisitLogListSkeleton } from './VisitLogListSkeleton';
import { VisitLogPagination } from './VisitLogPagination';

type VisitLogListProps = {
  isError: boolean;
  isLoading: boolean;
  logs: VisitLog[];
  onCreateFirstLog: () => void;
  onOpenDetails: (visitLogId: string) => void;
  onPrefetchDetails: (visitLogId: string) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

const VisitLogList = ({
  isError,
  isLoading,
  logs,
  onCreateFirstLog,
  onOpenDetails,
  onPrefetchDetails,
  onPageChange,
  onRetry,
  page,
  pageSize,
  totalCount,
  totalPages,
}: VisitLogListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <VisitLogListSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        badge={t('visitLogs.list.error.badge')}
        title={t('visitLogs.list.error.title')}
        description={t('visitLogs.list.error.description')}
        action={
          <EmptyStateAction onClick={onRetry}>
            {t('visitLogs.list.error.action')}
          </EmptyStateAction>
        }
      />
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
        <VisitLogCard
          key={log.id}
          log={log}
          onOpenDetails={onOpenDetails}
          onPrefetchDetails={onPrefetchDetails}
        />
      ))}
      <VisitLogPagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export { VisitLogList };
