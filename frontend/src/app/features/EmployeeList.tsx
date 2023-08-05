import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag, Tooltip, notification } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    fetchUsers(page).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchUsers, page]);

  if (accessDeniedError) return <AccessDenied />;

  return (
    <WrapperDefault title="Lista de Colaboradores">
      <Table<User.PagedModelDetailed>
        loading={fetching}
        dataSource={users?._embedded?.users}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
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
            title: 'Tipo de Usuário',
            dataIndex: 'accessGroups',
            width: 180,
            render(accessGroups: User.AccessGroupSummary[]) {
              return (
                <>
                  {accessGroups.map((group: User.AccessGroupSummary, index) => (
                    <Tag
                      key={index}
                      color={group.name === 'Administrador' ? 'blue' : 'green'}
                    >
                      {group.name}
                    </Tag>
                  ))}
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
                    <Button type={'link'} icon={<EditOutlined />} />
                  </Link>
                </Tooltip>

                <DoubleConfirm
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
