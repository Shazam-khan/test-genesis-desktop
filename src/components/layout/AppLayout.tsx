import { Layout, theme } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;

export default function AppLayout() {
  const { token } = theme.useToken();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content
          key={location.pathname}
          className="page-enter"
          style={{
            margin: 16,
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: 12,
            overflow: 'auto',
            boxShadow: 'var(--surface-shadow)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
