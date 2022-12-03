import { DeleteOutlined, EditOutlined, StockOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import TableCustom from '../features/TableCustom';

interface SupplyMaterialType {
  key: React.Key;
  id: number;
  title: string;
  manipulation: string;
  packing: string;
  quantity: number;
  measure: number;
  total: number;
  measureUnitType: string;
}

const columns: ColumnsType<SupplyMaterialType> = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Título', dataIndex: 'title' },
  { title: 'Manipulação', dataIndex: 'manipulation' },
  { title: 'Empacotamento', dataIndex: 'packing' },
  { title: 'Quantidade Unitária', dataIndex: 'quantity' },
  { title: 'Medida', dataIndex: 'measure' },
  { title: 'Total', dataIndex: 'total' },
  { title: 'Unidade de Medida', dataIndex: 'measureUnitType' },
  {
    title: 'Ações',
    dataIndex: 'actions',
    render: (_: any, workstation) => (
      <Space size={'middle'}>
        <Tooltip title={'Editar'}>
          <Button type={'primary'} shape={'circle'} icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title={'Excluir'}>
          <Button type={'primary'} shape={'circle'} icon={<DeleteOutlined />} />
        </Tooltip>
        <Tooltip title={'Alocar Recursos'}>
          <Button type={'primary'} shape={'circle'} icon={<StockOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
];

const data: SupplyMaterialType[] = [];

for (let i = 1; i < 20; i++) {
  data.push({
    key: i,
    id: i,
    title: 'Porcelanato Delta',
    manipulation: 'IMUTÁVEL',
    packing: 'Caixa',
    quantity: 2,
    measure: 2,
    total: 4,
    measureUnitType: 'M²',
  });
}

export default function SupplyMaterialView() {
  return (
    <TableCustom
      data={data}
      columns={columns}
      buttonAndTableColWidth={24}
      createButtonLabel={'CRIAR RECURSOS MATERIAIS'}
      tablePageSize={7}
    />
  );
}
