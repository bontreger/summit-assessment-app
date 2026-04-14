import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'tdp-developer-mode';

interface SettingsState {
  developerMode: boolean;
  setDeveloperMode: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsState | null>(null);

function readStoredValue(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [developerMode, setDevMode] = useState(readStoredValue);

  const setDeveloperMode = useCallback((enabled: boolean) => {
    setDevMode(enabled);
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch { /* noop */ }
  }, []);

  return (
    <SettingsContext.Provider value={{ developerMode, setDeveloperMode }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsState {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
