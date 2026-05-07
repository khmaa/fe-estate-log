import type { VisitLogSort } from '../types/visitLog';

type VisitLogQuickFilterKey =
  | 'all'
  | 'pinned'
  | 'latest'
  | 'oldest'
  | 'district';

type VisitLogQuickFilter = {
  active: boolean;
  key: VisitLogQuickFilterKey;
  label: string;
  onClick: () => void;
};

type VisitLogQuickFilterTranslator = (key: string) => string;

type GetVisitLogQuickFiltersParams = {
  onQuickShowAll: () => void;
  onQuickShowPinned: () => void;
  onSortChange: (sort: VisitLogSort) => void;
  pinnedOnly: boolean;
  sort: VisitLogSort;
  t: VisitLogQuickFilterTranslator;
};

const getVisitLogQuickFilters = ({
  onQuickShowAll,
  onQuickShowPinned,
  onSortChange,
  pinnedOnly,
  sort,
  t,
}: GetVisitLogQuickFiltersParams): VisitLogQuickFilter[] => [
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

export { getVisitLogQuickFilters };
export type {
  GetVisitLogQuickFiltersParams,
  VisitLogQuickFilter,
  VisitLogQuickFilterTranslator,
};
