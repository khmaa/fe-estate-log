import type { TFunction } from 'i18next';
import type { VisitLog } from '../types/visitLog';

const getVisitLogStatusLabel = (t: TFunction, status: VisitLog['status']) => {
  return t(`visitLogs.enums.status.${status}`);
};

const getVisitLogPropertyTypeLabel = (
  t: TFunction,
  propertyType: VisitLog['propertyType'],
) => {
  return t(`visitLogs.enums.propertyType.${propertyType}`);
};

export { getVisitLogPropertyTypeLabel, getVisitLogStatusLabel };
