import { ExportOutlined, InfoCircleFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Modal, theme } from 'antd';
import AuthService from '../../auth/Authorization.service';
import useAuth from '../../core/hooks/useAuth';
import BreadcrumbLayout from './BreadcrumbLayout';
const { Header } = Layout;

export default function HeaderLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { userAuth } = useAuth();

  const [modal, contextHolder] = Modal.useModal();

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
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 30
        }}
      >
        <Avatar size={'large'} src={userAuth?.avatarUrl}><UserOutlined /></Avatar>
        <Button
          onClick={() =>
            modal.confirm({
              icon: <InfoCircleFilled style={{ color: '#4096FF' }} />,
              title: 'Fazer Logout',
              content:
                'Deseja realmente fazer o logout? Será necessário inserir as credenciais novamente!',
              onOk() {
                AuthService.imperativelySendToLogout();
              },
              onCancel() {},
              closable: true,
              okButtonProps: { danger: true },
              cancelButtonProps: { color: '#001529' },
              okText: 'Fazer Logout',
              cancelText: 'Permanecer Logado',
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

        <div>{contextHolder}</div>
      </div>
    </Header>
  );
}
