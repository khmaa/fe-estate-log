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
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useToast,
} from '@shared-ui/core';
import { useMemo, useState } from 'react';
import type { VisitLog, VisitLogSort } from '../types/visitLog';
import { VisitLogFilters } from './VisitLogFilters';
import { VisitLogList } from './VisitLogList';

type VisitLogsScreenProps = {
  isLoading: boolean;
  logs: VisitLog[];
};

const VisitLogsScreen = ({ isLoading, logs }: VisitLogsScreenProps) => {
  const [query, setQuery] = useState('');
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [selectedLog, setSelectedLog] = useState<VisitLog | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [sort, setSort] = useState<VisitLogSort>('latest');
  const { showToast } = useToast();

  const filteredLogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return logs.filter((log) => {
      if (pinnedOnly && !log.isPinned) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return [log.title, log.district, log.agentName].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    });
  }, [logs, pinnedOnly, query]);

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateConfirm = () => {
    setIsCreateDialogOpen(false);
    showToast({
      title: 'Draft flow prepared',
      description:
        'The visit-logs page is ready for a real create mutation once the API is wired in.',
      variant: 'success',
    });
  };

  const handleOpenDetails = (log: VisitLog) => {
    setSelectedLog(log);
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
              query={query}
              sort={sort}
              pinnedOnly={pinnedOnly}
              onQueryChange={setQuery}
              onSortChange={setSort}
              onPinnedOnlyChange={setPinnedOnly}
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
          onOpenDetails={handleOpenDetails}
        />

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new visit log</DialogTitle>
              <DialogDescription>
                The modal is already wired for feature use. A future mutation
                can replace this placeholder flow without changing the page
                structure.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm leading-6 text-muted-foreground">
                This confirmation intentionally stays simple. The next step is a
                dedicated create form feature or a mutation hook for draft
                creation.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button onClick={handleCreateConfirm}>Create draft</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={selectedLog !== null}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedLog(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedLog?.title ?? 'Visit log details'}
              </DialogTitle>
              <DialogDescription>
                This detail modal is driven by feature state rather than
                hard-coded page markup.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {selectedLog ? (
                <div className="space-y-4 text-sm leading-6 text-muted-foreground">
                  <p>{selectedLog.summary}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="font-semibold text-foreground">District</p>
                      <p>{selectedLog.district}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Agent</p>
                      <p>{selectedLog.agentName}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Price</p>
                      <p>{selectedLog.priceLabel}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Pinned</p>
                      <p>{selectedLog.isPinned ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
};

export { VisitLogsScreen };
