import { describe, expect, it } from 'vitest';
import {
  getVisitLogActiveSortLabel,
  getVisitLogQuickSortLabel,
  getVisitLogSortLabel,
  type VisitLogLabelTranslator,
} from './visitLogLabels';

const dictionary = {
  'visitLogs.filters.active.sort.label': ({ sort }: { sort: string }) =>
    `Sort: ${sort}`,
  'visitLogs.filters.quick.district': () => 'District',
  'visitLogs.filters.quick.latest': () => 'Latest',
  'visitLogs.filters.quick.oldest': () => 'Oldest',
  'visitLogs.filters.sort.district': () => 'District',
  'visitLogs.filters.sort.latest': () => 'Latest visit',
  'visitLogs.filters.sort.oldest': () => 'Oldest visit',
} as const;

const t: VisitLogLabelTranslator = (key, options) => {
  const resolver = dictionary[key as keyof typeof dictionary] as (
    args: Record<string, string | number>,
  ) => string;
  return resolver(options ?? {});
};

describe('visitLogLabels', () => {
  it('returns full sort labels for select and active filter copy', () => {
    expect(getVisitLogSortLabel(t, 'latest')).toBe('Latest visit');
    expect(getVisitLogSortLabel(t, 'oldest')).toBe('Oldest visit');
    expect(getVisitLogActiveSortLabel(t, 'district')).toBe('Sort: District');
  });

  it('returns compact quick sort labels', () => {
    expect(getVisitLogQuickSortLabel(t, 'latest')).toBe('Latest');
    expect(getVisitLogQuickSortLabel(t, 'oldest')).toBe('Oldest');
    expect(getVisitLogQuickSortLabel(t, 'district')).toBe('District');
  });
});
