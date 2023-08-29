import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Input,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import { ColumnProps } from 'antd/es/table';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [userCpf, setUserCpf] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    fetchUsers({ page, size: 4, sort: ['asc'], userCpf, userName }).catch(
      (err) => {
        if (err?.data?.status === 403) {
          setAccessDeniedError(true);
          return;
        }

        throw err;
      },
    );
  }, [fetchUsers, page, userCpf, userName]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  const getColumnSearchProps = (
    dataIndex: keyof User.PagedModelDetailed,
    displayName?: string,
  ): ColumnProps<User.PagedModelDetailed> => ({
    filterDropdown: ({}) => (
      <Card>
        <Input
          type="text"
          //@ts-ignore
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            let value = e.target.value;
            if (dataIndex === 'cpf') {
              setUserCpf(value);
              return;
            }
            setUserName(value);
          }}
        />
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
  });

  return (
    <WrapperDefault title="Lista de Colaboradores">
      <Table<User.PagedModelDetailed>
        loading={fetching}
        dataSource={users?._embedded?.users}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          {
            title: 'Avatar',
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
          {
            title: 'Nome',
            dataIndex: 'name',
            width: 450,
            ...getColumnSearchProps('name', 'Nome'),
          },
          {
            title: 'CPF',
            dataIndex: 'cpf',
            width: 150,
            ...getColumnSearchProps('cpf', 'CPF'),
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
              return format(new Date(createdAt), 'dd/MM/yyyy - HH:ss');
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
            width: 300,
            render: (_: any, user) => (
              <>
                <Tooltip title={'Editar'}>
                  <Link to={`/colaborador/editar/${user.id}`}>
                    <Button type={'link'} icon={<EditOutlined />} />
                  </Link>
                </Tooltip>

                <DoubleConfirm
                  popConfirmTitle="Remover Colaborador?"
                  popConfirmContent="Deseja mesmo remover este colaborador?"
                  onConfirm={async () => {
                    console.log(user.id);
                    await removeUser(Number(user.id));
                    notification.success({
                      message: 'Sucesso',
                      description: `Tarefa ${user.name}  removida com sucesso`,
                    });
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    <Button type="link">
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </DoubleConfirm>

                <Tooltip title={'Ver Detalhes'}>
                  <Link to={`/colaborador/${user.id}/detalhes`}>
                    <Button type={'link'} icon={<EyeOutlined />} />
                  </Link>
                </Tooltip>
              </>
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
