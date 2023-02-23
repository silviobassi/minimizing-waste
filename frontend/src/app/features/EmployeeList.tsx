import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsers from '../../core/hooks/useUsers';
import { User } from '../../sdk/@types';
import WrapperDefault from '../components/WrapperDefault';

export default function EmployeeList() {
  const { users, fetchUsers } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <WrapperDefault title="Lista de Colaboradores">
      <Table<User.CollectionDetailed>
        pagination={false}
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
            dataIndex: 'actions',
            align: 'center',
            width: 200,
            render: (_: any, employee) => (
              <Space size={'middle'}>
                <Tooltip title={'Editar'}>
                  <Button type={'link'} icon={<EditOutlined />} />
                </Tooltip>
                <Tooltip title={'Excluir'}>
                  <Button type={'link'} icon={<DeleteOutlined />} />
                </Tooltip>
                <Tooltip title={'Ver Detalhes'}>
                  <Button type={'link'} icon={<EyeOutlined />} />
                </Tooltip>
              </Space>
            ),
          },
        ]}
        rowKey="id"
      />
    </WrapperDefault>
  );
}
