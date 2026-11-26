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
  const { i18n, t } = useTranslation();

  return (
    <dl className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
      <div>
        <dt className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.district')}
        </dt>
        <dd>{district}</dd>
      </div>
      <div>
        <dt className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.price')}
        </dt>
        <dd>{priceLabel}</dd>
      </div>
      <div>
        <dt className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.visited')}
        </dt>
        <dd>
          <time dateTime={visitedAt}>
            {formatVisitLogVisitedAt(visitedAt, i18n.resolvedLanguage)}
          </time>
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-foreground">
          {t('visitLogs.detail.fields.agent')}
        </dt>
        <dd>{agentName}</dd>
      </div>
    </dl>
  );
};

export { VisitLogDetailMetaGrid };
