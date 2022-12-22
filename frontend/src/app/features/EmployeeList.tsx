import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { User } from '../../@types/User';
import WrapperDefault from '../components/WrapperDefault';

export default function EmployeeList() {
  const navigate = useNavigate();

  const columns: ColumnsType<User.Summary> = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Nome', dataIndex: 'name', responsive: ['sm'] },
    { title: 'CPF', dataIndex: 'cpf', width: 150 },
    { title: 'WhatsApp', dataIndex: 'whatsApp', width: 270 },
    {
      title: 'Tipo de Usuário',
      dataIndex: 'group',
      width: 180,
      render(group) {
        return (
          <Tag color={group === 'ADMINISTRADOR' ? 'red' : 'blue'}>{group}</Tag>
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
            <Button
              type={'link'}
              icon={<EditOutlined />}
              onClick={() => navigate(`/colaborador/editar/${employee.id}`)}
            />
          </Tooltip>
          <Tooltip title={'Excluir'}>
            <Button type={'link'} icon={<DeleteOutlined />} />
          </Tooltip>
          <Tooltip title={'Ver Detalhes'}>
            <Button
              type={'link'}
              icon={<EyeOutlined />}
              onClick={() => navigate(`/colaboradores/${employee.id}/detalhes`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const users: User.Summary[] = [];

  for (let i = 1; i < 20; i++) {
    users.push({
      id: i,
      name: `Pedro Oliveira Bassi ${i}`,
      cpf: '999.999.999-99',
      whatsApp: '(17) 99999 9999',
      group: i % 2 === 0 ? 'ENCARREGADO' : 'ADMINISTRADOR',
    });
  }
  return (
    <WrapperDefault title="Lista de Colaboradores">
      <Table<User.Summary>
        dataSource={users}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey="id"
      />
    </WrapperDefault>
  );
}
