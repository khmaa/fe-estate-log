import { Button } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';

type VisitLogPaginationProps = {
  onPageChange: (page: number) => void;
  pageSize: number;
  page: number;
  totalCount: number;
  totalPages: number;
};

const VisitLogPagination = ({
  onPageChange,
  pageSize,
  page,
  totalCount,
  totalPages,
}: VisitLogPaginationProps) => {
  const { t } = useTranslation();

  if (totalPages <= 1) {
    return null;
  }

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-border bg-surface px-5 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {t('visitLogs.pagination.summary', {
          page,
          rangeEnd,
          rangeStart,
          pageSize,
          totalCount,
          totalPages,
        })}
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          {t('visitLogs.pagination.previous')}
        </Button>
        <span className="text-sm font-medium text-foreground">
          {t('visitLogs.pagination.current', { page, totalPages })}
        </span>
        <Button
          variant="secondary"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          {t('visitLogs.pagination.next')}
        </Button>
      </div>
    </div>
  );
};

export { VisitLogPagination };
