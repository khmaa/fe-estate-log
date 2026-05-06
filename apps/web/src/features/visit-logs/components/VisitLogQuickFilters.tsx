import { Button } from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLogSort } from '../types/visitLog';

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

  const quickFilters = [
    {
      key: 'all',
      label: t('visitLogs.filters.quick.all'),
      active: !pinnedOnly && sort === 'latest',
      onClick: onQuickShowAll,
    },
    {
      key: 'pinned',
      label: t('visitLogs.filters.quick.pinned'),
      active: pinnedOnly,
      onClick: onQuickShowPinned,
    },
    {
      key: 'latest',
      label: t('visitLogs.filters.quick.latest'),
      active: sort === 'latest',
      onClick: () => onSortChange('latest'),
    },
    {
      key: 'oldest',
      label: t('visitLogs.filters.quick.oldest'),
      active: sort === 'oldest',
      onClick: () => onSortChange('oldest'),
    },
    {
      key: 'district',
      label: t('visitLogs.filters.quick.district'),
      active: sort === 'district',
      onClick: () => onSortChange('district'),
    },
  ];

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
