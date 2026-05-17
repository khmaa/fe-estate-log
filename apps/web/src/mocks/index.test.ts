import { beforeEach, describe, expect, it, vi } from 'vitest';
import { enableMocking, shouldEnableMocking } from './index';

const start = vi.fn();

vi.mock('./browser', () => ({
  worker: {
    start,
  },
}));

describe('mock browser worker setup', () => {
  beforeEach(() => {
    start.mockClear();
    vi.stubEnv('VITE_ENABLE_MSW', 'false');
  });

  it('enables browser mocking only when the explicit env flag is true', () => {
    expect(shouldEnableMocking({ VITE_ENABLE_MSW: 'true' })).toBe(true);
    expect(shouldEnableMocking({ VITE_ENABLE_MSW: 'false' })).toBe(false);
    expect(shouldEnableMocking({ VITE_ENABLE_MSW: undefined })).toBe(false);
  });

  it('skips the browser worker when mocking is disabled', async () => {
    await enableMocking();

    expect(start).not.toHaveBeenCalled();
  });

  it('starts the browser worker when mocking is enabled', async () => {
    vi.stubEnv('VITE_ENABLE_MSW', 'true');

    await enableMocking();

    expect(start).toHaveBeenCalledWith({
      onUnhandledRequest: 'bypass',
    });
  });
});
