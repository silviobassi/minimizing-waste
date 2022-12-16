import {
  ExportOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, theme } from 'antd';
import BreadcrumbLayout from './BreadcrumbLayout';
const { Header } = Layout;

export default function HeaderLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: '0 35px',
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <BreadcrumbLayout />
      <div
        style={{
          width: 170,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a href="#">
          <Badge count={5}>
            <Avatar
              shape="square"
              size="large"
              style={{ background: '#f5f5f5', color: '#001529' }}
              icon={<NotificationOutlined />}
            />
          </Badge>
        </a>
        <div>
          <Avatar
            shape="square"
            size="large"
            style={{
              background: '#f5f5f5',
              color: '#001529',
              cursor: 'pointer',
            }}
            icon={<UserOutlined />}
          />
        </div>
        <Button
          size="large"
          shape="default"
          icon={<ExportOutlined />}
          style={{
            background: '#f5f5f5',
            color: '#001529',
            border: 'none',
          }}
        />
      </div>
    </Header>
  );
}
