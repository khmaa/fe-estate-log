import { Button } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLogSort } from '../types/visitLog';
import { getVisitLogQuickFilters } from '../utils/getVisitLogQuickFilters';

type VisitLogQuickFiltersProps = {
  onQuickShowAll: () => void;
  onQuickShowPinned: () => void;
  onSortChange: (sort: VisitLogSort) => void;
  pinnedOnly: boolean;
  sort: VisitLogSort;
};

const VisitLogQuickFilters = ({
  onQuickShowAll,
  onQuickShowPinned,
  onSortChange,
  pinnedOnly,
  sort,
}: VisitLogQuickFiltersProps) => {
  const { t } = useTranslation();

  const quickFilters = getVisitLogQuickFilters({
    pinnedOnly,
    sort,
    onQuickShowAll,
    onQuickShowPinned,
    onSortChange,
    t,
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {quickFilters.map((filter) => (
        <Button
          key={filter.key}
          type="button"
          variant={filter.active ? 'primary' : 'secondary'}
          onClick={filter.onClick}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export { VisitLogQuickFilters };
