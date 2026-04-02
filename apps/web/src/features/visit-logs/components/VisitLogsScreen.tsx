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
import { VisitLogCreateDialog } from './VisitLogCreateDialog';
import { VisitLogDeleteDialog } from './VisitLogDeleteDialog';
import { VisitLogEditDialog } from './VisitLogEditDialog';
import { VisitLogFilters } from './VisitLogFilters';
import { VisitLogList } from './VisitLogList';

type VisitLogsScreenProps = {
  isLoading: boolean;
  logs: VisitLog[];
};

const VisitLogsScreen = ({ isLoading, logs }: VisitLogsScreenProps) => {
  const [query, setQuery] = useState('');
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [deletedLogIds, setDeletedLogIds] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<VisitLog | null>(null);
  const [editingLog, setEditingLog] = useState<VisitLog | null>(null);
  const [deletingLog, setDeletingLog] = useState<VisitLog | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [sort, setSort] = useState<VisitLogSort>('latest');
  const { showToast } = useToast();

  const filteredLogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return logs.filter((log) => {
      if (deletedLogIds.includes(log.id)) {
        return false;
      }

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
  }, [deletedLogIds, logs, pinnedOnly, query]);

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

  const handleOpenDetails = (log: VisitLog) => {
    setSelectedLog(log);
  };

  const handleStartEdit = (visitLog: VisitLog) => {
    setEditingLog(visitLog);
    setSelectedLog(null);
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = (updatedVisitLog: VisitLog) => {
    setEditingLog(updatedVisitLog);
    setIsEditDialogOpen(false);
    showToast({
      title: 'Visit log updated',
      description:
        'The latest edits were synced through the feature mutation flow.',
      variant: 'success',
    });
  };

  const handleStartDelete = (visitLog: VisitLog) => {
    setDeletingLog(visitLog);
    setSelectedLog(null);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (deletedVisitLogId: string) => {
    setIsDeleteDialogOpen(false);
    setDeletedLogIds((current) => [...current, deletedVisitLogId]);
    showToast({
      title: 'Visit log deleted',
      description:
        'The selected visit log was removed through the feature mutation flow.',
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

        <VisitLogCreateDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreated={handleCreateConfirm}
        />

        <VisitLogEditDialog
          key={`${editingLog?.id ?? 'empty'}-${isEditDialogOpen ? 'open' : 'closed'}`}
          log={editingLog}
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              setEditingLog(null);
            }
          }}
          onUpdated={handleEditConfirm}
        />

        <VisitLogDeleteDialog
          log={deletingLog}
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open);
            if (!open) {
              setDeletingLog(null);
            }
          }}
          onDeleted={handleDeleteConfirm}
        />

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
              {selectedLog ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleStartEdit(selectedLog)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-danger hover:bg-danger-soft/50"
                    onClick={() => handleStartDelete(selectedLog)}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
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
