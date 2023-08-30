import {
  ApartmentOutlined,
  BankOutlined,
  FormOutlined,
  HomeOutlined,
  KeyOutlined,
  LockOutlined,
  NotificationOutlined,
  RetweetOutlined,
  StockOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export default function MenuLayout() {
  const items = [
    {
      label: <Link to={'/'}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={'/setores'}>Setores</Link>,
      key: 'sectors',
      icon: <ApartmentOutlined />,
    },
    {
      label: <Link to={'/estacoes-de-trabalho'}>Estações de Trabalho</Link>,
      key: 'work stations',
      icon: <ApartmentOutlined />,
    },

    {
      label: <Link to={'/recursos'}>Recursos</Link>,
      key: 'supply',
      icon: <StockOutlined />,
    },
    {
      label: <Link to={'/movimento-recursos'}>Movimento Recursos</Link>,
      key: 'supply-movement',
      icon: <RetweetOutlined />,
    },

    {
      label: <Link to={'/tarefas'}>Tarefas</Link>,
      key: 'tasks',
      icon: <FormOutlined />,
    },
    {
      label: <Link to={'/colaboradores'}>Colaboradores</Link>,
      key: 'users',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={'/notificacoes'}>Notificações</Link>,
      key: 'notification',
      icon: <NotificationOutlined />,
    },

    {
      label: 'Controle de Acessos',
      key: 'access-profile',
      icon: <LockOutlined />,
      children: [
        {
          label: <Link to={'/perfis-de-acesso'}>Perfis de Acesso</Link>,
          key: '1',
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <Link to={'/conceder-permissoes/perfis-de-acesso'}>
              Conceder Permissões
            </Link>
          ),
          key: '2',
          icon: <KeyOutlined />,
        },
        {
          label: (
            <Link to={'/revogar-permissoes/perfis-de-acesso'}>
              Revogar Permissão
            </Link>
          ),
          key: '3',
          icon: <LockOutlined />,
        },
        {
          label: (
            <Link to={'/conceder-roles/perfis-de-acesso'}>Conceder Acesso</Link>
          ),
          key: '4',
          icon: <KeyOutlined />,
        },
        {
          label: (
            <Link to={'/revogar-roles/perfis-de-acesso'}>Revogar Acesso</Link>
          ),
          key: '5',
          icon: <LockOutlined />,
        },
      ],
    },
  ];

  return (
    
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
        />
  );
}
