import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUsers from '../../core/hooks/useUsers';
import { User } from '../../sdk/@types';
import WrapperDefault from '../components/WrapperDefault';

export default function EmployeeList() {
  const { users, fetchUsers, fetching } = useUsers();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <WrapperDefault title="Lista de Colaboradores">
      <Table<User.PagedModelDetailed>
        loading={fetching}
        rowKey={'id'}
        dataSource={users?._embedded?.users}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: 'Nome', dataIndex: 'name', width: 450 },
          { title: 'CPF', dataIndex: 'cpf', width: 150 },
          { title: 'WhatsApp', dataIndex: 'whatsApp', width: 270 },
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
                  {accessGroups.map((group: User.AccessGroupSummary) => (
                    <Tag
                      color={group.name === 'Administrador' ? 'red' : 'blue'}
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
            render: (id) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Link to={`/colaborador/editar/${id}`}>
                    <Button type={'link'} icon={<EditOutlined />} />
                  </Link>
                </Tooltip>
                <Tooltip title={'Excluir'}>
                  <Button type={'link'} icon={<DeleteOutlined />} />
                </Tooltip>
                <Tooltip title={'Ver Detalhes'}>
                  <Link to={`/colaborador/${id}/detalhes`}>
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
          pageSize: 5,
        }}
      />
    </WrapperDefault>
  );
}
