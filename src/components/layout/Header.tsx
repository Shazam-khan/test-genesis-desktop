import { useEffect, useState } from 'react';
import { Layout, Typography, Space, Tag, theme } from 'antd';
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
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  const projectName = selectedProjectPath
    ? selectedProjectPath.split(/[/\\]/).filter(Boolean).pop()
    : null;

  return (
    <AntHeader
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--glass-border)',
        height: 52,
        lineHeight: '52px',
        zIndex: 10,
      }}
    >
      <Space size="middle" align="center">
        <Text strong style={{ fontSize: 16, letterSpacing: '-0.3px' }} className="gradient-text">
          Test Genesis
        </Text>
        {projectName && (
          <Tag
            style={{
              background: 'rgba(99, 102, 241, 0.08)',
              borderColor: 'rgba(99, 102, 241, 0.2)',
              color: token.colorPrimary,
              fontWeight: 500,
            }}
          >
            {projectName}
          </Tag>
        )}
      </Space>

      <Space size="middle" align="center">
        <ThemeToggle />
        <Space size={8} align="center">
          <span className={`status-dot ${backendOnline ? 'online' : 'offline'}`} />
          <ApiOutlined style={{ fontSize: 14, color: token.colorTextSecondary }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {backendOnline ? 'Connected' : 'Offline'}
          </Text>
        </Space>
      </Space>
    </AntHeader>
  );
}
