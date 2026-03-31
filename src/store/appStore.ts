import { create } from 'zustand';

type ThemeMode = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export interface AppSettings {
  apiBaseUrl: string;
  llmModel: string;
  temperature: number;
  maxTokens: number;
  executionTimeout: number;
}

const DEFAULT_SETTINGS: AppSettings = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  llmModel: 'gemini-2.0-flash',
  temperature: 0.3,
  maxTokens: 8192,
  executionTimeout: 120,
};

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem('appSettings');
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { /* ignore corrupt data */ }
  return DEFAULT_SETTINGS;
}

interface AppState {
  selectedProjectPath: string | null;
  selectedProjectId: number | null;
  sidebarCollapsed: boolean;
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  settings: AppSettings;

  setProject: (path: string, id: number) => void;
  clearProject: () => void;
  toggleSidebar: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  initTheme: () => () => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const savedMode = (localStorage.getItem('themeMode') as ThemeMode) || 'system';

export const useAppStore = create<AppState>((set, get) => ({
  selectedProjectPath: null,
  selectedProjectId: null,
  sidebarCollapsed: false,
  themeMode: savedMode,
  resolvedTheme: resolveTheme(savedMode),
  settings: loadSettings(),

  setProject: (path, id) =>
    set({ selectedProjectPath: path, selectedProjectId: id }),

  clearProject: () =>
    set({ selectedProjectPath: null, selectedProjectId: null }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setThemeMode: (mode) => {
    localStorage.setItem('themeMode', mode);
    set({ themeMode: mode, resolvedTheme: resolveTheme(mode) });
  },

  initTheme: () => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (get().themeMode === 'system') {
        set({ resolvedTheme: getSystemTheme() });
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  },

  updateSettings: (patch) => {
    const next = { ...get().settings, ...patch };
    localStorage.setItem('appSettings', JSON.stringify(next));
    set({ settings: next });
  },

  resetSettings: () => {
    localStorage.removeItem('appSettings');
    set({ settings: DEFAULT_SETTINGS });
  },
}));
