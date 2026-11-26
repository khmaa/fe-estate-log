import { describe, expect, it } from 'vitest';
import { formatVisitLogVisitedAt } from './formatVisitLogVisitedAt';

describe('formatVisitLogVisitedAt', () => {
  it.each([
    ['en', 'Mar 27, 2026'],
    ['ko', '2026년 3월 27일'],
    [undefined, 'Mar 27, 2026'],
  ])('formats visit dates for language %s', (language, formattedDate) => {
    expect(formatVisitLogVisitedAt('2026-03-27T10:30:00.000Z', language)).toBe(
      formattedDate,
    );
  });
});
