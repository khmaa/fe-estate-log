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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { VisitLog, VisitLogSort } from '../types/visitLog';
import { VisitLogCreateDialog } from './VisitLogCreateDialog';
import { VisitLogFilters } from './VisitLogFilters';
import { VisitLogList } from './VisitLogList';

type VisitLogsScreenProps = {
  filters: {
    page: number;
    pageSize: number;
    pinnedOnly: boolean;
    query: string;
    sort: VisitLogSort;
  };
  isLoading: boolean;
  logs: VisitLog[];
  onOpenDetails: (visitLogId: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onPinnedOnlyChange: (checked: boolean) => void;
  onQueryChange: (value: string) => void;
  onSortChange: (sort: VisitLogSort) => void;
  totalCount: number;
  totalPages: number;
};

const VisitLogsScreen = ({
  filters,
  isLoading,
  logs,
  onOpenDetails,
  onPageChange,
  onPageSizeChange,
  onPinnedOnlyChange,
  onQueryChange,
  onSortChange,
  totalCount,
  totalPages,
}: VisitLogsScreenProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateConfirm = () => {
    setIsCreateDialogOpen(false);
    showToast({
      title: t('visitLogs.page.toast.title'),
      description: t('visitLogs.page.toast.description'),
      variant: 'success',
    });
  };

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <Banner
          title={t('visitLogs.page.banner.title')}
          description={t('visitLogs.page.banner.description')}
          variant="info"
          action={
            <Button variant="secondary">
              {t('visitLogs.page.banner.action')}
            </Button>
          }
        />

        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{t('visitLogs.badges.visitLogs')}</Badge>
              <Badge variant="secondary">
                {t('visitLogs.badges.featureFirst')}
              </Badge>
              <Badge variant="success">
                {t('visitLogs.badges.tanstackQuery')}
              </Badge>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <CardTitle>{t('visitLogs.page.title')}</CardTitle>
                <CardDescription className="max-w-3xl">
                  {t('visitLogs.page.description')}
                </CardDescription>
              </div>
              <Button onClick={handleCreateClick}>
                {t('visitLogs.page.create')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <VisitLogFilters
              pageSize={filters.pageSize}
              query={filters.query}
              sort={filters.sort}
              pinnedOnly={filters.pinnedOnly}
              onPageSizeChange={onPageSizeChange}
              onQueryChange={onQueryChange}
              onSortChange={onSortChange}
              onPinnedOnlyChange={onPinnedOnlyChange}
            />
          </CardContent>
        </Card>

        <Alert>
          <AlertTitle>{t('visitLogs.page.alert.title')}</AlertTitle>
          <AlertDescription>
            {t('visitLogs.page.alert.description')}
          </AlertDescription>
        </Alert>

        <VisitLogList
          logs={logs}
          isLoading={isLoading}
          onCreateFirstLog={handleCreateClick}
          onOpenDetails={onOpenDetails}
          onPageChange={onPageChange}
          page={filters.page}
          pageSize={filters.pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
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
