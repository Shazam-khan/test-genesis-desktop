import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme as antTheme } from 'antd';
import AppLayout from './components/layout/AppLayout';
import ProjectPage from './pages/ProjectPage';
import GenerationPage from './pages/GenerationPage';
import ExecutionsPage from './pages/ExecutionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import { useAppStore } from './store/appStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const resolvedTheme = useAppStore((s) => s.resolvedTheme);
  const initTheme = useAppStore((s) => s.initTheme);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => initTheme(), [initTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#6366f1',
            colorSuccess: '#10b981',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            colorInfo: '#6366f1',
            borderRadius: 8,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            colorBgContainer: isDark ? '#18181b' : '#ffffff',
            colorBgLayout: isDark ? '#0f0f13' : '#f5f5f7',
            colorBorderSecondary: isDark ? '#2e2e35' : '#e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
            boxShadowSecondary: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
          },
          components: {
            Card: {
              borderRadiusLG: 12,
              paddingLG: 20,
            },
            Button: {
              fontWeight: 500,
              borderRadius: 8,
              controlHeight: 36,
              controlHeightLG: 44,
            },
            Menu: {
              itemBorderRadius: 8,
              itemMarginInline: 8,
            },
            Table: {
              borderRadius: 12,
              headerBorderRadius: 12,
            },
            Tag: {
              borderRadiusSM: 99,
            },
            Steps: {
              colorPrimary: '#6366f1',
            },
            Input: {
              borderRadius: 8,
              controlHeight: 36,
            },
            Select: {
              borderRadius: 8,
            },
          },
        }}
      >
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<ProjectPage />} />
              <Route path="/generate" element={<GenerationPage />} />
              <Route path="/executions" element={<ExecutionsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
