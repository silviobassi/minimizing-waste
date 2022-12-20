import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import WrapperDefault from '../components/WrapperDefault';

interface UserType {
  key: React.Key;
  id: number;
  name: string;
  cpf: string;
  email: string;
  group: string;
}

export default function EmployeeList() {
  const navigate = useNavigate();

  const columns: ColumnsType<UserType> = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Nome', dataIndex: 'name', responsive: ['sm'] },
    { title: 'CPF', dataIndex: 'cpf', width: 150 },
    { title: 'Email', dataIndex: 'email', width: 270 },
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
            <Button type={'link'} icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const users: UserType[] = [];

  for (let i = 1; i < 20; i++) {
    users.push({
      key: i,
      id: i,
      name: `Pedro Oliveira Bassi ${i}`,
      cpf: '999.999.999-99',
      email: 'pedrobassi205@gmail.com',
      group: i % 2 === 0 ? 'ENCARREGADO' : 'ADMINISTRADOR',
    });
  }
  return (
    <WrapperDefault title="Lista de Colaboradores">
      <Table<UserType>
        dataSource={users}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
    </WrapperDefault>
  );
}
