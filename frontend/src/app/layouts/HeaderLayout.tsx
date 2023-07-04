import { ExportOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, theme } from 'antd';
import { useEffect, useState } from 'react';
import useAuth from '../../core/hooks/useAuth';
import useUserPhoto from '../../core/hooks/useUserPhoto';
import BreadcrumbLayout from './BreadcrumbLayout';
const { Header } = Layout;

export default function HeaderLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user, fetching } = useAuth();
  const { userPhoto, fetchUserPhoto } = useUserPhoto();
  const [userId, setUserId] = useState<number>();

  useEffect(() => {}, []);

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
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: 20 }}>
          <Avatar
            size="large"
            style={{
              background: '#f5f5f5',
              color: '#001529',
            }}
            icon={<UserOutlined />}
            src={''}
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
