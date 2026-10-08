import { Badge } from '@shared-ui/core';
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

type VisitLogDetailBadgesProps = {
  isPinned: boolean;
  propertyType: VisitLog['propertyType'];
  status: VisitLog['status'];
};

const VisitLogDetailBadges = ({
  isPinned,
  propertyType,
  status,
}: VisitLogDetailBadgesProps) => {
  const { t } = useTranslation();

  return (
    <div
      aria-label={t('visitLogs.detail.badgesLabel')}
      className="flex flex-wrap items-center gap-2"
      role="group"
    >
      <Badge variant={statusVariantMap[status]}>
        {getVisitLogStatusLabel(t, status)}
      </Badge>
      <Badge variant="secondary">
        {getVisitLogPropertyTypeLabel(t, propertyType)}
      </Badge>
      {isPinned ? <Badge>{t('visitLogs.detail.pinned')}</Badge> : null}
    </div>
  );
};

export { VisitLogDetailBadges };
