export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'tajaddod-theme';
export const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const THEME_CHANGE_EVENT = 'tajaddod:theme-change';
export const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: '#f6f9fa',
  dark: '#02090d',
};

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface MediaQueryLike {
  matches: boolean;
  addEventListener(type: 'change', listener: (event: { matches: boolean }) => void): void;
  removeEventListener(type: 'change', listener: (event: { matches: boolean }) => void): void;
}

export const isThemePreference = (value: unknown): value is ThemePreference =>
  value === 'light' || value === 'dark' || value === 'system';

export const getPreference = (storage?: StorageLike | null): ThemePreference => {
  if (!storage) return 'system';
  try {
    const stored = storage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
};

export const resolveTheme = (
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ResolvedTheme => {
  if (preference === 'light' || preference === 'dark') return preference;
  return systemPrefersDark ? 'dark' : 'light';
};

export const subscribeToSystemTheme = (
  mediaQuery: MediaQueryLike,
  readPreference: () => ThemePreference,
  onResolvedTheme: (theme: ResolvedTheme) => void,
): (() => void) => {
  const listener = (event: { matches: boolean }) => {
    if (readPreference() !== 'system') return;
    onResolvedTheme(resolveTheme('system', event.matches));
  };

  mediaQuery.addEventListener('change', listener);
  return () => mediaQuery.removeEventListener('change', listener);
};

const updateThemeColor = (theme: ResolvedTheme): void => {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  meta?.setAttribute('content', THEME_COLORS[theme]);
};

const syncControls = (preference: ThemePreference, resolved: ResolvedTheme): void => {
  document.querySelectorAll<HTMLInputElement>('[data-theme-option]').forEach((control) => {
    const active = control.value === preference;
    control.checked = active;
    control.closest('label')?.toggleAttribute('data-active', active);
  });

  document.querySelectorAll<HTMLElement>('[data-theme-current]').forEach((label) => {
    label.textContent = preference;
  });

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.dataset.resolvedTheme = resolved;
    button.setAttribute('aria-pressed', String(resolved === 'dark'));
  });
};

export const applyTheme = (
  preference: ThemePreference,
  systemPrefersDark = window.matchMedia(THEME_MEDIA_QUERY).matches,
): ResolvedTheme => {
  const resolved = resolveTheme(preference, systemPrefersDark);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  updateThemeColor(resolved);
  syncControls(preference, resolved);
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, {
    detail: { preference, resolved },
  }));
  return resolved;
};

export const setPreference = (
  preference: ThemePreference,
  storage: StorageLike = window.localStorage,
): ResolvedTheme => {
  try {
    storage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // The theme still applies for this page when storage is unavailable.
  }
  return applyTheme(preference);
};

export const initializeTheme = (): (() => void) => {
  const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);
  const readPreference = () => getPreference(window.localStorage);
  const applyCurrentPreference = () => applyTheme(readPreference(), mediaQuery.matches);

  applyCurrentPreference();

  document.querySelectorAll<HTMLInputElement>('[data-theme-option]').forEach((control) => {
    control.addEventListener('change', () => {
      if (control.checked && isThemePreference(control.value)) {
        setPreference(control.value);
        control.closest<HTMLDetailsElement>('details')?.removeAttribute('open');
      }
    });
  });

  document.querySelectorAll<HTMLDetailsElement>('.theme-menu').forEach((menu) => {
    const summary = menu.querySelector<HTMLElement>('summary');
    summary?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      menu.open = !menu.open;
    });
    menu.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      menu.open = false;
      summary?.focus();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextPreference: ThemePreference =
        document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      setPreference(nextPreference);
    });
  });

  const unsubscribe = subscribeToSystemTheme(
    mediaQuery,
    readPreference,
    () => applyCurrentPreference(),
  );

  requestAnimationFrame(() => {
    document.documentElement.dataset.themeReady = '';
  });

  return unsubscribe;
};
