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
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as VisitLogSort);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.7fr_auto]">
      <Field
        htmlFor="visit-log-search"
        label="Search visit logs"
        helperText="Search by title, district, or agent name."
      >
        <Input
          id="visit-log-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by title, district, or agent"
        />
      </Field>

      <Field
        htmlFor="visit-log-sort"
        label="Sort by"
        helperText="The query hook refetches when the sort changes."
      >
        <Select id="visit-log-sort" value={sort} onChange={handleSortChange}>
          <option value="latest">Latest visit</option>
          <option value="oldest">Oldest visit</option>
          <option value="district">District</option>
        </Select>
      </Field>

      <div className="flex items-end gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Advanced filters</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Quick view filters
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Keep feature-specific filters close to the domain page instead
                  of the shared-ui layer.
                </p>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-ui border border-border bg-background px-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Pinned only
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Focus on high-priority logs you marked for follow-up.
                  </p>
                </div>
                <Switch
                  checked={pinnedOnly}
                  onChange={(event) =>
                    onPinnedOnlyChange(event.currentTarget.checked)
                  }
                  aria-label="Show pinned visit logs only"
                />
              </div>
              <div className="flex justify-end gap-3">
                <PopoverClose asChild>
                  <Button variant="ghost">Close</Button>
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
