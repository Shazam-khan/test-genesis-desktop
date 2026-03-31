import { Segmented } from 'antd';
import { useAppStore } from '../../store/appStore';

export default function ThemeToggle() {
  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);

  return (
    <Segmented
      size="small"
      value={themeMode}
      onChange={(val) => setThemeMode(val as 'system' | 'light' | 'dark')}
      options={[
        { label: '☀️', value: 'light' },
        { label: '🌙', value: 'dark' },
        { label: '💻', value: 'system' },
      ]}
    />
  );
}
