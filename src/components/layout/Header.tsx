import { useEffect, useState } from 'react';
import { Layout, Badge, Typography, Space, theme } from 'antd';
import { ApiOutlined } from '@ant-design/icons';
import { checkBackendHealth } from '../../services/api';
import { useAppStore } from '../../store/appStore';
import ThemeToggle from '../common/ThemeToggle';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export default function Header() {
  const [backendOnline, setBackendOnline] = useState(false);
  const selectedProjectPath = useAppStore((s) => s.selectedProjectPath);
  const { token } = theme.useToken();

  useEffect(() => {
    const check = () => checkBackendHealth().then(setBackendOnline);
    check();
    const interval = setInterval(check, 15000);
    return () => clearInterval(interval);
  }, []);

  const projectName = selectedProjectPath
    ? selectedProjectPath.split(/[/\\]/).filter(Boolean).pop()
    : null;

  return (
    <AntHeader
      style={{
        background: token.colorBgContainer,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        height: 48,
        lineHeight: '48px',
      }}
    >
      <Space>
        <Text strong style={{ fontSize: 16 }}>Test Genesis</Text>
        {projectName && (
          <Text type="secondary" style={{ marginLeft: 16 }}>
            / {projectName}
          </Text>
        )}
      </Space>

      <Space size="middle">
        <ThemeToggle />
        <Space>
          <Badge status={backendOnline ? 'success' : 'error'} />
          <ApiOutlined />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {backendOnline ? 'Backend Connected' : 'Backend Offline'}
          </Text>
        </Space>
      </Space>
    </AntHeader>
  );
}
