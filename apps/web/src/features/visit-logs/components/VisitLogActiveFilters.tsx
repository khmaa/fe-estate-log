import { Badge } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLogFilters } from '../types/visitLog';
import { getVisitLogActiveFilters } from '../utils/getVisitLogActiveFilters';

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
  const activeFilterBadges = getVisitLogActiveFilters(filters, t, {
    onClearPage,
    onClearPageSize,
    onClearPinnedOnly,
    onClearQuery,
    onClearSort,
  });

  if (activeFilterBadges.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="visit-log-active-filters-title"
      className="space-y-3"
    >
      <p
        id="visit-log-active-filters-title"
        className="text-sm font-semibold text-foreground"
      >
        {t('visitLogs.filters.active.title')}
      </p>
      <ul className="flex flex-wrap gap-2">
        {activeFilterBadges.map((badge) => (
          <li key={badge.key}>
            <button
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
          </li>
        ))}
      </ul>
    </section>
  );
};

export { VisitLogActiveFilters };
