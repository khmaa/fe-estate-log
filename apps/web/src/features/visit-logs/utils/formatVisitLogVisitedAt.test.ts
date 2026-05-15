import { describe, expect, it } from 'vitest';
import { formatVisitLogVisitedAt } from './formatVisitLogVisitedAt';

describe('formatVisitLogVisitedAt', () => {
  it('formats visit log visited dates for detail metadata', () => {
    expect(formatVisitLogVisitedAt('2026-03-27T10:30:00.000Z')).toBe(
      'Mar 27, 2026',
    );
  });
});
