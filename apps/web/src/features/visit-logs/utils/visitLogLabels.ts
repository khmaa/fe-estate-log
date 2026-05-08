import type { TFunction } from 'i18next';
import type { VisitLog, VisitLogSort } from '../types/visitLog';

type VisitLogLabelTranslator = (
  key: string,
  options?: Record<string, string | number>,
) => string;

const getVisitLogStatusLabel = (t: TFunction, status: VisitLog['status']) => {
  return t(`visitLogs.enums.status.${status}`);
};

const getVisitLogPropertyTypeLabel = (
  t: TFunction,
  propertyType: VisitLog['propertyType'],
) => {
  return t(`visitLogs.enums.propertyType.${propertyType}`);
};

const getVisitLogSortLabel = (
  t: VisitLogLabelTranslator,
  sort: VisitLogSort,
) => {
  return t(`visitLogs.filters.sort.${sort}`);
};

const getVisitLogQuickSortLabel = (
  t: VisitLogLabelTranslator,
  sort: VisitLogSort,
) => {
  return t(`visitLogs.filters.quick.${sort}`);
};

const getVisitLogActiveSortLabel = (
  t: VisitLogLabelTranslator,
  sort: VisitLogSort,
) => {
  return t('visitLogs.filters.active.sort.label', {
    sort: getVisitLogSortLabel(t, sort),
  });
};

export {
  getVisitLogActiveSortLabel,
  getVisitLogPropertyTypeLabel,
  getVisitLogQuickSortLabel,
  getVisitLogSortLabel,
  getVisitLogStatusLabel,
};
export type { VisitLogLabelTranslator };
