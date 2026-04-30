import { Badge } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLogFilters } from '../types/visitLog';

type VisitLogActiveFiltersProps = {
  filters: VisitLogFilters;
  onClearPage: () => void;
  onClearPageSize: () => void;
  onClearPinnedOnly: () => void;
  onClearQuery: () => void;
  onClearSort: () => void;
};

const VisitLogActiveFilters = ({
  filters,
  onClearPage,
  onClearPageSize,
  onClearPinnedOnly,
  onClearQuery,
  onClearSort,
}: VisitLogActiveFiltersProps) => {
  const { t } = useTranslation();
  const activeFilterBadges = [
    filters.query
      ? {
          key: 'query',
          label: t('visitLogs.filters.active.query', { query: filters.query }),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.query', {
              query: filters.query,
            }),
          }),
          onClear: onClearQuery,
        }
      : null,
    filters.sort !== 'latest'
      ? {
          key: 'sort',
          label: t(`visitLogs.filters.active.sort.${filters.sort}`),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t(`visitLogs.filters.active.sort.${filters.sort}`),
          }),
          onClear: onClearSort,
        }
      : null,
    filters.pinnedOnly
      ? {
          key: 'pinned',
          label: t('visitLogs.filters.active.pinned'),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.pinned'),
          }),
          onClear: onClearPinnedOnly,
        }
      : null,
    filters.pageSize !== 2
      ? {
          key: 'pageSize',
          label: t('visitLogs.filters.active.pageSize', {
            pageSize: filters.pageSize,
          }),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.pageSize', {
              pageSize: filters.pageSize,
            }),
          }),
          onClear: onClearPageSize,
        }
      : null,
    filters.page > 1
      ? {
          key: 'page',
          label: t('visitLogs.filters.active.page', { page: filters.page }),
          removeLabel: t('visitLogs.filters.active.remove', {
            label: t('visitLogs.filters.active.page', { page: filters.page }),
          }),
          onClear: onClearPage,
        }
      : null,
  ].filter(
    (
      badge,
    ): badge is {
      key: string;
      label: string;
      removeLabel: string;
      onClear: () => void;
    } => Boolean(badge),
  );

  if (activeFilterBadges.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground">
        {t('visitLogs.filters.active.title')}
      </p>
      <div className="flex flex-wrap gap-2">
        {activeFilterBadges.map((badge) => (
          <button
            key={badge.key}
            type="button"
            onClick={badge.onClear}
            className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            aria-label={badge.removeLabel}
            title={badge.removeLabel}
          >
            <Badge variant="secondary">
              <span>{badge.label}</span>
              <span aria-hidden="true" className="ml-1">
                ×
              </span>
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
};

export { VisitLogActiveFilters };
