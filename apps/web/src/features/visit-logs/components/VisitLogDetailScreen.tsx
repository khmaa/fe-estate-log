import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLog } from '../types/visitLog';
import {
  getVisitLogPropertyTypeLabel,
  getVisitLogStatusLabel,
} from '../utils/visitLogLabels';
import { VisitLogDetailSkeleton } from './VisitLogDetailSkeleton';

const statusVariantMap = {
  completed: 'success',
  draft: 'secondary',
  scheduled: 'warning',
} as const;

const formatVisitedAt = (visitedAt: string) => {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(visitedAt));
};

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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button variant="ghost" onClick={onBack}>
            {t('visitLogs.detail.actions.back')}
          </Button>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              disabled={isActionDisabled}
              onClick={onEdit}
            >
              {t('visitLogs.detail.actions.edit')}
            </Button>
            <Button
              variant="ghost"
              className="text-danger hover:bg-danger-soft/50"
              disabled={isActionDisabled}
              onClick={onDelete}
            >
              {t('visitLogs.detail.actions.delete')}
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariantMap[log.status]}>
                {getVisitLogStatusLabel(t, log.status)}
              </Badge>
              <Badge variant="secondary">
                {getVisitLogPropertyTypeLabel(t, log.propertyType)}
              </Badge>
              {log.isPinned ? (
                <Badge>{t('visitLogs.detail.pinned')}</Badge>
              ) : null}
            </div>
            <CardTitle>{log.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-7 text-muted-foreground">
              {log.summary}
            </p>
            <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground">
                  {t('visitLogs.detail.fields.district')}
                </p>
                <p>{log.district}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t('visitLogs.detail.fields.price')}
                </p>
                <p>{log.priceLabel}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t('visitLogs.detail.fields.visited')}
                </p>
                <p>{formatVisitedAt(log.visitedAt)}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t('visitLogs.detail.fields.agent')}
                </p>
                <p>{log.agentName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export { VisitLogDetailScreen };
