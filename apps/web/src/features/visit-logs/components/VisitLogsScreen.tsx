import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Banner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  useToast,
} from '@shared-ui/core';
import { useMemo, useState } from 'react';
import type { VisitLog, VisitLogSort } from '../types/visitLog';
import { VisitLogCreateDialog } from './VisitLogCreateDialog';
import { VisitLogFilters } from './VisitLogFilters';
import { VisitLogList } from './VisitLogList';

type VisitLogsScreenProps = {
  filters: {
    pinnedOnly: boolean;
    query: string;
    sort: VisitLogSort;
  };
  isLoading: boolean;
  logs: VisitLog[];
  onOpenDetails: (visitLogId: string) => void;
  onPinnedOnlyChange: (checked: boolean) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (sort: VisitLogSort) => void;
};

const VisitLogsScreen = ({
  filters,
  isLoading,
  logs,
  onOpenDetails,
  onPinnedOnlyChange,
  onQueryChange,
  onSortChange,
}: VisitLogsScreenProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { showToast } = useToast();

  const filteredLogs = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return logs.filter((log) => {
      if (filters.pinnedOnly && !log.isPinned) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return [log.title, log.district, log.agentName].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    });
  }, [filters.pinnedOnly, filters.query, logs]);

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateConfirm = () => {
    setIsCreateDialogOpen(false);
    showToast({
      title: 'Visit log created',
      description:
        'The new draft has been added through the feature mutation flow.',
      variant: 'success',
    });
  };

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <Banner
          title="Visit logs domain preview"
          description="This page is structured as a feature-based screen backed by TanStack Query, even though the current data source is still mocked."
          variant="info"
          action={<Button variant="secondary">Open API contract</Button>}
        />

        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Visit Logs</Badge>
              <Badge variant="secondary">Feature-first</Badge>
              <Badge variant="success">TanStack Query</Badge>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <CardTitle>Visit logs workspace</CardTitle>
                <CardDescription className="max-w-3xl">
                  The page composition now lives on top of a feature-layer
                  structure: API, service, hook, domain components, and a thin
                  page entry.
                </CardDescription>
              </div>
              <Button onClick={handleCreateClick}>Create visit log</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <VisitLogFilters
              query={filters.query}
              sort={filters.sort}
              pinnedOnly={filters.pinnedOnly}
              onQueryChange={onQueryChange}
              onSortChange={onSortChange}
              onPinnedOnlyChange={onPinnedOnlyChange}
            />
          </CardContent>
        </Card>

        <Alert>
          <AlertTitle>Current implementation note</AlertTitle>
          <AlertDescription>
            The query layer is real, but the data source is still mocked. This
            gives the page a production-like state boundary without locking the
            screen to a fake in-component array.
          </AlertDescription>
        </Alert>

        <VisitLogList
          logs={filteredLogs}
          isLoading={isLoading}
          onCreateFirstLog={handleCreateClick}
          onOpenDetails={onOpenDetails}
        />

        <VisitLogCreateDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreated={handleCreateConfirm}
        />
      </section>
    </main>
  );
};

export { VisitLogsScreen };
