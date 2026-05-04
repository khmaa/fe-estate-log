import {
  Button,
  Field,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Select,
  Switch,
} from '@shared-ui/core';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { VisitLogSort } from '../types/visitLog';

type VisitLogFiltersProps = {
  hasActiveFilters: boolean;
  onQuickShowAll: () => void;
  onQuickShowPinned: () => void;
  onPageSizeChange: (pageSize: number) => void;
  onPinnedOnlyChange: (checked: boolean) => void;
  onQueryChange: (value: string) => void;
  onResetFilters: () => void;
  onSortChange: (sort: VisitLogSort) => void;
  pageSize: number;
  pinnedOnly: boolean;
  query: string;
  sort: VisitLogSort;
};

const VisitLogFilters = ({
  hasActiveFilters,
  onQuickShowAll,
  onQuickShowPinned,
  onPageSizeChange,
  onPinnedOnlyChange,
  onQueryChange,
  onResetFilters,
  onSortChange,
  pageSize,
  pinnedOnly,
  query,
  sort,
}: VisitLogFiltersProps) => {
  const { t } = useTranslation();

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as VisitLogSort);
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(event.target.value));
  };

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
    <div className="space-y-4">
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

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.7fr_0.6fr_auto]">
        <Field
          htmlFor="visit-log-search"
          label={t('visitLogs.filters.search.label')}
          helperText={t('visitLogs.filters.search.helper')}
        >
          <Input
            id="visit-log-search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t('visitLogs.filters.search.placeholder')}
          />
        </Field>

        <Field
          htmlFor="visit-log-sort"
          label={t('visitLogs.filters.sort.label')}
          helperText={t('visitLogs.filters.sort.helper')}
        >
          <Select id="visit-log-sort" value={sort} onChange={handleSortChange}>
            <option value="latest">{t('visitLogs.filters.sort.latest')}</option>
            <option value="oldest">{t('visitLogs.filters.sort.oldest')}</option>
            <option value="district">
              {t('visitLogs.filters.sort.district')}
            </option>
          </Select>
        </Field>

        <Field
          htmlFor="visit-log-page-size"
          label={t('visitLogs.filters.pageSize.label')}
          helperText={t('visitLogs.filters.pageSize.helper')}
        >
          <Select
            id="visit-log-page-size"
            value={String(pageSize)}
            onChange={handlePageSizeChange}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </Select>
        </Field>

        <div className="flex items-end gap-3">
          {hasActiveFilters ? (
            <Button variant="ghost" onClick={onResetFilters}>
              {t('visitLogs.filters.reset')}
            </Button>
          ) : null}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">
                {t('visitLogs.filters.advanced')}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {t('visitLogs.filters.summary.title')}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {t('visitLogs.filters.summary.description')}
                  </p>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-ui border border-border bg-background px-4 py-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {t('visitLogs.filters.pinned.label')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('visitLogs.filters.pinned.description')}
                    </p>
                  </div>
                  <Switch
                    checked={pinnedOnly}
                    onChange={(event) =>
                      onPinnedOnlyChange(event.currentTarget.checked)
                    }
                    aria-label={t('visitLogs.filters.pinned.label')}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <PopoverClose asChild>
                    <Button variant="ghost">
                      {t('visitLogs.filters.close')}
                    </Button>
                  </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export { VisitLogFilters };
