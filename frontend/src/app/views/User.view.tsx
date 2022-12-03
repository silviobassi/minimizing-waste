import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import TableCustom from '../features/TableCustom';

interface UserType {
  key: React.Key;
  id: number;
  name: string;
  cpf: string;
  email: string;
  office: string;
  occupation: string;
  literate: string;
  group: string;
}

const columns: ColumnsType<UserType> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Nome', dataIndex: 'name' },
  { title: 'CPF', dataIndex: 'cpf' },
  { title: 'Email', dataIndex: 'email' },
  { title: 'Cargo', dataIndex: 'office' },
  { title: 'Função', dataIndex: 'occupation' },
  { title: 'Instrução', dataIndex: 'literate' },
  { title: 'Tipo de Usuário', dataIndex: 'group' },
  {
    title: 'Ações',
    dataIndex: 'actions',
    render: (_: any, user) => (
      <Space size={'middle'}>
        <Tooltip title={'Editar'}>
          <Button type={'primary'} shape={'circle'} icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title={'Excluir'}>
          <Button type={'primary'} shape={'circle'} icon={<DeleteOutlined />} />
        </Tooltip>
        <Tooltip title={'Alocar Colaborador'}>
          <Button type={'primary'} shape={'circle'} icon={<UserOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
];

const data: UserType[] = [];

for (let i = 1; i < 20; i++) {
  data.push({
    key: i,
    id: i,
    name: `Pedro Oliveira Bassi ${i}`,
    cpf: '999.999.999-99',
    email: 'pedrobassi205@gmail.com',
    office: 'Engenheiro Civil',
    occupation: 'Encarregado',
    literate: 'CURSO SUPERIOR',
    group: 'ENCARREGADO',
  });
}

export default function UserView() {
  return (
    <TableCustom
      columns={columns}
      data={data}
      buttonAndTableColWidth={24}
      tablePageSize={7}
      createButtonLabel={'CRIAR USUÁRIO'}
    />
  );
}
