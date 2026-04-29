import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

const DEV_MODE_KEY = 'tdp-developer-mode';
const FONT_SIZE_KEY = 'tdp-font-size';
const DARK_MODE_KEY = 'tdp-dark-mode';

interface SettingsState {
  developerMode: boolean;
  setDeveloperMode: (enabled: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsContext = createContext<SettingsState | null>(null);

function readBool(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key);
    return v != null ? v === 'true' : fallback;
  } catch {
    return fallback;
  }
}

function readNumber(key: string, fallback: number): number {
  try {
    const v = localStorage.getItem(key);
    return v != null ? Number(v) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* noop */ }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [developerMode, setDevModeRaw] = useState(() => readBool(DEV_MODE_KEY, false));
  const [fontSize, setFontSizeRaw] = useState(() => readNumber(FONT_SIZE_KEY, 100));
  const [darkMode, setDarkModeRaw] = useState(() => readBool(DARK_MODE_KEY, false));

  const setDeveloperMode = useCallback((enabled: boolean) => {
    setDevModeRaw(enabled);
    persist(DEV_MODE_KEY, String(enabled));
  }, []);

  const setFontSize = useCallback((size: number) => {
    setFontSizeRaw(size);
    persist(FONT_SIZE_KEY, String(size));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkModeRaw((prev) => {
      const next = !prev;
      persist(DARK_MODE_KEY, String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle('pf-v6-theme-dark', darkMode);
  }, [darkMode]);

  return (
    <SettingsContext.Provider value={{ developerMode, setDeveloperMode, fontSize, setFontSize, darkMode, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsState {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
