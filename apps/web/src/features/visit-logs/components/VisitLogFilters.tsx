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
  onPinnedOnlyChange: (checked: boolean) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (sort: VisitLogSort) => void;
  pinnedOnly: boolean;
  query: string;
  sort: VisitLogSort;
};

const VisitLogFilters = ({
  onPinnedOnlyChange,
  onQueryChange,
  onSortChange,
  pinnedOnly,
  query,
  sort,
}: VisitLogFiltersProps) => {
  const { t } = useTranslation();

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as VisitLogSort);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.7fr_auto]">
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

      <div className="flex items-end gap-3">
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
  );
};

export { VisitLogFilters };
