import { describe, expect, it, vi } from 'vitest';
import { detectLanguage, persistLanguage } from './i18n';

describe('i18n helpers', () => {
  it('prefers a stored language when it is supported', () => {
    expect(
      detectLanguage({
        localStorage: {
          getItem: vi.fn().mockReturnValue('ko'),
          setItem: vi.fn(),
        },
        navigator: { language: 'en-US' },
      }),
    ).toBe('ko');
  });

  it('falls back to the browser language when no stored language exists', () => {
    expect(
      detectLanguage({
        localStorage: {
          getItem: vi.fn().mockReturnValue(null),
          setItem: vi.fn(),
        },
        navigator: { language: 'ko-KR' },
      }),
    ).toBe('ko');
  });

  it('falls back to English when runtime objects are unavailable', () => {
    expect(detectLanguage({})).toBe('en');
  });

  it('stores a changed language when storage is available', () => {
    const setItem = vi.fn();

    persistLanguage('ko', { setItem });

    expect(setItem).toHaveBeenCalledWith('fe-estate-log-language', 'ko');
  });
});
