import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Space, Table, Tag, Tooltip, notification } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import useUser from '../../core/hooks/useUser';
import useUsers from '../../core/hooks/useUsers';
import { User } from '../../sdk/@types';
import {
  cpfToFormat,
  phoneToFormat,
} from '../../sdk/utils/generateFormatterData';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function EmployeeList() {
  const { users, fetchUsers, fetching } = useUsers();
  const [page, setPage] = useState<number>(0);
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const { removeUser } = useUser();
  const { userAuth } = useAuth();

  useEffect(() => {
    fetchUsers({ page, size: 4, sort: ['asc'] }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchUsers, page]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  return (
    <WrapperDefault title="Lista de Colaboradores">
      <Table<User.PagedModelDetailed>
        loading={fetching}
        dataSource={users?._embedded?.users}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          {
            title: 'CPF',
            dataIndex: 'avatarUrl',
            width: 60,
            render(avatarUrl: string) {
              return (
                <Avatar src={avatarUrl}>
                  <UserOutlined />
                </Avatar>
              );
            },
          },
          { title: 'Nome', dataIndex: 'name', width: 450 },
          {
            title: 'CPF',
            dataIndex: 'cpf',
            width: 150,
            render(cpf: string) {
              return cpfToFormat(cpf);
            },
          },
          {
            title: 'WhatsApp',
            dataIndex: 'whatsApp',
            width: 270,
            render(whatsApp: string) {
              return phoneToFormat(whatsApp);
            },
          },
          {
            title: 'Criação',
            dataIndex: 'createdAt',
            width: 270,
            render(createdAt: string) {
              return format(new Date(createdAt), 'dd/MM/yyyy');
            },
          },
          {
            title: 'Nível de Acesso',
            dataIndex: 'role',
            width: 180,
            render(_: any, user: User.Detailed) {
              return (
                <>
                  {user?.role?.name ? (
                    <Tag color="blue">{user?.role?.name.toUpperCase()}</Tag>
                  ) : (
                    <Tag color="red">{'sem acesso'.toUpperCase()}</Tag>
                  )}
                </>
              );
            },
          },
          {
            title: 'Ações',
            dataIndex: 'id',
            align: 'center',
            width: 200,
            render: (_: any, user) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Link to={`/colaborador/editar/${user.id}`}>
                    <Button
                      disabled={!hasPermission('EDIT_USER', userAuth)}
                      type={'link'}
                      icon={<EditOutlined />}
                    />
                  </Link>
                </Tooltip>

                <DoubleConfirm
                  deactivatePermission={!hasPermission('EDIT_USER', userAuth)}
                  popConfirmTitle="Remover Colaborador?"
                  popConfirmContent="Deseja mesmo remover este colaborador?"
                  onConfirm={async () => {
                    await removeUser(Number(user.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Tarefa ${user.name}  removida com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button
                      disabled={!hasPermission('EDIT_USER', userAuth)}
                      type="link"
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </DoubleConfirm>

                <Tooltip title={'Ver Detalhes'}>
                  <Link to={`/colaborador/${user.id}/detalhes`}>
                    <Button
                      disabled={!hasPermission('CONSULT_USER', userAuth)}
                      type={'link'}
                      icon={<EyeOutlined />}
                    />
                  </Link>
                </Tooltip>
              </Space>
            ),
          },
        ]}
        pagination={{
          onChange: (page: number) => setPage(page - 1),
          total: users?.page?.totalElements,
          pageSize: 4,
        }}
      />
    </WrapperDefault>
  );
}
