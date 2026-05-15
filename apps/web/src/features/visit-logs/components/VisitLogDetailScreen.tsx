import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLog } from '../types/visitLog';
import { VisitLogDetailActions } from './VisitLogDetailActions';
import { VisitLogDetailBadges } from './VisitLogDetailBadges';
import { VisitLogDetailMetaGrid } from './VisitLogDetailMetaGrid';
import { VisitLogDetailSkeleton } from './VisitLogDetailSkeleton';

type VisitLogDetailScreenProps = {
  errorType: 'not-found' | 'unknown' | null;
  isActionDisabled?: boolean;
  isError: boolean;
  isLoading: boolean;
  log: VisitLog | null;
  onBack: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const VisitLogDetailScreen = ({
  errorType,
  isActionDisabled = false,
  isError,
  isLoading,
  log,
  onBack,
  onDelete,
  onEdit,
}: VisitLogDetailScreenProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <VisitLogDetailSkeleton />;
  }

  if (isError && errorType === 'unknown') {
    return (
      <main className="min-h-screen px-6 py-16">
        <section className="mx-auto max-w-4xl">
          <EmptyState
            badge={t('visitLogs.detail.error.badge')}
            title={t('visitLogs.detail.error.title')}
            description={t('visitLogs.detail.error.description')}
            action={
              <Button onClick={onBack}>
                {t('visitLogs.detail.actions.back')}
              </Button>
            }
          />
        </section>
      </main>
    );
  }

  if (!log) {
    return (
      <main className="min-h-screen px-6 py-16">
        <section className="mx-auto max-w-4xl">
          <EmptyState
            badge={t('visitLogs.detail.empty.badge')}
            title={t('visitLogs.detail.empty.title')}
            description={t('visitLogs.detail.empty.description')}
            action={
              <Button onClick={onBack}>
                {t('visitLogs.detail.actions.back')}
              </Button>
            }
          />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto flex max-w-4xl flex-col gap-8">
        <VisitLogDetailActions
          backLabel={t('visitLogs.detail.actions.back')}
          deleteLabel={t('visitLogs.detail.actions.delete')}
          editLabel={t('visitLogs.detail.actions.edit')}
          isActionDisabled={isActionDisabled}
          onBack={onBack}
          onDelete={onDelete}
          onEdit={onEdit}
        />

        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <VisitLogDetailBadges
              isPinned={log.isPinned}
              propertyType={log.propertyType}
              status={log.status}
            />
            <CardTitle>{log.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-7 text-muted-foreground">
              {log.summary}
            </p>
            <VisitLogDetailMetaGrid
              agentName={log.agentName}
              district={log.district}
              priceLabel={log.priceLabel}
              visitedAt={log.visitedAt}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export { VisitLogDetailScreen };
