import { ExportOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, theme } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { Link } from 'react-router-dom';
import AuthService from '../../auth/Authorization.service';
import useAuth from '../../core/hooks/useAuth';
import useAuthPhoto from '../../core/hooks/useAuthPhoto';
import BreadcrumbLayout from './BreadcrumbLayout';
const { Header } = Layout;

export default function HeaderLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuth();
  const { photo } = useAuthPhoto();

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
          <Link to={`/colaborador/${user?.id}/detalhes`}>
            <Avatar
              size="large"
              style={{
                background: '#f5f5f5',
                color: '#001529',
                cursor: 'pointer',
              }}
              icon={<UserOutlined />}
              src={photo?.avatarUrl}
            />
          </Link>
        </div>
        <Button
          onClick={() =>
            confirm({
              title: 'Fazer Logout',
              content:
                'Deseja realmente fazer o logout? Será necessário inserir as credenciais novamente!',
              onOk() {
                AuthService.imperativelySendToLogout();
              },
            })
          }
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
