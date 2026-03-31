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
            colorPrimary: '#1890ff',
            borderRadius: 6,
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
