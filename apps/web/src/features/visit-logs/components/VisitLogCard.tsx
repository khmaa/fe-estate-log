import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shared-ui/core';
import { useTranslation } from 'react-i18next';
import type { VisitLog } from '../types/visitLog';
import {
  getVisitLogPropertyTypeLabel,
  getVisitLogStatusLabel,
} from '../utils/visitLogLabels';

const statusVariantMap = {
  completed: 'success',
  draft: 'secondary',
  scheduled: 'warning',
} as const;

type VisitLogCardProps = {
  log: VisitLog;
  onOpenDetails: (visitLogId: string) => void;
};

const formatVisitedAt = (visitedAt: string) => {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(visitedAt));
};

const VisitLogCard = ({ log, onOpenDetails }: VisitLogCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
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
            <CardTitle className="text-xl">{log.title}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">{t('visitLogs.card.actions')}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {t('visitLogs.card.menuLabel')}
              </DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => onOpenDetails(log.id)}>
                {t('visitLogs.card.details')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t('visitLogs.card.duplicate')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger focus:bg-danger-soft/50">
                {t('visitLogs.card.archive')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground">
              {t('visitLogs.card.fields.district')}
            </p>
            <p>{log.district}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {t('visitLogs.card.fields.price')}
            </p>
            <p>{log.priceLabel}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {t('visitLogs.card.fields.visited')}
            </p>
            <p>{formatVisitedAt(log.visitedAt)}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{log.summary}</p>
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-muted-foreground">
            {t('visitLogs.card.handledBy', { name: log.agentName })}
          </p>
          <Button variant="secondary" onClick={() => onOpenDetails(log.id)}>
            {t('visitLogs.card.review')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { VisitLogCard };
