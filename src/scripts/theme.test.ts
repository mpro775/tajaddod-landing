import { describe, expect, it, vi } from 'vitest';
import {
  THEME_STORAGE_KEY,
  getPreference,
  resolveTheme,
  subscribeToSystemTheme,
  type MediaQueryLike,
  type ThemePreference,
} from './theme';

const storageWith = (value: string | null) => ({
  getItem: vi.fn(() => value),
  setItem: vi.fn(),
});

const mediaQuery = (matches = false) => {
  let listener: ((event: { matches: boolean }) => void) | undefined;
  const media: MediaQueryLike = {
    matches,
    addEventListener: vi.fn((_type, nextListener) => {
      listener = nextListener;
    }),
    removeEventListener: vi.fn(),
  };
  return {
    media,
    emit(nextMatches: boolean) {
      listener?.({ matches: nextMatches });
    },
  };
};

describe('theme preference contract', () => {
  it('uses system light when no preference is stored', () => {
    expect(resolveTheme(getPreference(storageWith(null)), false)).toBe('light');
  });

  it('uses system dark when no preference is stored', () => {
    expect(resolveTheme(getPreference(storageWith(null)), true)).toBe('dark');
  });

  it.each([
    ['light', false, 'light'],
    ['light', true, 'light'],
    ['dark', false, 'dark'],
    ['dark', true, 'dark'],
    ['system', false, 'light'],
    ['system', true, 'dark'],
  ] as const)('resolves stored %s with systemDark=%s to %s', (stored, systemDark, expected) => {
    const storage = storageWith(stored);
    expect(getPreference(storage)).toBe(stored);
    expect(resolveTheme(stored, systemDark)).toBe(expected);
    expect(storage.getItem).toHaveBeenCalledWith(THEME_STORAGE_KEY);
  });

  it('falls back safely for an invalid stored value or unavailable storage', () => {
    expect(getPreference(storageWith('sepia'))).toBe('system');
    expect(getPreference({
      getItem: () => {
        throw new Error('storage unavailable');
      },
      setItem: vi.fn(),
    })).toBe('system');
  });
});

describe('system theme subscription', () => {
  it('applies live system changes while the preference is system', () => {
    const query = mediaQuery();
    const applied = vi.fn();
    const unsubscribe = subscribeToSystemTheme(query.media, () => 'system', applied);

    query.emit(true);
    query.emit(false);

    expect(applied.mock.calls.map(([theme]) => theme)).toEqual(['dark', 'light']);
    unsubscribe();
    expect(query.media.removeEventListener).toHaveBeenCalledOnce();
  });

  it('does not override a manual dark preference when the system changes', () => {
    const query = mediaQuery();
    const applied = vi.fn();
    let preference: ThemePreference = 'dark';
    subscribeToSystemTheme(query.media, () => preference, applied);

    query.emit(false);
    expect(applied).not.toHaveBeenCalled();

    preference = 'system';
    query.emit(true);
    expect(applied).toHaveBeenCalledWith('dark');
  });
});
