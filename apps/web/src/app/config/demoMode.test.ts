import { describe, expect, it } from 'vitest';
import { isDemoModeEnabled } from './demoMode';

describe('isDemoModeEnabled', () => {
  it('enables demo mode when the MSW env flag is true', () => {
    expect(isDemoModeEnabled({ VITE_ENABLE_MSW: 'true' })).toBe(true);
  });

  it('disables demo mode when the MSW env flag is not true', () => {
    expect(isDemoModeEnabled({ VITE_ENABLE_MSW: 'false' })).toBe(false);
    expect(isDemoModeEnabled({ VITE_ENABLE_MSW: undefined })).toBe(false);
  });
});
