import {
  ApartmentOutlined,
  BankOutlined,
  HomeOutlined,
  NotificationOutlined,
  PrinterOutlined,
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
      className: 'border-line-menu-item',
    },

    {
      label: <Link to={'/setores'}>Setores</Link>,
      key: 'sectors',
      icon: <BankOutlined />,
      className: 'border-line-menu-item',
    },
    {
      label: <Link to={'/estacoes-de-trabalho'}>Estação de Trabalho</Link>,
      key: 'work stations',
      icon: <ApartmentOutlined />,
      className: 'border-line-menu-item',
    },

    {
      label: <Link to={'/recursos'}>Recursos</Link>,
      key: 'supply',
      icon: <PrinterOutlined />,
      className: 'border-line-menu-item',
    },

    {
      label: <Link to={'/tarefas'}>Tarefas</Link>,
      key: 'tasks',
      icon: <BankOutlined />,
      className: 'border-line-menu-item',
    },
    {
      label: <Link to={'/colaboradores'}>Colaboradores</Link>,
      key: 'users',
      icon: <UsergroupAddOutlined />,
      className: 'border-line-menu-item',
    },
    {
      label: <Link to={'/notificacoes'}>Notificações</Link>,
      key: 'notification',
      icon: <NotificationOutlined />,
      className: 'border-line-menu-item',
    },
  ];

  return (
    <Menu
      style={{ minHeight: '100%', paddingTop: 20 }}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['4']}
      items={items}
    />
  );
}
