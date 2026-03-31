import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
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
  const resolvedTheme = useAppStore((s) => s.resolvedTheme);
  const { token } = theme.useToken();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleSidebar}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      style={{ borderRight: `1px solid ${token.colorBorderSecondary}` }}
      width={200}
    >
      <div
        style={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <ExperimentOutlined style={{ fontSize: 24, color: token.colorPrimary }} />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
}
