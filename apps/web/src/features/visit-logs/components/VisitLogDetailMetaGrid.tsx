import { useTranslation } from 'react-i18next';
import type { VisitLog } from '../types/visitLog';
import { formatVisitLogVisitedAt } from '../utils/formatVisitLogVisitedAt';

type VisitLogDetailMetaGridProps = {
  agentName: VisitLog['agentName'];
  district: VisitLog['district'];
  priceLabel: VisitLog['priceLabel'];
  visitedAt: VisitLog['visitedAt'];
};

const VisitLogDetailMetaGrid = ({
  agentName,
  district,
  priceLabel,
  visitedAt,
}: VisitLogDetailMetaGridProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
      <div>
        <p className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.district')}
        </p>
        <p>{district}</p>
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.price')}
        </p>
        <p>{priceLabel}</p>
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.visited')}
        </p>
        <p>{formatVisitLogVisitedAt(visitedAt)}</p>
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.agent')}
        </p>
        <p>{agentName}</p>
      </div>
    </div>
  );
};

export { VisitLogDetailMetaGrid };
