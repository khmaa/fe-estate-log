import { describe, expect, it, vi } from 'vitest';
import { detectLanguage, persistLanguage } from './i18n';
import { resources } from './i18n/resources';

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

  it('merges split locale files into the default translation namespace', () => {
    expect(resources.en.translation.app.nav.visitLogs).toBe('Visit Logs');
    expect(resources.en.translation.notFound.title).toBe('Page not found');
    expect(resources.en.translation.showcase.hero.title).toBe(
      'Shared UI Showcase',
    );
    expect(resources.en.translation.visitLogs.page.title).toBe(
      'Visit logs workspace',
    );
  });
});
