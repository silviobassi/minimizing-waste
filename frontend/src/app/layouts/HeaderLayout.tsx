import {
  EditOutlined,
  InfoCircleFilled,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Layout,
  MenuProps,
  Modal,
  Space,
  Tag,
  Typography,
  theme,
} from 'antd';
import { Link } from 'react-router-dom';
import AuthService from '../../auth/Authorization.service';
import useAuth from '../../core/hooks/useAuth';
const { Header } = Layout;

export default function HeaderLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { userAuth } = useAuth();

  const [modal, contextHolder] = Modal.useModal();

  const elementColor = '#727272';

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography.Title level={5}>
          {userAuth?.name.toUpperCase()}
        </Typography.Title>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <Typography.Text>NÍVEL DE ACESSO</Typography.Text>
        </>
      ),
    },
    {
      key: '3',
      label: <Tag color="blue">{userAuth?.role?.name}</Tag>,
    },
    {
      key: '4',
      label: <Divider style={{ margin: '15px 0' }} />,
    },
    {
      key: '5',
      label: (
        <Link
          to={`/colaborador/editar/${userAuth?.id}`}
          style={{ color: elementColor }}
        >
          <Space direction="horizontal">
            <EditOutlined />
            Alterar a Imagem do Perfil
          </Space>
        </Link>
      ),
    },

    {
      key: '6',
      label: (
        <Link to={`/user/alteracao-de-senha`} style={{ color: elementColor }}>
          <Space direction="horizontal">
            <KeyOutlined />
            Alterar Senha
          </Space>
        </Link>
      ),
    },
    {
      key: '8',
      label: (
        <Space direction="horizontal">
          <Button
            type="link"
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
            style={{
              border: 'none',
              color: elementColor,
              padding: 0,
            }}
          >
            <LogoutOutlined />
            Sair
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Header

      style={{
        padding: 0,
        background: "#E6EBF0",
        position: 'sticky',
        top: 0,
        zIndex: 99,
      
      }}
    >
      <div
        style={{
          display: 'flex',
          marginTop: 12,
          justifyContent: 'end',
          alignItems: 'center',
          gap: 30,
        }}
      >
        <Typography.Text>{userAuth?.name}</Typography.Text>

        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Avatar size={'large'} src={userAuth?.avatarUrl}>
            <UserOutlined />
          </Avatar>
        </Dropdown>

        <div>{contextHolder}</div>
      </div>
    </Header>
  );
}
