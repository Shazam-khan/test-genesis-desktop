import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  FolderOutlined,
  ExperimentOutlined,
  PlayCircleOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useAppStore } from '../../store/appStore';

const { Sider } = Layout;

const menuItems = [
  { key: '/', icon: <FolderOutlined />, label: 'Projects' },
  { key: '/generate', icon: <ExperimentOutlined />, label: 'Test Generation' },
  { key: '/executions', icon: <PlayCircleOutlined />, label: 'Executions' },
  { key: '/analytics', icon: <BarChartOutlined />, label: 'Analytics' },
  { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleSidebar}
      width={220}
    >
      {/* Branded logo area */}
      <div
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? 0 : '0 20px',
          gap: 10,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <ExperimentOutlined style={{ fontSize: 22, color: '#a5b4fc' }} />
        {!collapsed && (
          <Typography.Text
            strong
            style={{ color: '#e0e7ff', fontSize: 15, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}
          >
            Test Genesis
          </Typography.Text>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ marginTop: 8 }}
      />

      {/* Version badge at bottom */}
      {!collapsed && (
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '8px 0',
          }}
        >
          <Typography.Text style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
            v1.0.0
          </Typography.Text>
        </div>
      )}
    </Sider>
  );
}
